package com.darass.darass.user.domain;

import com.darass.darass.auth.oauth.api.domain.OAuthProviderType;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.user.infrastructure.S3Uploader;
import java.io.IOException;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.exception.SdkClientException;

@Getter
@NoArgsConstructor
@Entity
public class SocialLoginUser extends User {

    private String email;

    private String oauthId;

    @Enumerated(EnumType.STRING)
    private OAuthProviderType oauthProviderType;

    @Builder
    public SocialLoginUser(Long id, String nickName, String profileImageUrl, String userType, String oauthId,
        OAuthProviderType oauthProviderType, String email) {
        super(id, nickName, profileImageUrl, userType);
        this.oauthId = oauthId;
        this.oauthProviderType = oauthProviderType;
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

    public void update(SocialLoginUser socialLoginUser) {
        this.changeNickName(socialLoginUser.getNickName());
        this.changeProfileImageUrl(socialLoginUser.getProfileImageUrl());
        this.email = socialLoginUser.getEmail();
        this.oauthId = socialLoginUser.getOauthId();
        this.oauthProviderType = socialLoginUser.getOauthProviderType();
    }

    public void changeNickNameOrProfileImageIfExists(S3Uploader s3Uploader, String nickName,
        MultipartFile profileImageFile) {
        if (!Objects.isNull(nickName)) {
            changeNickName(nickName);
        }
        if (!Objects.isNull(profileImageFile)) {
            try {
                String imageUrl = s3Uploader.upload(profileImageFile);
                changeProfileImageUrl(imageUrl);
            } catch (IOException e) {
                throw ExceptionWithMessageAndCode.INTERNAL_SERVER.getException();
            }
        }
    }
}
