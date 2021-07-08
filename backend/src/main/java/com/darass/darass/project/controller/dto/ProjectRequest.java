package com.darass.darass.project.controller.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ProjectRequest {
    private String name;
    private String secretKey;
    private Long userId;
}
