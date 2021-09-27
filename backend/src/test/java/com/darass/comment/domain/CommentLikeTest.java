package com.darass.comment.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.darass.user.domain.GuestUser;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("CommentLike 클래스")
class CommentLikeTest {

    @DisplayName("좋아요를 누른 사람의 이름을 반환한다.")
    @Test
    void getUserName() {
        GuestUser guestUser = GuestUser.builder()
            .nickName("guest")
            .password("password")
            .build();

        CommentLike commentLike = CommentLike.builder()
            .user(guestUser)
            .build();

        assertThat(commentLike.getUserName()).isEqualTo(guestUser.getNickName());
    }
}