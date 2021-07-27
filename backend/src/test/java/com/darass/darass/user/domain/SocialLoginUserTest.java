package com.darass.darass.user.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.darass.darass.auth.oauth.api.domain.OAuthProviderType;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("SocialLoginUser 클래스")
class SocialLoginUserTest {

    private final String nickName = "우기";
    private final String email = "bbwwpark@naver.com";
    private final String oauthId = "12314341451354";
    private final OAuthProviderType oAuthProviderType = OAuthProviderType.KAKAO;
    private SocialLoginUser socialLoginUser;

    @BeforeEach
    void setUp() {
        socialLoginUser = SocialLoginUser.builder()
            .nickName(nickName)
            .email(email)
            .oauthId(oauthId)
            .oauthProviderType(oAuthProviderType)
            .build();
    }

    @DisplayName("SocialLoginUser 객체가 빌더 패턴으로 생성된다.")
    @Test
    void constructor() {
        assertThat(socialLoginUser).isNotNull();
        assertThat(socialLoginUser.getNickName()).isEqualTo(nickName);
        assertThat(socialLoginUser.getOauthId()).isEqualTo(oauthId);
        assertThat(socialLoginUser.getOauthProviderType()).isEqualTo(oAuthProviderType);
    }

    @DisplayName("isLoginUser 메서드는 true를 리턴한다.")
    @Test
    void isLoginUser() {
        assertThat(socialLoginUser.isLoginUser()).isTrue();
    }

    @DisplayName("isValidGuestPassword 메서드는 패스워드가 주어다면, 예외를 던진다.")
    @Test
    void isValidGuestPassword() {
        assertThatThrownBy(() -> {
            assertThat(socialLoginUser.isValidGuestPassword("password")).isTrue();
        }).isEqualTo(ExceptionWithMessageAndCode.NOT_GUEST_USER.getException());
    }
}