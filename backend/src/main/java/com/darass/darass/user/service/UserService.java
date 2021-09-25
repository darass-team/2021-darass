package com.darass.darass.user.service;

import com.darass.darass.comment.repository.CommentRepository;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.user.domain.GuestUser;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.domain.User;
import com.darass.darass.user.dto.PasswordCheckRequest;
import com.darass.darass.user.dto.PasswordCheckResponse;
import com.darass.darass.user.dto.UserResponse;
import com.darass.darass.user.dto.UserUpdateRequest;
import com.darass.darass.user.infrastructure.S3Uploader;
import com.darass.darass.user.repository.UserRepository;
import java.util.List;
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
    private final CommentRepository commentRepository;
    private final S3Uploader s3Uploader;

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
        return UserResponse.of(user);
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    public PasswordCheckResponse checkGuestUserPassword(PasswordCheckRequest passwordCheckRequest) {
        Optional<User> possibleUser = userRepository.findById(passwordCheckRequest.getGuestUserId());
        User user = possibleUser.orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_USER::getException);

        if (user.isValidGuestPassword(passwordCheckRequest.getGuestUserPassword())) {
            return new PasswordCheckResponse(true);
        }
        return new PasswordCheckResponse(false);
    }

    public void test() {
//        List<User> all = userRepository.findAll();
//        System.out.println(all.size());
        for (int i = 0; i < 10000; i++) {
            User user = GuestUser.builder()
                .nickName("aa")
                .password("aa")
                .build();
            userRepository.save(user);
        }
    }
}
