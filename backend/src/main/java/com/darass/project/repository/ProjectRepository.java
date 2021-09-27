package com.darass.project.repository;

import com.darass.project.domain.Project;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    Optional<Project> findBySecretKey(String projectSecretKey);

    List<Project> findByUserId(Long userId);

    Optional<Project> findByIdAndUserId(Long projectId, Long userId);

    Optional<Project> findByNameAndUserId(String name, Long userId);

    void deleteByIdAndUserId(Long projectId, Long userId);

    boolean existsByIdAndUserId(Long projectId, Long userId);
}
