package com.darass.project.service;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;

import com.darass.SpringContainerTest;
import com.darass.exception.ExceptionWithMessageAndCode;
import com.darass.project.domain.Project;
import com.darass.project.dto.ProjectCreateRequest;
import com.darass.project.dto.ProjectResponse;
import com.darass.project.dto.ProjectUpdateRequest;
import com.darass.project.repository.ProjectRepository;
import com.darass.user.domain.SocialLoginUser;
import com.darass.user.repository.UserRepository;
import java.util.List;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@DisplayName("ProjectService 클래스")
public class ProjectServiceTest extends SpringContainerTest {

    private final static String JEKYLL_PROJECT_NAME = "지킬 블로그 프로젝트";
    private final static String JEKYLL_PROJECT_DESCRIPTION = "지킬 블로그 프로젝트 설명";
    private final static String TSTORY_PROJECT_NAME = "티스토리 블로그 프로젝트";
    private final static String TSTORY_PROJECT_DESCRIPTION = "티스토리 블로그 프로젝트 설명";

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    private SocialLoginUser socialLoginUser;

    @BeforeEach
    public void setUp() {
        socialLoginUser = SocialLoginUser.builder()
            .nickName("우기")
            .profileImageUrl("http://프로필이미지-url")
            .userType("socialLoginUser")
            .email("bbwwpark@naver.com")
            .oauthProvider("kakao")
            .oauthId("1234")
            .build();
        userRepository.save(socialLoginUser);
    }

    @DisplayName("유저 id로 유저가 만든 프로젝트 목록을 조회한다.")
    @Test
    public void findByUserId() {
        projectService.save(new ProjectCreateRequest(JEKYLL_PROJECT_NAME, JEKYLL_PROJECT_DESCRIPTION), socialLoginUser);
        projectService.save(new ProjectCreateRequest(TSTORY_PROJECT_NAME, TSTORY_PROJECT_DESCRIPTION), socialLoginUser);

        //when
        List<ProjectResponse> projectResponses = projectService.findByUserId(socialLoginUser.getId());

        //then
        assertThat(projectResponses.size()).isEqualTo(2);
        assertThat(projectResponses.get(0).getName()).isEqualTo(JEKYLL_PROJECT_NAME);
        assertThat(projectResponses.get(1).getName()).isEqualTo(TSTORY_PROJECT_NAME);
    }

    @DisplayName("프로젝트 id와 유저 id로 유저가 만든 프로젝트 목록을 조회한다.")
    @Test
    public void findByIdAndUserId() {
        //given
        projectService.save(new ProjectCreateRequest(JEKYLL_PROJECT_NAME, JEKYLL_PROJECT_DESCRIPTION), socialLoginUser);
        projectService.save(new ProjectCreateRequest(TSTORY_PROJECT_NAME, TSTORY_PROJECT_DESCRIPTION), socialLoginUser);
        Project jekyllProject = findFirstSavedProject();

        //when
        ProjectResponse projectResponse = projectService.findByIdAndUserId(jekyllProject.getId(), socialLoginUser.getId());

        //then
        assertThat(projectResponse.getName()).isEqualTo(JEKYLL_PROJECT_NAME);
    }

    @DisplayName("프로젝트가 존재하지 않는 경우 예외를 던진다.(findByIdAndUserId)")
    @Test
    public void findByIdAndUserId_exception() {
        assertThatThrownBy(() -> {
            projectService.findByIdAndUserId(100L, socialLoginUser.getId());
        }).isEqualTo(ExceptionWithMessageAndCode.NOT_FOUND_PROJECT.getException());
    }

    @DisplayName("프로젝트 시크릿키로 프로젝트를 생성한 유저 id를 조회한다.")
    @Test
    public void findUserIdBySecretKey() {
        //given
        projectService.save(new ProjectCreateRequest(JEKYLL_PROJECT_NAME, JEKYLL_PROJECT_DESCRIPTION), socialLoginUser);
        projectService.save(new ProjectCreateRequest(TSTORY_PROJECT_NAME, TSTORY_PROJECT_DESCRIPTION), socialLoginUser);

        Project jekyllProject = findFirstSavedProject();
        String secretKey = jekyllProject.getSecretKey();

        //when
        ProjectResponse projectResponse = projectService.findUserIdBySecretKey(secretKey);

        //then
        assertThat(projectResponse.getUserId()).isEqualTo(socialLoginUser.getId());
    }

