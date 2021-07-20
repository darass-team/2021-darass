package com.darass.darass.comment.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.darass.darass.project.domain.CustomSecretKeyFactory;
import com.darass.darass.project.domain.Project;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("Comments 클래스")
class CommentsTest {

    private final List<Comment> commentList = new ArrayList<>();

    private Comment makeComment(String url, String projectKey, String content) {
        Project project = new Project(null, "프로젝트 이름", new CustomSecretKeyFactory(projectKey));
        return Comment.builder()
            .id(1L)
            .project(project)
            .url(url)
            .content(content)
            .build();
    }

    @DisplayName("commentMatch 메서드는 url과 프로젝트 시크릿 키가 주어지면, 해당하는 댓글 리스트를 반환한다.")
    @Test
    void commentMatch() {
        Comment naverProjectComment1 = makeComment("https://naver.blog/post/1", "naverProjectKey", "댓글1");
        Comment kakaoProjectComment1 = makeComment("https://kakao.blog/post/2", "kakaoProjectKey", "댓글2");
        Comment naverProjectComment2 = makeComment("https://naver.blog/post/1", "naverProjectKey", "댓글3");
        Comment kakaoProjectComment2 = makeComment("https://kakao.blog/post/2", "kakaoProjectKey", "댓글4");
        Comment naverProjectComment3 = makeComment("https://naver.blog/post/1", "naverProjectKey", "댓글5");
        Comment kakaoProjectComment3 = makeComment("https://kakao.blog/post/2", "kakaoProjectKey", "댓글6");
        Comment naverProjectComment4 = makeComment("https://naver.blog/post/1", "naverProjectKey", "댓글7");
        Comment kakaoProjectComment4 = makeComment("https://kakao.blog/post/2", "kakaoProjectKey", "댓글8");
        Comment naverProjectComment5 = makeComment("https://naver.blog/post/1", "naverProjectKey", "댓글9");

        commentList.add(naverProjectComment1);
        commentList.add(kakaoProjectComment1);
        commentList.add(naverProjectComment2);
        commentList.add(kakaoProjectComment2);
        commentList.add(naverProjectComment3);
        commentList.add(kakaoProjectComment3);
        commentList.add(naverProjectComment4);
        commentList.add(kakaoProjectComment4);
        commentList.add(naverProjectComment5);

        Comments comments = new Comments(commentList);
        List<Comment> naverProjectComments = comments.match("https://naver.blog/post/1", "naverProjectKey");
        assertThat(naverProjectComments).containsExactly(
            naverProjectComment1, naverProjectComment2,
            naverProjectComment3, naverProjectComment4,
            naverProjectComment5
        );
    }


}