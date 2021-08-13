package com.darass.darass.user.domain;

import com.darass.darass.auth.oauth.api.domain.OAuthProviderType;
import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.user.infrastructure.S3Uploader;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ForeignKey;
import javax.persistence.PrimaryKeyJoinColumn;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Getter
@NoArgsConstructor
@PrimaryKeyJoinColumn(foreignKey = @ForeignKey(name = "social_login_user_fk_user"))
@Entity
public class SocialLoginUser extends User {

    private String email;

    private String oauthId;

    @Enumerated(EnumType.STRING)
    private OAuthProviderType oauthProviderType;

    private String refreshToken;

    @Builder
    public SocialLoginUser(Long id, String nickName, String profileImageUrl, String userType, String oauthId,
        OAuthProviderType oauthProviderType, String email, String refreshToken) {
        super(id, nickName, profileImageUrl, userType);
        this.email = email;
        this.oauthId = oauthId;
        this.oauthProviderType = oauthProviderType;
        this.refreshToken = refreshToken;
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

    public void createRefreshToken(JwtTokenProvider jwtTokenProvider) {
        String payload = null;
        if (!Objects.isNull(getId())) {
            payload = getId().toString();
        }
        this.refreshToken = jwtTokenProvider.createRefreshToken(payload);
    }
}
