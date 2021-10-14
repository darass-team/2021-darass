package com.darass.comment.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.darass.project.domain.Project;
import com.darass.user.domain.GuestUser;
import com.darass.user.domain.SocialLoginUser;
import com.darass.user.domain.User;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("Comments 클래스")
class CommentsTest {

    private final List<Comment> commentList = new ArrayList<>();
    private GuestUser guestUser;
    private SocialLoginUser socialLoginUser;
    private SocialLoginUser admin;
    private Project jekyllProject;
    private Project tistoryProject;
    private Comments comments;

    @BeforeEach
    void setUp() {
        guestUser = GuestUser.builder()
            .id(1L)
            .nickName("user")
            .password("password")
            .build();

        socialLoginUser = SocialLoginUser.builder()
            .id(1L)
            .nickName("우기")
            .profileImageUrl("http://프로필이미지-url")
            .userType("socialLoginUser")
            .email("bbwwpark@naver.com")
            .oauthProvider("kakao")
            .oauthId("1234")
            .build();

        admin = SocialLoginUser.builder()
            .id(2L)
            .nickName("진영")
            .profileImageUrl("http://프로필이미지-url")
            .userType("socialLoginUser")
            .email("pjy1368@naver.com")
            .oauthProvider("kakao")
            .oauthId("1234")
            .build();

        jekyllProject = Project.builder()
            .id(1L)
            .user(admin)
            .name("네이버 블로그")
            .build();

        tistoryProject = Project.builder()
            .id(1L)
            .user(admin)
            .name("카카오 블로그")
            .build();
    }

    @DisplayName("match 메서드는 url과 프로젝트 시크릿 키가 주어지면, 해당하는 댓글 리스트를 반환한다.")
    @Test
    void commentMatch() {
        Comment jekyllProjectComment1 = makeComment(jekyllProject, "https://jekyll.blog/post/1", "댓글1");
        Comment tstoryProjectComment1 = makeComment(tistoryProject, "https://tstory.blog/post/2", "댓글2");
        Comment jekyllProjectComment2 = makeComment(jekyllProject, "https://jekyll.blog/post/1", "댓글3");
        Comment tstoryProjectComment2 = makeComment(tistoryProject, "https://tstory.blog/post/2", "댓글4");
        Comment jekyllProjectComment3 = makeComment(jekyllProject, "https://jekyll.blog/post/1", "댓글5");
        Comment tstoryProjectComment3 = makeComment(tistoryProject, "https://tstory.blog/post/2", "댓글6");
        Comment jekyllProjectComment4 = makeComment(jekyllProject, "https://jekyll.blog/post/1", "댓글7");
        Comment tstoryProjectComment4 = makeComment(tistoryProject, "https://tstory.blog/post/2", "댓글8");
        Comment jekyllProjectComment5 = makeComment(jekyllProject, "https://jekyll.blog/post/1", "댓글9");

        commentList.add(jekyllProjectComment1);
        commentList.add(tstoryProjectComment1);
        commentList.add(jekyllProjectComment2);
        commentList.add(tstoryProjectComment2);
        commentList.add(jekyllProjectComment3);
        commentList.add(tstoryProjectComment3);
        commentList.add(jekyllProjectComment4);
        commentList.add(tstoryProjectComment4);
        commentList.add(jekyllProjectComment5);

        Comments comments = new Comments(commentList);
        List<Comment> jekyllProjectComments = comments.match("https://jekyll.blog/post/1", jekyllProject.getSecretKey());

        assertThat(jekyllProjectComments).containsExactly(
            jekyllProjectComment1, jekyllProjectComment2,
            jekyllProjectComment3, jekyllProjectComment4,
            jekyllProjectComment5
        );
    }

