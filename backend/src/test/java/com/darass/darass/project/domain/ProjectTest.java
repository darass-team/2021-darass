package com.darass.darass.project.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.darass.darass.comment.domain.Comment;
import com.darass.darass.comment.repository.CommentRepository;
import com.darass.darass.project.repository.ProjectRepository;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.repository.UserRepository;
import javax.transaction.Transactional;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

@DisplayName("Project 클래스")
@DataJpaTest
@ActiveProfiles("test")
class ProjectTest {

    private Project project;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Transactional
    @BeforeEach
    void setUp() {
        SocialLoginUser socialLoginUser = SocialLoginUser.builder()
            .nickName("우기")
            .profileImageUrl("http://프로필이미지-url")
            .userType("socialLoginUser")
            .email("bbwwpark@naver.com")
            .oAuthProvider("kakao")
            .oauthId("1234")
            .build();
        userRepository.save(socialLoginUser);

        project = Project.builder()
            .user(socialLoginUser)
            .name("깃헙 지킬 블로그")
            .description("개발 공부 기록용")
            .build();
        projectRepository.save(project);

        Comment comment = Comment.builder()
            .project(project)
            .user(socialLoginUser)
            .url("댓글 url")
            .content("댓글 내용")
            .build();
        commentRepository.save(comment);
    }

    @AfterEach
    void tearDown() {
        commentRepository.deleteAllInBatch();
        projectRepository.deleteAllInBatch();
        userRepository.deleteAllInBatch();
    }

    @DisplayName("isSame 메서드는 같은 프로젝트 키가 주어지면, true를 반환한다.")
    @Test
    void isSame() {
        String secretKey = project.getSecretKey();
        assertThat(project.isSame(secretKey)).isTrue();
    }

    @DisplayName("isSame 메서드는 다른 프로젝트 키가 주어지면, false를 반환한다.")
    @Test
    void isSame_fail() {
        String secretKey = project.getSecretKey();
        assertThat(project.isSame("invalid" + secretKey)).isFalse();
    }

    @DisplayName("delete메서드는 프로젝트가 주어지면, 프로젝트를 삭제한다.")
    @Test
    void delete() {
        projectRepository.delete(project);
        assertThat(projectRepository.findAll().size()).isEqualTo(0);
    }

}

