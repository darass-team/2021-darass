package com.darass.darass.user.service;

import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.domain.User;
import com.darass.darass.user.dto.PasswordCheckRequest;
import com.darass.darass.user.dto.PasswordCheckResponse;
import com.darass.darass.user.dto.UserResponse;
import com.darass.darass.user.dto.UserUpdateRequest;
import com.darass.darass.user.infrastructure.S3Uploader;
import com.darass.darass.user.repository.UserRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Transactional
@Service
public class UserService {

    private final UserRepository userRepository;
    private final S3Uploader s3Uploader;

    public UserResponse findById(Long id) {
        Optional<User> possibleUser = userRepository.findById(id);
        User user = possibleUser.orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_USER::getException);
        return UserResponse.of(user, user.getUserType(), user.getProfileImageUrl());
    }

    public UserResponse update(Long id, UserUpdateRequest userUpdateRequest) {
        Optional<User> expectedUser = userRepository.findById(id);
        SocialLoginUser user = (SocialLoginUser) expectedUser
            .orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_USER::getException);
        String nickName = userUpdateRequest.getNickName();
        MultipartFile profileImageFile = userUpdateRequest.getProfileImageFile();
        user.changeNickNameOrProfileImageIfExists(s3Uploader, nickName, profileImageFile);
        return UserResponse.of(user, user.getUserType(), user.getProfileImageUrl());
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    public PasswordCheckResponse checkGuestUserPassword(PasswordCheckRequest passwordCheckRequest) {
        Optional<User> expectedUser = userRepository.findById(passwordCheckRequest.getGuestUserId());
        User user = expectedUser.orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_USER::getException);

        if (user.isValidGuestPassword(passwordCheckRequest.getGuestUserPassword())) {
            return new PasswordCheckResponse(true);
        }
        return new PasswordCheckResponse(false);
    }
}
