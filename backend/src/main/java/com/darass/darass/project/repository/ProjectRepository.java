package com.darass.darass.project.repository;

import com.darass.darass.project.controller.dto.ProjectResponse;
import com.darass.darass.project.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    Project findBySecretKey(String projectSecretKey);

    List<ProjectResponse> findByUserId(Long userId);
}
