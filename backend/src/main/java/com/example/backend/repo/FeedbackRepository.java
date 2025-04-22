package com.example.backend.service.repository;

import com.example.backend.service.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByProjectId(Long projectId);
    List<Feedback> findByTaskId(Long taskId);
    List<Feedback> findByUserId(Long userId);
}
