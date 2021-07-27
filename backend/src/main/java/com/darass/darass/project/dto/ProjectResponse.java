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

    private String description;

    private Long userId;

    public ProjectResponse(Long userId) {
        this.userId = userId;
    }

    public static ProjectResponse from(Project project) {
<<<<<<< HEAD
        return new ProjectResponse(project.getId(), project.getName(), project.getSecretKey(), project.getAdminUserId());
=======
        return new ProjectResponse(project.getId(), project.getName(), project.getSecretKey(), project.getDescription(),
            null);
>>>>>>> 098b264 (feat: 프로젝트 설명 필드 변수명 수정)
    }

    public static ProjectResponse from(Long userId) {
        return new ProjectResponse(userId);
    }
}
