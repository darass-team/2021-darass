package com.darass.user.service;

import com.darass.exception.ExceptionWithMessageAndCode;
import com.darass.user.domain.SocialLoginUser;
import com.darass.user.domain.User;
import com.darass.user.dto.PasswordCheckRequest;
import com.darass.user.dto.PasswordCheckResponse;
import com.darass.user.dto.UserResponse;
import com.darass.user.dto.UserUpdateRequest;
import com.darass.user.infrastructure.S3Uploader;
import com.darass.user.repository.UserRepository;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Transactional
@Service
public class UserService {

    private static final int MAX_FILE_SIZE = 5000000; // 5MB
    private final UserRepository userRepository;
    private final S3Uploader s3Uploader;

    @Transactional(readOnly = true)
    public UserResponse findById(Long id) {
        Optional<User> possibleUser = userRepository.findById(id);
        User user = possibleUser.orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_USER::getException);
        return UserResponse.of(user);
    }

    public UserResponse update(Long id, UserUpdateRequest userUpdateRequest) {
        Optional<User> possibleUser = userRepository.findById(id);
        SocialLoginUser user = (SocialLoginUser) possibleUser
            .orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_USER::getException);
        String nickName = userUpdateRequest.getNickName();
        MultipartFile profileImageFile = userUpdateRequest.getProfileImageFile();
        if (!Objects.isNull(profileImageFile) && profileImageFile.getSize() >= MAX_FILE_SIZE) {
            throw ExceptionWithMessageAndCode.OVER_MAX_FILE_SIZE.getException();
        }
        user.changeNickNameOrProfileImageIfExists(s3Uploader, nickName, profileImageFile);
        if (!Objects.isNull(userUpdateRequest.getHasRecentAlarm())) {
            user.changeHasRecentAlarm(userUpdateRequest.getHasRecentAlarm());
        }
        return UserResponse.of(user);
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public PasswordCheckResponse checkGuestUserPassword(PasswordCheckRequest passwordCheckRequest) {
        Optional<User> possibleUser = userRepository.findById(passwordCheckRequest.getGuestUserId());
        User user = possibleUser.orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_USER::getException);

        if (user.isValidGuestPassword(passwordCheckRequest.getGuestUserPassword())) {
            return new PasswordCheckResponse(true);
        }
        return new PasswordCheckResponse(false);
    }
}
