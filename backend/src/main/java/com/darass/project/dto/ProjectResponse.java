package com.darass.project.dto;

import com.darass.project.domain.Project;
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

    private String description;

    private Long userId;

    public ProjectResponse(Long userId) {
        this.userId = userId;
    }

    public static ProjectResponse from(Project project) {
        return new ProjectResponse(project.getId(), project.getName(), project.getSecretKey(),
            project.getDescription(), project.getAdminUserId());
    }

    public static ProjectResponse from(Long userId) {
        return new ProjectResponse(userId);
    }
}
