package com.example.backend.service;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entity.Project;
import com.example.backend.repo.ProjectRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepo;

    public List<Project> getAllProjects() {
        return projectRepo.findAll();
    }

    public Optional<Project> getProjectById(Long id) {
        return projectRepo.findById(id);
    }

    public Project createProject(Project project) {
        return projectRepo.save(project);
    }

    public Project updateProject(Long id, Project updatedProject) {
        return projectRepo.findById(id).map(project -> {
            project.setName(updatedProject.getName());
            project.setDescription(updatedProject.getDescription());
            return projectRepo.save(project);
        }).orElse(null);
    }

    public void deleteProject(Long id) {
        projectRepo.deleteById(id);
    }
}