    @DisplayName("프로젝트가 존재하지 않는 경우 예외를 던진다.(findUserIdBySecretKey)")
    @Test
    public void findUserIdBySecretKey_exception() {
        assertThatThrownBy(() -> {
            projectService.findUserIdBySecretKey("invalidSecretKey");
        }).isEqualTo(ExceptionWithMessageAndCode.NOT_FOUND_PROJECT.getException());
    }

    @Test
    @DisplayName("프로젝트 이름과 유저 id로 프로젝트를 생성한다.")
    public void save_success() {
        ProjectResponse projectResponse =
            projectService.save(new ProjectCreateRequest(JEKYLL_PROJECT_NAME, JEKYLL_PROJECT_DESCRIPTION), socialLoginUser);

        assertThat(projectResponse.getName()).isEqualTo(JEKYLL_PROJECT_NAME);
    }

    @DisplayName("프로젝트 이름이 중복될 경우 예외를 던진다.")
    @Test
    public void save_validateDuplicateProjectName() {
        projectService.save(new ProjectCreateRequest(JEKYLL_PROJECT_NAME, JEKYLL_PROJECT_DESCRIPTION), socialLoginUser);

        assertThatThrownBy(() -> {
            projectService.save(new ProjectCreateRequest(JEKYLL_PROJECT_NAME, JEKYLL_PROJECT_DESCRIPTION), socialLoginUser);
        }).isEqualTo(ExceptionWithMessageAndCode.DUPLICATE_PROJECT_NAME.getException());
    }

    @DisplayName("프로젝트 id와 유저 id로 프로젝트를 삭제한다.")
    @Test
    public void deleteByIdAndUserId_success() {
        ProjectResponse projectResponse = projectService
            .save(new ProjectCreateRequest(JEKYLL_PROJECT_NAME, JEKYLL_PROJECT_DESCRIPTION), socialLoginUser);

        projectService.deleteByIdAndUserId(projectResponse.getId(), socialLoginUser.getId());

        assertThat(projectRepository.findAll()).isEmpty();
    }

    @DisplayName("존재하지 않는 프로젝트 id 또는 존재하지 않는 유저 id로 프로젝트를 삭제하면, 예외를 던진다.")
    @Test
    public void deleteByIdAndUserId_fail() {
        projectService.save(new ProjectCreateRequest(JEKYLL_PROJECT_NAME, JEKYLL_PROJECT_DESCRIPTION), socialLoginUser);

        Assertions.assertThrows(ExceptionWithMessageAndCode.NOT_FOUND_PROJECT.getException().getClass(),
            () -> projectService.deleteByIdAndUserId(100L, 100L));
    }

    @DisplayName("프로젝트 id로 프로젝트 이름과 설명을 수정한다.")
    @Test
    public void updateById_success() {
        //given
        ProjectResponse projectResponse = projectService
            .save(new ProjectCreateRequest(JEKYLL_PROJECT_NAME, JEKYLL_PROJECT_DESCRIPTION), socialLoginUser);
        ProjectUpdateRequest projectUpdateRequest = new ProjectUpdateRequest(TSTORY_PROJECT_NAME,
            TSTORY_PROJECT_DESCRIPTION);

        //when
        ProjectResponse result = projectService.updateById(projectResponse.getId(), projectUpdateRequest);

        //then
        assertThat(result.getName()).isEqualTo(projectUpdateRequest.getName());
        assertThat(result.getDescription()).isEqualTo(projectUpdateRequest.getDescription());
    }

    @DisplayName("존재하지 않는 프로젝트 id로 프로젝트를 수정하면, 예외를 던진다.")
    @Test
    public void updateById_fail() {
        projectService.save(new ProjectCreateRequest(JEKYLL_PROJECT_NAME, JEKYLL_PROJECT_DESCRIPTION), socialLoginUser);
        ProjectUpdateRequest projectUpdateRequest = new ProjectUpdateRequest(TSTORY_PROJECT_NAME,
            TSTORY_PROJECT_DESCRIPTION);

        Assertions.assertThrows(ExceptionWithMessageAndCode.NOT_FOUND_PROJECT.getException().getClass(),
            () -> projectService.updateById(100L, projectUpdateRequest));
    }

    private Project findFirstSavedProject() {
        List<Project> projects = projectRepository.findByUserId(socialLoginUser.getId());
        return projects.get(0);
    }

}
