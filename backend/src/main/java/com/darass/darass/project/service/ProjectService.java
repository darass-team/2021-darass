package com.darass.darass.project.service;

import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.project.controller.dto.ProjectCreateRequest;
import com.darass.darass.project.controller.dto.ProjectResponse;
import com.darass.darass.project.domain.Project;
import com.darass.darass.project.repository.ProjectRepository;
import com.darass.darass.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projects;

    public ProjectResponse save(ProjectCreateRequest projectRequest, User user) {
        Project project = Project.builder()
                .name(projectRequest.getName())
                .secretKey(projectRequest.getSecretKey())
                .user(user)
                .build();
        projects.save(project);
        return ProjectResponse.of(project);
    }

    public List<ProjectResponse> findByUserId(Long id) {
        return projects.findByUserId(id);
    }

    public ProjectResponse findByIdAndUserId(Long projectId, Long userId) {
        Project project = projects.findByIdAndUserId(projectId, userId)
            .orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_PROJECT::getException);
        return ProjectResponse.of(project);
    }

    public void deleteByIdAndUserId(Long projectId, Long userId) {
        if (!projects.existsByIdAndUserId(projectId, userId)) {
            throw ExceptionWithMessageAndCode.NOT_FOUND_PROJECT.getException();
        }
        projects.deleteByIdAndUserId(projectId, userId);
    }
}
