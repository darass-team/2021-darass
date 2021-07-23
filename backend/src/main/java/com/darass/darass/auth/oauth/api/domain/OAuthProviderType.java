package com.darass.darass.auth.oauth.api.domain;

import com.darass.darass.auth.oauth.api.domain.dto.GithubLoginResponse;
import com.darass.darass.auth.oauth.api.domain.dto.KakaoLoginResponse;
import com.darass.darass.auth.oauth.api.domain.dto.NaverLoginResponse;
import com.darass.darass.auth.oauth.api.domain.dto.SocialLoginResponse;
import java.util.Arrays;
import lombok.Getter;

@Getter
public enum OAuthProviderType {

    KAKAO("kakao", "https://kapi.kakao.com/v2/user/me", new KakaoLoginResponse()),
    GITHUB("github", "https://api.github.com/user", new GithubLoginResponse()),
    NAVER("naver", "https://openapi.naver.com/v1/nid/me", new NaverLoginResponse());

    private final String name;
    private final String url;
    private final SocialLoginResponse socialLoginResponse;

    OAuthProviderType(String name, String url,
        SocialLoginResponse socialLoginResponse) {
        this.name = name;
        this.url = url;
        this.socialLoginResponse = socialLoginResponse;
    }

    public static String urlOf(String name) {
        return Arrays.stream(OAuthProviderType.values())
            .filter(it -> it.name.equals(name))
            .map(it -> it.url)
            .findAny()
            .orElseThrow(IllegalArgumentException::new);
    }

    public static SocialLoginResponse responseTypeOf(String name) {
        return Arrays.stream(OAuthProviderType.values())
            .filter(it -> it.name.equals(name))
            .map(it -> it.socialLoginResponse)
            .findAny()
            .orElseThrow(IllegalArgumentException::new);
    }
}
