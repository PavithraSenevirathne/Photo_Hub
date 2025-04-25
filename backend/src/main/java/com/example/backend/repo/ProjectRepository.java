package com.example.backend.repo; 
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
