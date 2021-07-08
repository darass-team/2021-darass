package com.darass.darass.project.controller;

import com.darass.darass.project.controller.dto.ProjectRequest;
import com.darass.darass.project.controller.dto.ProjectResponse;
import com.darass.darass.project.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ProjectResponse> save(@RequestBody ProjectRequest projectRequest) {
        ProjectResponse projectResponse = projectService.save(projectRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(projectResponse);
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> findByUser(@RequestParam Long userId) {
        List<ProjectResponse> projectResponses = projectService.findByUserId(userId);
        return ResponseEntity.ok(projectResponses);
    }
}
