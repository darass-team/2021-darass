package com.darass.darass.user.domain;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Entity
public class SocialLoginUser extends User {

    private String oauthId;

    @Enumerated(EnumType.STRING)
    private OAuthPlatform oauthPlatform;

    private String email;
}
