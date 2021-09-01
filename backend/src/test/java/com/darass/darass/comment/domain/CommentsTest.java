package com.darass.darass.comment.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.darass.darass.project.domain.Project;
import com.darass.darass.user.domain.SocialLoginUser;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("Comments 클래스")
class CommentsTest {

    private final List<Comment> commentList = new ArrayList<>();
    private SocialLoginUser socialLoginUser;
    private Project jekyllProject;
    private Project tstoryProject;

    @BeforeEach
    void setUp() {
        socialLoginUser = SocialLoginUser.builder()
            .id(1L)
            .nickName("우기")
            .profileImageUrl("http://프로필이미지-url")
            .userType("socialLoginUser")
            .email("bbwwpark@naver.com")
            .oauthProvider("kakao")
            .oauthId("1234")
            .build();

        jekyllProject = Project.builder()
            .id(1L)
            .user(socialLoginUser)
            .name("네이버 블로그")
            .build();

        tstoryProject = Project.builder()
            .id(1L)
            .user(socialLoginUser)
            .name("카카오 블로그")
            .build();
    }

    @DisplayName("match 메서드는 url과 프로젝트 시크릿 키가 주어지면, 해당하는 댓글 리스트를 반환한다.")
    @Test
    void commentMatch() {
        Comment jekyllProjectComment1 = makeComment(jekyllProject, "https://jekyll.blog/post/1", "댓글1");
        Comment tstoryProjectComment1 = makeComment(tstoryProject, "https://tstory.blog/post/2", "댓글2");
        Comment jekyllProjectComment2 = makeComment(jekyllProject, "https://jekyll.blog/post/1", "댓글3");
        Comment tstoryProjectComment2 = makeComment(tstoryProject, "https://tstory.blog/post/2", "댓글4");
        Comment jekyllProjectComment3 = makeComment(jekyllProject, "https://jekyll.blog/post/1", "댓글5");
        Comment tstoryProjectComment3 = makeComment(tstoryProject, "https://tstory.blog/post/2", "댓글6");
        Comment jekyllProjectComment4 = makeComment(jekyllProject, "https://jekyll.blog/post/1", "댓글7");
        Comment tstoryProjectComment4 = makeComment(tstoryProject, "https://tstory.blog/post/2", "댓글8");
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

    private Comment makeComment(Project project, String url, String content) {
        return Comment.builder()
            .id(1L)
            .user(socialLoginUser)
            .project(project)
            .url(url)
            .content(content)
            .build();
    }

}