    @DisplayName("비로그인 사용자가 볼 때, 모든 비밀 댓글의 본문 내용은 확인이 불가능하다.")
    @Test
    void handleSecretComments_guest_user() {
        Comment jekyllProjectComment1 = makeComment(guestUser, jekyllProject, "https://jekyll.blog/post/1", "댓글1", true);
        Comment jekyllProjectComment2 = makeComment(jekyllProject, "https://jekyll.blog/post/1", "댓글2");
        Comment jekyllProjectComment3 = makeComment(socialLoginUser, jekyllProject, "https://jekyll.blog/post/1", "댓글3",
            true);
        Comment jekyllProjectComment4 = makeComment(jekyllProject, "https://jekyll.blog/post/1", "댓글4");
        Comment jekyllProjectComment5 = makeComment(guestUser, jekyllProject, "https://jekyll.blog/post/1", "댓글5", true);

        commentList.add(jekyllProjectComment1);
        commentList.add(jekyllProjectComment2);
        commentList.add(jekyllProjectComment3);
        commentList.add(jekyllProjectComment4);
        commentList.add(jekyllProjectComment5);

        comments = new Comments(commentList);
        comments.handleSecretComments(guestUser, jekyllProject.getAdminUserId());

        for (Comment comment : comments.getComments()) {
            if (comment.isSecret()) {
                assertThat(comment.isReadable()).isFalse();
            }
        }
    }

    @DisplayName("로그인 사용자가 댓글을 볼 때, 자신이 쓴 댓글을 제외한 모든 비밀 댓글의 본문 내용은 확인이 불가능하다.")
    @Test
    void handleSecretComments_login_user() {
        Comment jekyllProjectComment1 = makeComment(guestUser, jekyllProject, "https://jekyll.blog/post/1", "댓글1", true);
        Comment jekyllProjectComment2 = makeComment(jekyllProject, "https://jekyll.blog/post/1", "댓글2");
        Comment jekyllProjectComment3 = makeComment(socialLoginUser, jekyllProject, "https://jekyll.blog/post/1", "댓글3",
            true);
        Comment jekyllProjectComment4 = makeComment(jekyllProject, "https://jekyll.blog/post/1", "댓글4");
        Comment jekyllProjectComment5 = makeComment(guestUser, jekyllProject, "https://jekyll.blog/post/1", "댓글5", true);

        commentList.add(jekyllProjectComment1);
        commentList.add(jekyllProjectComment2);
        commentList.add(jekyllProjectComment3);
        commentList.add(jekyllProjectComment4);
        commentList.add(jekyllProjectComment5);

        comments = new Comments(commentList);
        comments.handleSecretComments(socialLoginUser, jekyllProject.getAdminUserId());

        for (Comment comment : comments.getComments()) {
            if (comment.isSecret()) {
                if (socialLoginUser.isSameUser(comment.getUser())) {
                    assertThat(comment.isReadable()).isTrue();
                    continue;
                }
                assertThat(comment.isReadable()).isFalse();
            }
        }
    }

    @DisplayName("관리자는 모든 댓글을 열람할 수 있다.")
    @Test
    void handleSecretComments_admin() {
        Comment jekyllProjectComment1 = makeComment(guestUser, jekyllProject, "https://jekyll.blog/post/1", "댓글1", true);
        Comment jekyllProjectComment2 = makeComment(jekyllProject, "https://jekyll.blog/post/1", "댓글2");
        Comment jekyllProjectComment3 = makeComment(socialLoginUser, jekyllProject, "https://jekyll.blog/post/1", "댓글3",
            true);
        Comment jekyllProjectComment4 = makeComment(jekyllProject, "https://jekyll.blog/post/1", "댓글4");
        Comment jekyllProjectComment5 = makeComment(guestUser, jekyllProject, "https://jekyll.blog/post/1", "댓글5", true);

        commentList.add(jekyllProjectComment1);
        commentList.add(jekyllProjectComment2);
        commentList.add(jekyllProjectComment3);
        commentList.add(jekyllProjectComment4);
        commentList.add(jekyllProjectComment5);

        comments = new Comments(commentList);
        comments.handleSecretComments(socialLoginUser, jekyllProject.getAdminUserId());

        for (Comment comment : comments.getComments()) {
            assertThat(comment.isReadable()).isTrue();
        }
    }

    private Comment makeComment(Project project, String url, String content) {
        return Comment.builder()
            .id(1L)
            .user(socialLoginUser)
            .project(project)
            .url(url)
            .content(content)
            .build();
    }

    private Comment makeComment(User user, Project project, String url, String content, boolean secret) {
        return Comment.builder()
            .id(1L)
            .user(user)
            .project(project)
            .url(url)
            .content(content)
            .secret(secret)
            .build();
    }

}