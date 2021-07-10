package com.darass.darass.project.service;

import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.project.controller.dto.ProjectRequest;
import com.darass.darass.project.controller.dto.ProjectResponse;
import com.darass.darass.project.domain.Project;
import com.darass.darass.project.repository.ProjectRepository;
import com.darass.darass.user.domain.OAuthPlatform;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.domain.User;
import com.darass.darass.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projects;
    private final UserRepository users;

    public ProjectResponse save(ProjectRequest projectRequest) {
        //TODO : user api 구현 후 삭제
        users.save(new SocialLoginUser("aaron", "ouathId", OAuthPlatform.KAKAO, "wooteco@email.com"));

        User user = users.findById(projectRequest.getUserId())
                .orElseThrow(() -> ExceptionWithMessageAndCode.NOT_FOUND_USER.getException());
        Project project = Project.builder()
                .name(projectRequest.getName())
                .secretKey(projectRequest.getSecretKey())
                .user(user)
                .build();
        projects.save(project);
        return ProjectResponse.of(project);
    }

    public List<ProjectResponse> findByUserId(Long userId) {
        if (!users.existsById(userId)) {
            throw ExceptionWithMessageAndCode.NOT_FOUND_PROJECT.getException();
        }
        return projects.findByUserId(userId);
    }

    public ProjectResponse findById(Long projectId) {
        Project project = projects.findById(projectId)
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
