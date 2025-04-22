package com.example.backend.service.service;

import com.example.backend.service.model.Project;
import com.example.backend.service.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    // Create a new project
    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    // Get all projects
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    // Get a project by ID
    public Project getProjectById(Long id) {
        return projectRepository.findById(id).orElse(null);
    }

    // Get a project by name
    public Project getProjectByName(String name) {
        return projectRepository.findByName(name);
    }

    // Delete a project
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    // Update project details
    public Project updateProject(Long id, Project updatedProject) {
        Project project = projectRepository.findById(id).orElse(null);
        if (project != null) {
            project.setName(updatedProject.getName());
            project.setDescription(updatedProject.getDescription());
            return projectRepository.save(project);
        }
        return null;
    }
}
