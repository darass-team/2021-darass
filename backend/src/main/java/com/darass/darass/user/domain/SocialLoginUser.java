package com.darass.darass.user.domain;

import com.darass.darass.exception.ExceptionWithMessageAndCode;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@NoArgsConstructor
@Entity
@Getter
public class SocialLoginUser extends User {

    private String email;

    private String oauthId;

    @Enumerated(EnumType.STRING)
    private OAuthPlatform oauthPlatform;

    @Builder
    public SocialLoginUser(String nickName, String oauthId,
                           OAuthPlatform oauthPlatform, String email, String profileImageUrl) {
        super(nickName, profileImageUrl);
        this.oauthId = oauthId;
        this.oauthPlatform = oauthPlatform;
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

}
