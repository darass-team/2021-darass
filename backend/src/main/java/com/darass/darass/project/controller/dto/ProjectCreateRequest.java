package com.darass.darass.project.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@NoArgsConstructor
@Getter
@AllArgsConstructor
public class ProjectCreateRequest {

    @NotNull
    private String name;
    @NotNull
    private String secretKey;
    @NotNull
    private Long userId;
}
