package com.darass.darass.project.controller;

import com.darass.darass.auth.oauth.domain.RequiredLogin;
import com.darass.darass.project.controller.dto.ProjectCreateRequest;
import com.darass.darass.project.controller.dto.ProjectResponse;
import com.darass.darass.project.domain.RandomSecretKeyFactory;
import com.darass.darass.project.service.ProjectService;
import com.darass.darass.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
@Validated
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ProjectResponse> save(@Valid @RequestBody ProjectCreateRequest projectRequest, @RequiredLogin User user) {
        ProjectResponse projectResponse = projectService.save(projectRequest, user, new RandomSecretKeyFactory());
        return ResponseEntity.status(HttpStatus.CREATED).body(projectResponse);
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> findByUser(@RequiredLogin User user) {
        List<ProjectResponse> projectResponses = projectService.findByUserId(user.getId());
        return ResponseEntity.ok(projectResponses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponse> findById(@PathVariable("id") Long projectId, @RequiredLogin User user) {
        ProjectResponse projectResponse = projectService.findByIdAndUserId(projectId, user.getId());
        return ResponseEntity.ok(projectResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") Long projectId, @RequiredLogin User user) {
        projectService.deleteByIdAndUserId(projectId, user.getId());
        return ResponseEntity.noContent().build();
    }
}
