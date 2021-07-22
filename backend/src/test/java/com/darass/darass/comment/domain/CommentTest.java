package com.darass.darass.comment.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.darass.darass.auth.oauth.api.domain.OAuthProviderType;
import com.darass.darass.project.domain.Project;
import com.darass.darass.user.domain.GuestUser;
import com.darass.darass.user.domain.SocialLoginUser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("Comment 클래스")
class CommentTest {

    private final String content = "댓글 내용";
    private final String url = "https://naver.blog/post/1";
    private SocialLoginUser socialLoginUser;
    private Comment comment;
    private Project project;

    @BeforeEach
    void setUp() {
        socialLoginUser = SocialLoginUser.builder()
            .id(1L)
            .nickName("우기")
            .profileImageUrl("http://프로필이미지-url")
            .userType("socialLoginUser")
            .email("bbwwpark@naver.com")
            .oauthProviderType(OAuthProviderType.KAKAO)
            .oauthId("1234")
            .build();

        project = Project.builder()
            .id(1L)
            .user(socialLoginUser)
            .name("깃헙 지킬 블로그")
            .build();

        comment = Comment.builder()
            .id(1L)
            .user(socialLoginUser)
            .project(project)
            .url(url)
            .content(content)
            .build();
    }

    @DisplayName("changeContent 메서드는 content가 주어지면, content를 바꾸고 아무것도 반환하지 않는다.")
    @Test
    void changeContent() {
        comment.changeContent("수정된 댓글 내용");
        assertThat(comment.getContent()).isNotEqualTo(content);
    }

    @DisplayName("isCommentWriter 메서드는 댓글을 작성한 유저가 주어지면, true를 반환한다.")
    @Test
    void isCommentWriter_true() {
        assertThat(comment.isCommentWriter(socialLoginUser)).isTrue();
    }

    @DisplayName("isCommentWriter 메서드는 댓글을 작성하지 않은 유저가 주어지면, false를 반환한다.")
    @Test
    void isCommentWriter_false() {
        assertThat(comment.isCommentWriter(new GuestUser())).isFalse();
    }

    @DisplayName("match 메서드는 댓글에 해당하는 url과 projectKey가 주어지면, true를 반환한다.")
    @Test
    void match_true() {
        assertThat(comment.match(url, project.getSecretKey())).isTrue();
    }

    @DisplayName("match 메서드는 댓글에 해당하지 않는 url이 주어지면, false를 반환한다.")
    @Test
    void match_url_false() {
        assertThat(comment.match("invalid url", project.getSecretKey())).isFalse();
    }

    @DisplayName("match 메서드는 댓글에 해당하지 않는 projectKey가 주어지면, false를 반환한다.")
    @Test
    void match_projectKey_false() {
        assertThat(comment.match(url, "invalid projectKey")).isFalse();
    }

}