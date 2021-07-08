package com.darass.darass.project.repository;

import com.darass.darass.project.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    Project findBySecretKey(String projectSecretKey);
}
