package com.darass.darass.project.repository;

import com.darass.darass.project.controller.dto.ProjectResponse;
import com.darass.darass.project.domain.Project;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    Project findBySecretKey(String projectSecretKey);

    List<ProjectResponse> findByUserId(Long userId);

    Optional<Project> findByIdAndUserId(Long projectId, Long userId);

    void deleteByIdAndUserId(Long projectId, Long userId);

    boolean existsByIdAndUserId(Long projectId, Long userId);
}
