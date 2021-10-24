package com.darass.auth.infrastructure;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;

import com.darass.SpringContainerTest;
import com.darass.exception.ExceptionWithMessageAndCode;
import com.darass.user.domain.SocialLoginUser;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@DisplayName("JwtTokenProvider 클래스")
class JwtTokenProviderTest extends SpringContainerTest {

    private static final SocialLoginUser SOCIAL_LOGIN_USER;

    static {
        SOCIAL_LOGIN_USER = SocialLoginUser
            .builder()
            .id(1L)
            .nickName("박병욱")
            .oauthId("6752453")
            .oauthProvider("kakao")
            .email("jujubebat@kakao.com")
            .profileImageUrl("http://kakao/profileImage.png")
            .build();
    }

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @DisplayName("createAccessToken 메서드는 socialLoginUser가 주어지면, accessToken을 리턴한다.")
    @Test
    void createAccessToken() {
        String accessToken = jwtTokenProvider.createAccessToken(SOCIAL_LOGIN_USER);

        assertThat(jwtTokenProvider.createAccessToken(SOCIAL_LOGIN_USER)).isNotEmpty();

        assertThatCode(() -> jwtTokenProvider.validateAccessToken(accessToken)).doesNotThrowAnyException();
    }

    @DisplayName("createRefreshToken 메서드는 socialLoginUser가 주어지면, refreshToken을 리턴한다.")
    @Test
    void createRefreshToken() {
        String refreshToken = jwtTokenProvider.createRefreshToken(SOCIAL_LOGIN_USER);

        assertThat(jwtTokenProvider.createRefreshToken(SOCIAL_LOGIN_USER)).isNotEmpty();
        assertThatCode(() -> jwtTokenProvider.validateRefreshToken(refreshToken)).doesNotThrowAnyException();
    }

    @DisplayName("validateAccessToken 메서드는 유효한 accessToken이 주어지면, 아무것도 반환하지 않는다.")
    @Test
    void validateAccessToken() {
        // given
        String accessToken = jwtTokenProvider.createAccessToken(SOCIAL_LOGIN_USER);

        // when then
        assertThatCode(() -> jwtTokenProvider.validateAccessToken(accessToken)).doesNotThrowAnyException();
    }

    @DisplayName("validateAccessToken 메서드는 유효하지 않은 accessToken이 주어지면, 예외를 던진다.")
    @Test
    void validateAccessToken_exception() {
        Assertions.assertThrows(ExceptionWithMessageAndCode.INVALID_JWT_TOKEN.getException().getClass(),
            () -> jwtTokenProvider.validateAccessToken("invalidAccessToken"));
    }

    @DisplayName("validateRefreshToken 메서드는 유효한 refreshToken이 주어지면, 아무것도 반환하지 않는다.")
    @Test
    void validateRefreshToken() {
        String refreshToken = jwtTokenProvider.createRefreshToken(SOCIAL_LOGIN_USER);

        assertThatCode(() -> jwtTokenProvider.validateRefreshToken(refreshToken)).doesNotThrowAnyException();
    }

    @DisplayName("validateRefreshToken 메서드는 유효하지 않은 refreshToken이 주어지면, 예외를 던진다.")
    @Test
    void validateRefreshToken_exception() {
        Assertions.assertThrows(ExceptionWithMessageAndCode.INVALID_JWT_TOKEN.getException().getClass(),
            () -> jwtTokenProvider.validateRefreshToken("invalidRefreshToken"));
    }


    @DisplayName("getAccessTokenPayload 메서드는 유효한 accessToken이 주어지면, payload를 리턴한다.")
    @Test
    void getAccessTokenPayload() {
        String accessToken = jwtTokenProvider.createAccessToken(SOCIAL_LOGIN_USER);

        assertThat(jwtTokenProvider.getAccessTokenPayload(accessToken)).isEqualTo("1");
    }

    @DisplayName("getAccessTokenPayload 메서드는 유효하지 않은 accessToken이 주어지면, 예외를 던진다.")
    @Test
    void getAccessTokenPayload_exception() {
        Assertions.assertThrows(ExceptionWithMessageAndCode.INVALID_JWT_TOKEN.getException().getClass(),
            () -> jwtTokenProvider.getAccessTokenPayload("IncorrectToken"));
    }

}