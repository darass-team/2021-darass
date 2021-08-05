package com.darass.darass.comment.domain;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.LAZY;

import com.darass.darass.common.domain.BaseTimeEntity;
import com.darass.darass.project.domain.Project;
import com.darass.darass.user.domain.User;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "comment_type")
@Entity
public class Comment extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private User user;

    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Project project;

    @OneToMany(mappedBy = "comment", fetch = LAZY, cascade = ALL, orphanRemoval = true)
    private final List<CommentLike> commentLikes = new ArrayList<>();

    private String url;

    private String content;

    @ManyToOne
    @JoinColumn(name = "parent_id", referencedColumnName = "id")
    private Comment parent;

    @OneToMany(mappedBy = "parent", fetch = LAZY)
    private List<Comment> children;

    @Formula("(select count(*) from comment_like where comment_like.comment_id=id)")
    private int likeCount;

    @Builder
    public Comment(Long id, User user, Project project, String url, String content) {
        this.id = id;
        this.user = user;
        this.project = project;
        this.url = url;
        this.content = content;
    }

    public void changeContent(String content) {
        this.content = content;
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

    public void addCommentLike(CommentLike commentLike) {
        this.commentLikes.add(commentLike);
    }
}
