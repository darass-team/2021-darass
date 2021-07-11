package com.darass.darass.project.controller.dto;

import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
