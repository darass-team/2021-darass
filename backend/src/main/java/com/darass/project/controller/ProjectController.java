package com.darass.project.controller;

import com.darass.auth.domain.RequiredLogin;
import com.darass.project.dto.ProjectCreateRequest;
import com.darass.project.dto.ProjectResponse;
import com.darass.project.dto.ProjectUpdateRequest;
import com.darass.project.service.ProjectService;
import com.darass.user.domain.User;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/v1/projects")
@RestController
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ProjectResponse> save(@Valid @RequestBody ProjectCreateRequest projectRequest,
        @RequiredLogin User user) {
        ProjectResponse projectResponse = projectService.save(projectRequest, user);
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

    @GetMapping("/user-id")
    public ResponseEntity<ProjectResponse> findUserIdBySecretKey(@RequestParam("secretKey") String secretKey) {
        ProjectResponse projectResponse = projectService.findUserIdBySecretKey(secretKey);
        return ResponseEntity.ok(projectResponse);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ProjectResponse> updateById(@PathVariable("id") Long projectId,
        @Valid @RequestBody ProjectUpdateRequest projectUpdateRequest, @RequiredLogin User user) {
        ProjectResponse projectResponse = projectService.updateById(projectId, projectUpdateRequest);
        return ResponseEntity.ok(projectResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") Long id, @RequiredLogin User user) {
        projectService.deleteByIdAndUserId(id, user.getId());
        return ResponseEntity.noContent().build();
    }

}
