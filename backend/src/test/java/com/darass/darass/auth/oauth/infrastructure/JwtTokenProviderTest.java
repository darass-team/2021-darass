package com.darass.darass.auth.oauth.infrastructure;

import com.darass.darass.exception.ExceptionWithMessageAndCode;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;


@DisplayName("JwtTokenProvider 클래스")
@ActiveProfiles("test")
@SpringBootTest
class JwtTokenProviderTest {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @DisplayName("createAccessToken 메서드는 payload가 주어지면, accessToken을 리턴한다.")
    @Test
    void createAccessToken() {
        assertThat(jwtTokenProvider.createAccessToken("1")).isNotEmpty();
    }

    @DisplayName("validateAccessToken 메서드는 유효한 accessToken이 주어지면, 아무것도 반환하지 않는다.")
    @Test
    void validateAccessToken() {
        // given
        String accessToken = jwtTokenProvider.createAccessToken("1");

        // when then
        assertThatCode(() -> jwtTokenProvider.validateAccessToken(accessToken)).doesNotThrowAnyException();
    }

    @DisplayName("validateAccessToken 메서드는 유효하지 않은 accessToken이 주어지면, 예외를 던진다.")
    @Test
    void validateAccessToken_exception() {
        Assertions.assertThrows(ExceptionWithMessageAndCode.INVALID_JWT_TOKEN.getException().getClass(),
            () -> jwtTokenProvider.validateAccessToken("IncorrectToken"));
    }

    @DisplayName("getPayload 메서드는 유효한 accessToken이 주어지면, payload를 리턴한다.")
    @Test
    void getPayload() {

        // given
        String accessToken = jwtTokenProvider.createAccessToken("1");

        // when then
        assertThat(jwtTokenProvider.getPayload(accessToken)).isEqualTo("1");
    }

    @DisplayName("getPayload 메서드는 유효하지 않은 accessToken이 주어지면, 예외를 던진다.")
    @Test
    void getPayload_exception() {
        Assertions.assertThrows(ExceptionWithMessageAndCode.INVALID_JWT_TOKEN.getException().getClass(),
            () -> jwtTokenProvider.getPayload("IncorrectToken"));
    }

}