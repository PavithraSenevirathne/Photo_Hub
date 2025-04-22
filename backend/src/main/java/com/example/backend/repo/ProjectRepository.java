package com.example.backend.service.repository;

import com.example.backend.service.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    // Custom queries for Project can be added here
    Project findByName(String name);
}
