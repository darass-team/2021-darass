package com.darass.darass.user.domain;

import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.user.infrastructure.S3Uploader;
import java.util.Objects;
import javax.persistence.Entity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Getter
@NoArgsConstructor
@Entity
public class SocialLoginUser extends User {

    private String email;

    private String oauthId;

    private String oauthProvider;

    @Builder
    public SocialLoginUser(Long id, String nickName, String profileImageUrl, String userType, String oauthId,
        String oauthProvider, String email) {
        super(id, nickName, profileImageUrl, userType);
        this.oauthId = oauthId;
        this.oauthProvider = oauthProvider;
        this.email = email;
    }

    @Override
    public boolean isLoginUser() {
        return true;
    }

    @Override
    public boolean isValidGuestPassword(String guestUserPassword) {
        throw ExceptionWithMessageAndCode.NOT_GUEST_USER.getException();
    }

    public void changeNickNameOrProfileImageIfExists(S3Uploader s3Uploader, String nickName,
        MultipartFile profileImageFile) {
        if (!Objects.isNull(nickName)) {
            changeNickName(nickName);
        }
        if (!Objects.isNull(profileImageFile)) {
            String imageUrl = s3Uploader.upload(profileImageFile);
            changeProfileImageUrl(imageUrl);
        }
    }
}
