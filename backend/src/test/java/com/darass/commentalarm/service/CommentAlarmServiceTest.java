package com.darass.commentalarm.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.darass.comment.domain.Comment;
import com.darass.commentalarm.domain.CommentAlarm;
import com.darass.commentalarm.domain.CommentAlarmType;
import com.darass.commentalarm.dto.CommentAlarmResponse;
import com.darass.commentalarm.repository.CommentAlarmRepository;
import com.darass.SpringContainerTest;
import com.darass.user.domain.SocialLoginUser;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@DisplayName("CommentAlarmService 클래스")
class CommentAlarmServiceTest extends SpringContainerTest {

    private static SocialLoginUser SENDER;
    private static SocialLoginUser RECEIVER;

    static {
        SENDER = SocialLoginUser
            .builder()
            .nickName("송신자")
            .build();

        RECEIVER = SocialLoginUser
            .builder()
            .nickName("수신자")
            .build();
    }

    @Autowired
    private CommentAlarmService commentAlarmService;
    @Autowired
    private CommentAlarmRepository commentAlarmRepository;
    private Comment comment;

    @BeforeEach
    void setUp() {
        comment = Comment.builder()
            .user(SENDER)
            .content("content")
            .build();

        commentAlarmRepository.save(CommentAlarm.builder()
            .commentAlarmType(CommentAlarmType.CREATE_COMMENT)
            .sender(SENDER)
            .receiver(RECEIVER)
            .comment(comment)
            .build());

        commentAlarmRepository.save(CommentAlarm.builder()
            .commentAlarmType(CommentAlarmType.CREATE_COMMENT)
            .sender(SENDER)
            .receiver(RECEIVER)
            .comment(comment)
            .build());

        commentAlarmRepository.save(CommentAlarm.builder()
            .commentAlarmType(CommentAlarmType.CREATE_COMMENT)
            .sender(SENDER)
            .receiver(RECEIVER)
            .comment(comment)
            .build());
    }

    @DisplayName("특정 기간에 유저에게 생성된 댓글 알람 리스트를 반환한다.")
    @Test
    void findAllBySenderAndCreatedDateBetween_success() {
        List<CommentAlarmResponse> commentAlarmResponses = commentAlarmService.findAllCreatedDateBetween(
            RECEIVER,
            LocalDate.of(2020, 1, 1).atTime(LocalTime.MIN),
            LocalDate.of(2022, 1, 1).atTime(LocalTime.MAX)
        );

        assertThat(commentAlarmResponses).hasSize(3);
    }

}