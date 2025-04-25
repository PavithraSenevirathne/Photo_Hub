package com.example.backend.service;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entity.Task;
import com.example.backend.repo.TaskRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepo;

    public List<Task> getAllTasks() {
        return taskRepo.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepo.findById(id);
    }

    public Task createTask(Task task) {
        return taskRepo.save(task);
    }

    public Task updateTask(Long id, Task updatedTask) {
        return taskRepo.findById(id).map(task -> {
            task.setTitle(updatedTask.getTitle());
            task.setDescription(updatedTask.getDescription());
            task.setStatus(updatedTask.getStatus());
            return taskRepo.save(task);
        }).orElse(null);
    }

    public void deleteTask(Long id) {
        taskRepo.deleteById(id);
    }
}
