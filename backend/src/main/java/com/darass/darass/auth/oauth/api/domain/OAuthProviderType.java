package com.darass.darass.auth.oauth.api.domain;

import java.util.Arrays;
import lombok.Getter;

@Getter
public enum OAuthProviderType {

    KAKAO("kakao", new KakaoOAuthProvider());

    private final String name;
    private final OAuthProvider oAuthProvider;

    OAuthProviderType(String name,
        OAuthProvider oAuthProvider) {
        this.name = name;
        this.oAuthProvider = oAuthProvider;
    }

    public static OAuthProvider of(String name) {
        OAuthProviderType oAuthProviderType = Arrays.stream(OAuthProviderType.values())
            .filter(it -> it.name.equals(name))
            .findAny()
            .orElseThrow(IllegalArgumentException::new);
        return oAuthProviderType.oAuthProvider;
    }
}
