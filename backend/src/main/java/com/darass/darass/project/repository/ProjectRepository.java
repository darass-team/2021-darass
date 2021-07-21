package com.darass.darass.project.repository;

import com.darass.darass.project.domain.Project;
import com.darass.darass.project.dto.ProjectResponse;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    Optional<Project> findBySecretKey(String projectSecretKey);

    List<ProjectResponse> findByUserId(Long userId); //TODO: List<Project> 반환하도록 수정

    Optional<Project> findByIdAndUserId(Long projectId, Long userId);

    void deleteByIdAndUserId(Long projectId, Long userId);

    boolean existsByIdAndUserId(Long projectId, Long userId);
}
