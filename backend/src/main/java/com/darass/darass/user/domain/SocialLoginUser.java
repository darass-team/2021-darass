package com.darass.darass.user.domain;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
public class SocialLoginUser extends User {

    private String oauthId;

    @Enumerated(EnumType.STRING)
    private OAuthPlatform oauthPlatform;

    private String email;

    public SocialLoginUser(String nickName, String oauthId,
        OAuthPlatform oauthPlatform, String email) {
        super(nickName);
        this.oauthId = oauthId;
        this.oauthPlatform = oauthPlatform;
        this.email = email;
    }

}
