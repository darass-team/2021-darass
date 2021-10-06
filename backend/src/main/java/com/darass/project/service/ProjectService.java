package com.darass.project.service;

import com.darass.exception.ExceptionWithMessageAndCode;
import com.darass.project.domain.Project;
import com.darass.project.dto.ProjectCreateRequest;
import com.darass.project.dto.ProjectResponse;
import com.darass.project.dto.ProjectUpdateRequest;
import com.darass.project.repository.ProjectRepository;
import com.darass.user.domain.User;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
@Slf4j
public class ProjectService {

    private final ProjectRepository projectRepository;

    @Transactional(readOnly = true)
    public List<ProjectResponse> findByUserId(Long id) {
        List<Project> projects = projectRepository.findByUserId(id);

        return projects.stream()
            .map(ProjectResponse::from)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProjectResponse findByIdAndUserId(Long projectId, Long userId) {
        Project project = projectRepository.findByIdAndUserId(projectId, userId)
            .orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_PROJECT::getException);
        return ProjectResponse.from(project);
    }

    @Transactional(readOnly = true)
    public ProjectResponse findUserIdBySecretKey(String secretKey) {
        Optional<Project> expectedProject = projectRepository.findBySecretKey(secretKey);
        Project project = expectedProject.orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_PROJECT::getException);

        return ProjectResponse.from(project.getUser().getId());
    }

    public ProjectResponse save(ProjectCreateRequest projectCreateRequest, User user) {
        validateDuplicateProjectName(projectCreateRequest, user);
        Project project = Project.builder()
            .name(projectCreateRequest.getName())
            .user(user)
            .description(projectCreateRequest.getDescription())
            .build();

        projectRepository.save(project);
        return ProjectResponse.from(project);
    }

    private void validateDuplicateProjectName(ProjectCreateRequest projectRequest, User user) {
        Optional<Project> possibleProject = projectRepository
            .findByNameAndUserId(projectRequest.getName(), user.getId());
        possibleProject.ifPresent(project -> {
            throw ExceptionWithMessageAndCode.DUPLICATE_PROJECT_NAME.getException();
        });
    }

    public void deleteByIdAndUserId(Long id, Long userId) {
        if (!projectRepository.existsByIdAndUserId(id, userId)) {
            throw ExceptionWithMessageAndCode.NOT_FOUND_PROJECT.getException();
        }
        projectRepository.deleteByIdAndUserId(id, userId);
    }

    public ProjectResponse updateById(Long projectId, ProjectUpdateRequest projectUpdateRequest) {
        Project project = projectRepository.findById(projectId)
            .orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_PROJECT::getException);

        project.update(projectUpdateRequest.getName(), projectUpdateRequest.getDescription());

        return ProjectResponse.from(project);
    }
}
