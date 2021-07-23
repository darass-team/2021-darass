package com.darass.darass.user.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.darass.darass.auth.oauth.api.domain.OAuthProviderType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("SocialLoginUser 클래스")
class SocialLoginUserTest {

    private final String nickName = "우기";
    private final String email = "bbwwpark@naver.com";
    private final String oauthId = "12314341451354";
    private final OAuthProviderType oAuthProviderType = OAuthProviderType.KAKAO;

    @DisplayName("SocialLoginUser 객체가 빌더 패턴으로 생성된다.")
    @Test
    void constructor() {
        SocialLoginUser socialLoginUser = SocialLoginUser.builder()
            .nickName(nickName)
            .email(email)
            .oauthId(oauthId)
            .oauthProviderType(oAuthProviderType)
            .build();

        assertThat(socialLoginUser).isNotNull();
        assertThat(socialLoginUser.getNickName()).isEqualTo(nickName);
        assertThat(socialLoginUser.getOauthId()).isEqualTo(oauthId);
        assertThat(socialLoginUser.getOauthProviderType()).isEqualTo(oAuthProviderType);
    }

    @DisplayName("isLoginUser 메서드는 true를 리턴한다.")
    @Test
    void isLoginUser() {
        SocialLoginUser socialLoginUser = SocialLoginUser.builder()
            .nickName(nickName)
            .email(email)
            .oauthId(oauthId)
            .oauthProviderType(oAuthProviderType)
            .build();

        assertThat(socialLoginUser.isLoginUser()).isTrue();
    }

}