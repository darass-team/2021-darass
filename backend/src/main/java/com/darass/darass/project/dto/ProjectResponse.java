package com.darass.darass.project.dto;

import com.darass.darass.project.domain.Project;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProjectResponse {

    private Long id;

    private String name;

    private String secretKey;

    private Long userId;

    public ProjectResponse(Long userId) {
        this.userId = userId;
    }

    public static ProjectResponse from(Project project) {
        return new ProjectResponse(project.getId(), project.getName(), project.getSecretKey(), project.getAdminUserId());
    }

    public static ProjectResponse from(Long userId) {
        return new ProjectResponse(userId);
    }
}
