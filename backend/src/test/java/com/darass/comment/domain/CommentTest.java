package com.darass.comment.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.darass.exception.ExceptionWithMessageAndCode;
import com.darass.project.domain.Project;
import com.darass.user.domain.GuestUser;
import com.darass.user.domain.SocialLoginUser;
import com.darass.user.domain.User;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("Comment 클래스")
class CommentTest {

    private final String content = "댓글 내용";
    private final String url = "https://naver.blog/post/1";
    private GuestUser guestUser;
    private SocialLoginUser socialLoginUser;
    private Project project;
    private Comment commentWithGuestUser;
    private Comment commentWithLoginUser;
    private List<Comment> subComments = new ArrayList<>();

    @BeforeEach
    void setUp() {
        guestUser = GuestUser.builder()
            .id(1L)
            .nickName("user")
            .password("password")
            .build();

        socialLoginUser = SocialLoginUser.builder()
            .id(2L)
            .nickName("login")
            .build();

        project = Project.builder()
            .id(1L)
            .user(socialLoginUser)
            .name("깃헙 지킬 블로그")
            .build();

        commentWithGuestUser = createComment(content, guestUser, null, false);
        commentWithLoginUser = createComment(content, socialLoginUser, null, true);

        subComments.add(createComment(content, guestUser, commentWithLoginUser, false));
        subComments.add(createComment(content, socialLoginUser, commentWithLoginUser, false));
        subComments.add(createComment(content, guestUser, commentWithLoginUser, true));
        subComments.add(createComment(content, socialLoginUser, commentWithLoginUser, true));

        commentWithLoginUser.getSubComments().addAll(subComments);
    }

    @DisplayName("changeContent 메서드는 content가 주어지면, content를 바꾸고 아무것도 반환하지 않는다.")
    @Test
    void changeContent() {
        commentWithGuestUser.changeContent("수정된 댓글 내용");

        assertThat(commentWithGuestUser.getContent()).isNotEqualTo(content);
    }

    @DisplayName("isCommentWriter 메서드는 댓글을 작성한 유저가 주어지면, true를 반환한다.")
    @Test
    void isCommentWriter_true() {
        assertThat(commentWithGuestUser.isCommentWriter(guestUser)).isTrue();
    }

    @DisplayName("isCommentWriter 메서드는 댓글을 작성하지 않은 유저가 주어지면, false를 반환한다.")
    @Test
    void isCommentWriter_false() {
        assertThat(commentWithGuestUser.isCommentWriter(new GuestUser())).isFalse();
    }

    @DisplayName("match 메서드는 댓글에 해당하는 url과 projectKey가 주어지면, true를 반환한다.")
    @Test
    void match_true() {
        assertThat(commentWithGuestUser.match(url, project.getSecretKey())).isTrue();
    }

    @DisplayName("match 메서드는 댓글에 해당하지 않는 url이 주어지면, false를 반환한다.")
    @Test
    void match_url_false() {
        assertThat(commentWithGuestUser.match("invalid url", project.getSecretKey())).isFalse();
    }

    @DisplayName("match 메서드는 댓글에 해당하지 않는 projectKey가 주어지면, false를 반환한다.")
    @Test
    void match_projectKey_false() {
        assertThat(commentWithGuestUser.match(url, "invalid projectKey")).isFalse();
    }

    @DisplayName("addCommentLike 메소드는 좋아요를 추가한다.")
    @Test
    void addCommentLike() {
        CommentLike commentLike = buildCommentLike();

        commentWithGuestUser.addCommentLike(commentLike);
        assertThat(commentWithGuestUser.getCommentLikes()).hasSize(1);
    }

    @DisplayName("deleteCommentLikeByUser 메소드는 좋아요를 제거한다.")
    @Test
    void deleteCommentLike() {
        CommentLike commentLike = buildCommentLike();
        commentWithGuestUser.addCommentLike(commentLike);

        commentWithGuestUser.deleteCommentLikeByUser(socialLoginUser);
        assertThat(commentWithGuestUser.getCommentLikes()).hasSize(0);
    }

    @DisplayName("제한길이를 초과하는 댓글을 생성하는 경우 예외가 발생한다.")
    @Test
    void createWithInvalidLength() {
        StringBuilder stringBuilder = new StringBuilder();
        IntStream.rangeClosed(0, 1000)
            .forEach(it -> stringBuilder.append("str"));

        assertThatThrownBy(() -> createComment(stringBuilder.toString(), guestUser, null, false))
            .isInstanceOf(ExceptionWithMessageAndCode.INVALID_INPUT_LENGTH.getException().getClass());
    }

    @DisplayName("유저가 로그인 상태라면, 비밀 댓글을 읽을 수 없다..")
    @Test
    void replaceCommentInfoToSecret_login_user() {
        commentWithLoginUser.changeUnreadableComment();
        assertThat(commentWithLoginUser.isReadable()).isFalse();
    }

    @DisplayName("유저가 비로그인 상태라면, 비밀 댓글을 읽을 수 없다.")
    @Test
    void replaceCommentInfoToSecret_guest_user() {
        commentWithGuestUser.changeUnreadableComment();
        assertThat(commentWithGuestUser.isReadable()).isFalse();
    }

    @DisplayName("각 부모 댓글과 대댓글에 대해 비밀 댓글이면 읽을 수 없다.")
    @Test
    void handleSecretComment() {
        commentWithLoginUser.handleSecretComment();
        assertThat(commentWithLoginUser.isReadable()).isFalse();
        for (Comment subComment : commentWithLoginUser.getSubComments()) {
            if (subComment.isSecret()) {
                assertThat(subComment.isReadable()).isFalse();
            }
        }
    }

    private CommentLike buildCommentLike() {
        return CommentLike.builder()
            .comment(commentWithGuestUser)
            .user(socialLoginUser)
            .build();
    }

    private Comment createComment(String content, User user, Comment parentComment, boolean secret) {
        return Comment.builder()
            .id(1L)
            .user(user)
            .project(project)
            .url(url)
            .content(content)
            .parent(parentComment)
            .secret(secret)
            .build();
    }
}