package com.darass.darass.project.service;

import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.project.controller.dto.ProjectCreateRequest;
import com.darass.darass.project.controller.dto.ProjectResponse;
import com.darass.darass.project.domain.Project;
import com.darass.darass.project.domain.RandomSecretKeyFactory;
import com.darass.darass.project.domain.SecretKeyFactory;
import com.darass.darass.project.repository.ProjectRepository;
import com.darass.darass.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projects;

    public ProjectResponse save(ProjectCreateRequest projectRequest, User user, SecretKeyFactory secretKeyFactory) {
        Project project = Project.builder()
                .name(projectRequest.getName())
                .secretKeyFactory(secretKeyFactory)
                .user(user)
                .build();
        try {
            projects.save(project);
        } catch (DataIntegrityViolationException e){
            if (e.getLocalizedMessage().contains("SECRET_KEY_UNIQUE")) {
                throw ExceptionWithMessageAndCode.DUPLICATE_PROJECT_SECRET_KET.getException();
            }
            throw ExceptionWithMessageAndCode.INTERNAL_SERVER.getException();
        }
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
