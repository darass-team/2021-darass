package com.darass.commentalarm.domain;

import com.darass.comment.domain.Comment;
import com.darass.comment.dto.CommentResponse;
import com.darass.commentalarm.dto.CommentAlarmResponse;
import com.darass.common.domain.BaseTimeEntity;
import com.darass.user.domain.User;
import com.darass.user.dto.UserResponse;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class CommentAlarm extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private CommentAlarmType commentAlarmType;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "sender_id")
    private User sender;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "comment_id")
    private Comment comment;

    @Builder
    public CommentAlarm(Long id, CommentAlarmType commentAlarmType, User sender, Comment comment) {
        this.id = id;
        this.commentAlarmType = commentAlarmType;
        this.sender = sender;
        this.comment = comment;
    }

    public CommentAlarmResponse makeCommentAlarmResponse() {
        UserResponse userResponse = UserResponse.of(getSender());
        CommentResponse commentResponse = CommentResponse.of(getComment(), userResponse);
        return CommentAlarmResponse.of(getCommentAlarmType(), userResponse, commentResponse);
    }
}
