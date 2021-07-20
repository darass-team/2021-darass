package com.darass.darass.user.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("GuestUser 클래스")
class GuestUserTest {

    private final String nickName = "우기";
    private final String password = "123!";

    @DisplayName("GuestUser 객체가 빌더 패턴으로 생성된다.")
    @Test
    void constructor() {
        GuestUser guestUser = GuestUser.builder()
            .nickName(nickName)
            .password(password)
            .build();

        assertThat(guestUser).isNotNull();
        assertThat(guestUser.getNickName()).isEqualTo(nickName);
        assertThat(guestUser.getPassword()).isEqualTo(password);
    }

    @DisplayName("isLoginUser 메서드는 false를 리턴한다.")
    @Test
    void isLoginUser() {
        GuestUser guestUser = GuestUser.builder()
            .nickName(nickName)
            .password(password)
            .build();

        assertThat(guestUser.isLoginUser()).isFalse();
    }

}