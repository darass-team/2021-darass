package com.darass.project.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.darass.auth.domain.KaKaoOAuthProvider;
import com.darass.comment.domain.Comment;
import com.darass.comment.repository.CommentRepository;
import com.darass.exception.ExceptionWithMessageAndCode;
import com.darass.project.repository.ProjectRepository;
import com.darass.user.domain.SocialLoginUser;
import com.darass.user.repository.UserRepository;
import java.util.stream.IntStream;
import javax.transaction.Transactional;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
@DisplayName("Project 클래스")
@DataJpaTest
class ProjectTest {

    private Project project;

    private SocialLoginUser socialLoginUser;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Transactional
    @BeforeEach
    void setUp() {
        socialLoginUser = SocialLoginUser.builder()
            .nickName("우기")
            .profileImageUrl("http://프로필이미지-url")
            .userType("socialLoginUser")
            .email("bbwwpark@naver.com")
            .oauthProvider(KaKaoOAuthProvider.NAME)
            .oauthId("1234")
            .build();
        userRepository.save(socialLoginUser);

        project = createProject(socialLoginUser, "깃헙 지킬 블로그", "개발 공부 기록용");
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

    @DisplayName("잘못된 길이의 이름, 설명으로 생성하는 경우 예외가 발생한다.")
    @Test
    void invalidLengthCreate() {
        StringBuilder stringBuilder = new StringBuilder();
        IntStream.rangeClosed(0, 100)
            .forEach(it -> stringBuilder.append("invalid"));
        String invalidInput = stringBuilder.toString();

        assertThatThrownBy(() -> createProject(socialLoginUser, invalidInput, "validInput"))
            .isInstanceOf(ExceptionWithMessageAndCode.INVALID_INPUT_LENGTH.getException().getClass());

        assertThatThrownBy(() -> createProject(socialLoginUser, "validInput", invalidInput))
            .isInstanceOf(ExceptionWithMessageAndCode.INVALID_INPUT_LENGTH.getException().getClass());
    }

    @DisplayName("잘못된 길이의 이름, 설명으로 수정하는 경우 예외가 발생한다.")
    @Test
    void invalidLengthUpdate() {
        StringBuilder stringBuilder = new StringBuilder();
        IntStream.rangeClosed(0, 100)
            .forEach(it -> stringBuilder.append("invalid"));
        String invalidInput = stringBuilder.toString();

        assertThatThrownBy(() -> project.update(invalidInput, "validInput"))
            .isInstanceOf(ExceptionWithMessageAndCode.INVALID_INPUT_LENGTH.getException().getClass());

        assertThatThrownBy(() -> project.update("validInput", invalidInput))
            .isInstanceOf(ExceptionWithMessageAndCode.INVALID_INPUT_LENGTH.getException().getClass());
    }

    private Project createProject(SocialLoginUser socialLoginUser, String name, String description) {
        return Project.builder()
            .user(socialLoginUser)
            .name(name)
            .description(description)
            .build();
    }
}

