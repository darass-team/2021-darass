package com.darass.commentalarm.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.darass.comment.domain.Comment;
import com.darass.comment.repository.CommentRepository;
import com.darass.commentalarm.domain.CommentAlarm;
import com.darass.commentalarm.domain.CommentAlarmType;
import com.darass.SpringContainerTest;
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

    private static SocialLoginUser sender;
    private static SocialLoginUser receiver;
    private static Comment comment;
    @Autowired
    private CommentAlarmRepository commentAlarmRepository;
    @Autowired
    private CommentRepository commentRepository;

    @BeforeEach
    void setUp() {
        sender = SocialLoginUser
            .builder()
            .nickName("송신자")
            .build();

        receiver = SocialLoginUser
            .builder()
            .nickName("수신자")
            .build();

        comment = Comment.builder()
            .user(sender)
            .content("content")
            .build();

        commentRepository.save(comment);

        commentAlarmRepository.save(CommentAlarm.builder()
            .commentAlarmType(CommentAlarmType.CREATE_COMMENT)
            .sender(sender)
            .receiver(receiver)
            .comment(comment)
            .build());

        commentAlarmRepository.save(CommentAlarm.builder()
            .commentAlarmType(CommentAlarmType.CREATE_COMMENT)
            .sender(sender)
            .receiver(receiver)
            .comment(comment)
            .build());
    }

    @DisplayName("댓글 알람을 저장한다.")
    @Test
    void save() {
        List<CommentAlarm> commentAlarms = commentAlarmRepository.findAll();
        CommentAlarm findCommentAlarm = commentAlarms.get(0);

        assertThat(findCommentAlarm.getComment()).isEqualTo(comment);
        assertThat(findCommentAlarm.getSender()).isEqualTo(sender);
        assertThat(findCommentAlarm.getReceiver()).isEqualTo(receiver);
        assertThat(findCommentAlarm.getCommentAlarmType()).isEqualTo(CommentAlarmType.CREATE_COMMENT);
    }

    @DisplayName("특정 기간에 유저에게 생성된 댓글 알람 리스트를 반환한다.")
    @Test
    void findAllBySenderAndCreatedDateBetween_success() {
        List<CommentAlarm> commentAlarms = commentAlarmRepository.findAllByReceiverAndCreatedDateBetweenOrderByCreatedDateDesc(
            receiver,
            LocalDateTime.of(2020, 1, 1, 1, 1),
            LocalDateTime.of(2022, 1, 1, 1, 1)
        );

        assertThat(commentAlarms.size()).isEqualTo(2);
    }

    @DisplayName("특정 기간에 유저에게 생성된 댓글 알람이 없다면 빈 리스트를 반환한다.")
    @Test
    void findAllBySenderAndCreatedDateBetween_empty() {
        List<CommentAlarm> commentAlarms = commentAlarmRepository.findAllByReceiverAndCreatedDateBetweenOrderByCreatedDateDesc(
            sender,
            LocalDateTime.of(2022, 1, 1, 1, 1),
            LocalDateTime.of(2023, 1, 1, 1, 1)
        );

        assertThat(commentAlarms.size()).isEqualTo(0);

        commentAlarms = commentAlarmRepository.findAllByReceiverAndCreatedDateBetweenOrderByCreatedDateDesc(
            null,
            LocalDateTime.of(2020, 1, 1, 1, 1),
            LocalDateTime.of(2022, 1, 1, 1, 1)
        );

        assertThat(commentAlarms.size()).isEqualTo(0);
    }

}