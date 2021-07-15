package com.darass.darass.project.service;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;

import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.project.controller.dto.ProjectCreateRequest;
import com.darass.darass.project.controller.dto.ProjectResponse;
import com.darass.darass.project.domain.Project;
import com.darass.darass.project.repository.ProjectRepository;
import com.darass.darass.user.domain.GuestUser;
import com.darass.darass.user.domain.User;
import com.darass.darass.user.repository.UserRepository;
import java.util.Optional;
import org.assertj.core.api.AssertionsForClassTypes;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
@SpringBootTest
@DisplayName("ProjectService 클래스")
public class ProjectServiceTest {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserRepository users;

    @Autowired
    private ProjectRepository projects;

    private User user;

    @BeforeEach
    @DisplayName("User 생성")
    public void setUp() {
        user = GuestUser.builder()
            .nickName("abc")
            .password("abc")
            .build();
        users.save(user);
    }

    @Test
    @DisplayName("Project를 정상적으로 저장하는 지 체크")
    public void save_success() {

        String projectName = "AAA";
        String secretKey = "aaaa";
        ProjectResponse savedProject = projectService
            .save(new ProjectCreateRequest(projectName), user, new CustomSecretKeyFactory(secretKey));
        Optional<Project> foundProject = projects
            .findByIdAndUserId(savedProject.getId(), user.getId());

        assertThat(foundProject.isPresent()).isTrue();
        Project project = foundProject.get();
        assertThat(project.getName()).isEqualTo(projectName);
        assertThat(project.getSecretKey()).isEqualTo(secretKey);
    }

    @Test
    @DisplayName("중복된 Secret Key를 발급했을 때, 예외를 터뜨리는 지 체크")
    public void save_validateDuplicateSecretKey() {
        projectService.save(new ProjectCreateRequest("A 프로젝트"), user, new CustomSecretKeyFactory("abcd"));

        assertThatThrownBy(() -> {
            projectService.save(new ProjectCreateRequest("B 프로젝트"), user, new CustomSecretKeyFactory("abcd"));
        }).isInstanceOf(ExceptionWithMessageAndCode.DUPLICATE_PROJECT_SECRET_KET.getException().getClass());
    }
}
