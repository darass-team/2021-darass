package com.darass.darass.project.controller.dto;

import com.darass.darass.project.domain.Project;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProjectResponse {

    private Long id;
    private String name;

    public static ProjectResponse of(Project project) {
        return new ProjectResponse(project.getId(), project.getName());
    }
}
