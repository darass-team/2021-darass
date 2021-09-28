package com.darass.commentalarm.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.darass.comment.domain.Comment;
import com.darass.commentalarm.domain.CommentAlarm;
import com.darass.commentalarm.domain.CommentAlarmType;
import com.darass.darass.SpringContainerTest;
import com.darass.user.domain.SocialLoginUser;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@DisplayName("commentAlarmRepository 클래스")
@Transactional
class CommentAlarmRepositoryTest extends SpringContainerTest {

    @Autowired
    private CommentAlarmRepository commentAlarmRepository;

    private SocialLoginUser socialLoginUser;

    private Comment comment;

    private CommentAlarm commentAlarm;

    @BeforeEach
    void setUp() {
        socialLoginUser = SocialLoginUser
            .builder()
            .nickName("박병욱")
            .build();

        comment = Comment.builder()
            .user(socialLoginUser)
            .content("content")
            .build();

        commentAlarm = CommentAlarm.builder()
            .commentAlarmType(CommentAlarmType.CREATE_COMMENT)
            .sender(socialLoginUser)
            .comment(comment)
            .build();

        commentAlarmRepository.save(commentAlarm);
    }

    @DisplayName("댓글 알람을 저장한다.")
    @Test
    void save() {
        List<CommentAlarm> commentAlarms = commentAlarmRepository.findAll();
        CommentAlarm findCommentAlarm = commentAlarms.get(0);

        assertThat(findCommentAlarm.getComment()).isEqualTo(comment);
        assertThat(findCommentAlarm.getSender()).isEqualTo(socialLoginUser);
        assertThat(findCommentAlarm.getCommentAlarmType()).isEqualTo(CommentAlarmType.CREATE_COMMENT);
    }

    @DisplayName("특정 기간에 유저에게 생성된 댓글 알람 리스트를 반환한다.")
    @Test
    void findAllBySenderAndCreatedDateBetween_success() {
        List<CommentAlarm> commentAlarms = commentAlarmRepository.findAllBySenderAndCreatedDateBetweenOrderByCreatedDateDesc(
            socialLoginUser,
            LocalDateTime.of(2020, 1, 1, 1, 1),
            LocalDateTime.of(2022, 1, 1, 1, 1)
        );

        assertThat(commentAlarms.size()).isEqualTo(1);
    }

    @DisplayName("특정 기간에 유저에게 생성된 댓글 알람이 없다면 빈 리스트를 반환한다.")
    @Test
    void findAllBySenderAndCreatedDateBetween_empty() {
        List<CommentAlarm> commentAlarms = commentAlarmRepository.findAllBySenderAndCreatedDateBetweenOrderByCreatedDateDesc(
            socialLoginUser,
            LocalDateTime.of(2022, 1, 1, 1, 1),
            LocalDateTime.of(2023, 1, 1, 1, 1)
        );

        assertThat(commentAlarms.size()).isEqualTo(0);

        commentAlarms = commentAlarmRepository.findAllBySenderAndCreatedDateBetweenOrderByCreatedDateDesc(
            null,
            LocalDateTime.of(2020, 1, 1, 1, 1),
            LocalDateTime.of(2022, 1, 1, 1, 1)
        );

        assertThat(commentAlarms.size()).isEqualTo(0);
    }

}