package com.darass.darass.comment.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

import com.darass.darass.SpringContainerTest;
import com.darass.darass.comment.domain.Comment;
import com.darass.darass.comment.repository.CommentRepository;
import com.darass.darass.user.domain.SocialLoginUser;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

@DisplayName("CommentService 클래스")
class CommentServiceTest extends SpringContainerTest {

    @MockBean
    private CommentRepository commentRepository;

    @Autowired
    private CommentService commentService;

    private SocialLoginUser socialLoginUser;

    private Comment comment;

    @BeforeEach
    void setUp() {
        socialLoginUser = SocialLoginUser.builder()
            .id(1L)
            .nickName("loginUser")
            .build();

        comment = Comment.builder()
            .id(1L)
            .user(socialLoginUser)
            .build();
    }

    @DisplayName("좋아요를 요청하면 상태가 토글된다.")
    @Test
    void toggleLikeStatus() {
        given(commentRepository.findById(comment.getId())).willReturn(Optional.of(comment));

        commentService.toggleLikeStatus(comment.getId(), socialLoginUser);

        assertThat(comment.getCommentLikes()).hasSize(1);

        commentService.toggleLikeStatus(comment.getId(), socialLoginUser);

        assertThat(comment.getCommentLikes()).hasSize(0);
    }
}