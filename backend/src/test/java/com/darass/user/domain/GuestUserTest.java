package com.darass.user.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.darass.exception.ExceptionWithMessageAndCode;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

@DisplayName("GuestUser 클래스")
class GuestUserTest {

    private final String nickName = "우기";
    private final String password = "123!";
    private GuestUser guestUser;

    @BeforeEach
    void setUp() {
        guestUser = createGuestUser(nickName, password);
    }

    @DisplayName("GuestUser 객체가 빌더 패턴으로 생성된다.")
    @Test
    void constructor() {
        assertThat(guestUser).isNotNull();
        assertThat(guestUser.getNickName()).isEqualTo(nickName);
        assertThat(guestUser.getPassword()).isEqualTo(password);
    }

    @DisplayName("isLoginUser 메서드는 false를 리턴한다.")
    @Test
    void isLoginUser() {
        assertThat(guestUser.isLoginUser()).isFalse();
    }

    @DisplayName("isValidGuestPassword 메서드는 패스워드가 주어진다면, true를 리턴한다.")
    @Test
    void isValidGuestPassword() {
        assertThat(guestUser.isValidGuestPassword(password)).isTrue();
    }

    @DisplayName("닉네임이 제한 길이를 초과가거나 비어있는 경우, 예외가 발생한다.")
    @ValueSource(strings = {" ", "123456789012345678901"})
    @ParameterizedTest
    void invalidNickName(String input) {
        assertThatThrownBy(() -> createGuestUser(input, password))
            .isInstanceOf(ExceptionWithMessageAndCode.INVALID_INPUT_LENGTH.getException().getClass());
    }

    @DisplayName("비밀번호가 제한 길이를 초과하는 경우, 예외가 발생한다.")
    @Test
    void invalidPassword() {
        assertThatThrownBy(() -> createGuestUser(nickName, "123456789012345678901"))
            .isInstanceOf(ExceptionWithMessageAndCode.INVALID_INPUT_LENGTH.getException().getClass());
    }

    private GuestUser createGuestUser(String nickName, String password) {
        return GuestUser.builder()
            .nickName(nickName)
            .password(password)
            .build();
    }
}