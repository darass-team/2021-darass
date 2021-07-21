package com.darass.darass.project.service;

import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.project.domain.Project;
import com.darass.darass.project.domain.SecretKeyFactory;
import com.darass.darass.project.dto.ProjectCreateRequest;
import com.darass.darass.project.dto.ProjectResponse;
import com.darass.darass.project.repository.ProjectRepository;
import com.darass.darass.user.domain.User;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectResponse save(ProjectCreateRequest projectRequest, User user, SecretKeyFactory secretKeyFactory) {
        validateDuplicateProjectName(projectRequest, user);
        Project project = Project.builder()
            .name(projectRequest.getName())
            .secretKeyFactory(secretKeyFactory)
            .user(user)
            .build();

        try {
            projectRepository.save(project);
        } catch (DataIntegrityViolationException e) {
            if (e.getLocalizedMessage().contains("SECRET_KEY_UNIQUE")) {
                throw ExceptionWithMessageAndCode.DUPLICATE_PROJECT_SECRET_KEY.getException();
            }
            throw ExceptionWithMessageAndCode.INTERNAL_SERVER.getException();
        }
        return ProjectResponse.from(project);
    }

    private void validateDuplicateProjectName(ProjectCreateRequest projectRequest, User user) {
        Optional<Project> possibleProject = projects
            .findByNameAndUserId(projectRequest.getName(), user.getId());
        possibleProject.ifPresent(project -> {
            throw ExceptionWithMessageAndCode.DUPLICATE_PROJECT_NAME.getException();
        });
    }

    public List<ProjectResponse> findByUserId(Long id) {
        return projectRepository.findByUserId(id);
    }

    public ProjectResponse findByIdAndUserId(Long projectId, Long userId) {
        Project project = projectRepository.findByIdAndUserId(projectId, userId)
            .orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_PROJECT::getException);
        return ProjectResponse.from(project);
    }

    public void deleteByIdAndUserId(Long projectId, Long userId) {
        if (!projectRepository.existsByIdAndUserId(projectId, userId)) {
            throw ExceptionWithMessageAndCode.NOT_FOUND_PROJECT.getException();
        }
        projectRepository.deleteByIdAndUserId(projectId, userId);
    }

    public ProjectResponse findUserIdBySecretKey(String secretKey) {
        Optional<Project> expectedProject = projectRepository.findBySecretKey(secretKey);
        Project project = expectedProject.orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_PROJECT::getException);

        return ProjectResponse.from(project.getUser().getId());
    }

}
