package com.darass.comment.domain;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.LAZY;

import com.darass.commentalarm.domain.CommentAlarm;
import com.darass.commentalarm.domain.CommentAlarmType;
import com.darass.common.domain.BaseTimeEntity;
import com.darass.exception.ExceptionWithMessageAndCode;
import com.darass.project.domain.Project;
import com.darass.user.domain.User;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Transient;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@NoArgsConstructor
@Entity
public class Comment extends BaseTimeEntity {

    private static final int CONTENT_LENGTH_LIMIT = 3000;

    @OneToMany(mappedBy = "comment", fetch = LAZY, cascade = ALL, orphanRemoval = true)
    private final List<CommentLike> commentLikes = new ArrayList<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(foreignKey = @ForeignKey(name = "comment_fk_user"))
    private User user;

    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(foreignKey = @ForeignKey(name = "comment_fk_project"))
    private Project project;

    @ManyToOne
    @JoinColumn(name = "parent_id", referencedColumnName = "id",
        foreignKey = @ForeignKey(name = "comment_fk_sub_comment"))
    private Comment parent;

    @OneToMany(mappedBy = "parent", fetch = LAZY, cascade = ALL, orphanRemoval = true)
    private List<Comment> subComments = new ArrayList<>();

    @OnDelete(action = OnDeleteAction.CASCADE)
    @OneToMany(mappedBy = "comment")
    private List<CommentAlarm> commentAlarms = new ArrayList<>();

    private String url;

    @Lob
    private String content;

    private boolean secret;

    @Transient
    private boolean readable = true;

    @Formula("(select count(*) from comment_like where comment_like.comment_id=id)")
    private int likeCount;

    @Builder
    public Comment(Long id, User user, Project project, String url, String content, Comment parent, boolean secret) {
        validateContentLength(content);
        this.id = id;
        this.user = user;
        this.project = project;
        this.url = url;
        this.content = content;
        this.parent = parent;
        this.secret = secret;
    }

    public void changeContent(String content) {
        this.content = content;
    }

    public void changeUserNickname(String nickname) {
        user.changeNickName(nickname);
    }

    public boolean isCommentWriter(User user) {
        return this.user.isSameUser(user);
    }

    public boolean match(String url, String projectKey) {
        return this.url.equals(url) && project.isSame(projectKey);
    }

    public Long getUserId() {
        return user.getId();
    }

    public String getUserNickName() {
        return user.getNickName();
    }

    public boolean isLikedByUser(User user) {
        return this.commentLikes.stream()
            .map(CommentLike::getUser)
            .anyMatch(it -> it.isSameUser(user));
    }

    public void deleteCommentLikeByUser(User user) {
        CommentLike commentLike = this.commentLikes.stream()
            .filter(it -> it.getUser().isSameUser(user))
            .findAny()
            .orElseGet(CommentLike::new);

        this.commentLikes.remove(commentLike);
    }

    public void deleteSubComment(Long id) {
        subComments.removeIf(subComment -> subComment.isSameId(id));
    }

    public void addCommentLike(CommentLike commentLike) {
        this.commentLikes.add(commentLike);
    }

    public boolean isSubComment() {
        return !Objects.isNull(this.parent);
    }

    public boolean isSameId(Long id) {
        return this.id.equals(id);
    }

    public int getSubCommentSize() {
        return subComments.size();
    }

    private void validateContentLength(String content) {
        if (content.isEmpty() || content.length() > CONTENT_LENGTH_LIMIT) {
            throw ExceptionWithMessageAndCode.INVALID_INPUT_LENGTH.getException();
        }
    }

    public CommentAlarm createCommentAlarm(CommentAlarmType commentAlarmType, User receiver) {
        return CommentAlarm.builder()
            .commentAlarmType(commentAlarmType)
            .sender(user)
            .receiver(receiver)
            .comment(this)
            .build();
    }

    public CommentAlarm createCommentLikeAlarm(CommentAlarmType commentAlarmType, User sender) {
        return CommentAlarm.builder()
            .commentAlarmType(commentAlarmType)
            .sender(sender)
            .receiver(user)
            .comment(this)
            .build();
    }

    public void handleSecretComment() {
        if (this.secret) {
            changeUnreadableComment();
        }
        for (Comment subComment : this.subComments) {
            if (subComment.secret) {
                subComment.changeUnreadableComment();
            }
        }
    }

    public void changeUnreadableComment() {
        this.readable = false;
    }

    public void changeSecretStatus(boolean secret) {
        this.secret = secret;
    }
}
