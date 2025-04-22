package com.example.backend.service.service;

import com.example.backend.service.model.Task;
import com.example.backend.service.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    // Create a new task
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    // Get all tasks for a project
    public List<Task> getTasksByProject(Long projectId) {
        return taskRepository.findByProjectId(projectId);
    }

    // Get tasks assigned to a user
    public List<Task> getTasksByUser(Long userId) {
        return taskRepository.findByAssignedToId(userId);
    }

    // Get tasks by status
    public List<Task> getTasksByStatus(Task.Status status) {
        return taskRepository.findByStatus(status);
    }

    // Update a task
    public Task updateTask(Long id, Task updatedTask) {
        Task task = taskRepository.findById(id).orElse(null);
        if (task != null) {
            task.setName(updatedTask.getName());
            task.setDescription(updatedTask.getDescription());
            task.setDueDate(updatedTask.getDueDate());
            task.setStatus(updatedTask.getStatus());
            task.setAssignedTo(updatedTask.getAssignedTo());
            task.setProject(updatedTask.getProject());
            return taskRepository.save(task);
        }
        return null;
    }

    // Delete a task
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
