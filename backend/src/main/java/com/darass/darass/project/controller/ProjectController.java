package com.darass.darass.project.controller;

import com.darass.darass.auth.oauth.domain.RequiredLogin;
import com.darass.darass.project.domain.RandomSecretKeyFactory;
import com.darass.darass.project.dto.ProjectCreateRequest;
import com.darass.darass.project.dto.ProjectResponse;
import com.darass.darass.project.service.ProjectService;
import com.darass.darass.user.domain.User;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping("/user-id")
    public ResponseEntity<ProjectResponse> findUserIdBySecretKey(@RequestParam("secretKey") String secretKey) {
        ProjectResponse projectResponse = projectService.findUserIdBySecretKey(secretKey);
        return ResponseEntity.ok(projectResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") Long projectId, @RequiredLogin User user) {
        projectService.deleteByIdAndUserId(projectId, user.getId());
        return ResponseEntity.noContent().build();
    }
}
