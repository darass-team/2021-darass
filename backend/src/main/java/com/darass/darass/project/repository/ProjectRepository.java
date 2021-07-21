package com.darass.darass.project.repository;

import com.darass.darass.project.controller.dto.ProjectResponse;
import com.darass.darass.project.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    Optional<Project> findBySecretKey(String projectSecretKey);

    List<ProjectResponse> findByUserId(Long userId);

    Optional<Project> findByIdAndUserId(Long projectId, Long userId);

    Optional<Project> findByNameAndUserId(String name, Long userId);

    void deleteByIdAndUserId(Long projectId, Long userId);

    boolean existsByIdAndUserId(Long projectId, Long userId);
}
