package com.darass.darass.project.service;

import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.project.controller.dto.ProjectRequest;
import com.darass.darass.project.controller.dto.ProjectResponse;
import com.darass.darass.project.domain.Project;
import com.darass.darass.project.repository.ProjectRepository;
import com.darass.darass.user.domain.User;
import com.darass.darass.user.repository.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projects;
    private final UserRepository users;

    public ProjectResponse save(ProjectRequest projectRequest, User user) {
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
                .orElseThrow(() -> ExceptionWithMessageAndCode.NOT_FOUND_PROJECT.getException());
        return ProjectResponse.of(project);
    }

    public void deleteById(Long projectId) {
        if (!projects.existsById(projectId)) {
            throw ExceptionWithMessageAndCode.NOT_FOUND_PROJECT.getException();
        }
        projects.deleteById(projectId);
    }
}
