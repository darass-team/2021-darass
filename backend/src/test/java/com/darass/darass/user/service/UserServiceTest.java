package com.darass.darass.user.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.darass.darass.SpringContainerTest;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.user.domain.GuestUser;
import com.darass.darass.user.domain.User;
import com.darass.darass.user.dto.UserResponse;
import com.darass.darass.user.dto.UserUpdateRequest;
import com.darass.darass.user.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@DisplayName("UserService 클래스")
class UserServiceTest extends SpringContainerTest {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    private User user;

    @BeforeEach
    void setUp() {
        user = GuestUser.builder()
            .nickName("우기")
            .password("123!")
            .build();

        userRepository.save(user);
    }

    @Test
    @DisplayName("findById 메서드는 유저 id가 주어지면, 해당하는 UserResponse를 반환한다.")
    void findById() {
        // when
        UserResponse userResponse = userService.findById(user.getId());

        // then
        assertThat(userResponse.getId()).isEqualTo(user.getId());
        assertThat(userResponse.getNickName()).isEqualTo("우기");
        assertThat(userResponse.getType()).isEqualTo("GuestUser");
    }

    @Test
    @DisplayName("findById 메서드는 저장 되어있지 않은 유저 id가 주어지면, 예외를 던진다.")
    void findById_exception() {
        // when then
        Assertions.assertThrows(ExceptionWithMessageAndCode.NOT_FOUND_USER.getException().getClass(),
            () -> userService.findById(0L));
    }

    @Test
    @DisplayName("updateNickName 메서드는 유저 id와 UserUpdateRequest가 주어지면, 유저 닉네임을 수정한다.")
    void updateNickName() {
        // when
        userService.updateNickName(user.getId(), new UserUpdateRequest("병욱"));

        // then
        UserResponse userResponse = userService.findById(user.getId());
        assertThat(userResponse.getNickName()).isEqualTo("병욱");
    }

    @Test
    @DisplayName("updateNickName 메서드는 올바르지 않은 유저 id가 주어지면, 예외를 던진다.")
    void updateNickName_exception() {
        // when then
        Assertions.assertThrows(ExceptionWithMessageAndCode.NOT_FOUND_USER.getException().getClass(),
            () -> userService.updateNickName(0L, new UserUpdateRequest("병욱")));
    }

    @Test
    @DisplayName("deleteById 메서드는 유저 id가 주어지면, 유저를 삭제한다.")
    void deleteById() {
        // when
        userService.deleteById(user.getId());

        // then
        assertThat(userRepository.findById(user.getId()).isPresent()).isFalse();
    }
}