package com.example.backend.service.service;

import com.example.backend.service.model.Feedback;
import com.example.backend.service.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    // Create a new feedback
    public Feedback createFeedback(Feedback feedback) {
        feedback.setCreatedDate(java.time.LocalDate.now()); // Set the creation date automatically
        return feedbackRepository.save(feedback);
    }

    // Get feedback for a specific project
    public List<Feedback> getFeedbackByProject(Long projectId) {
        return feedbackRepository.findByProjectId(projectId);
    }

    // Get feedback for a specific task
    public List<Feedback> getFeedbackByTask(Long taskId) {
        return feedbackRepository.findByTaskId(taskId);
    }

    // Get feedback submitted by a specific user
    public List<Feedback> getFeedbackByUser(Long userId) {
        return feedbackRepository.findByUserId(userId);
    }

    // Update feedback
    public Feedback updateFeedback(Long id, Feedback updatedFeedback) {
        Feedback feedback = feedbackRepository.findById(id).orElse(null);
        if (feedback != null) {
            feedback.setContent(updatedFeedback.getContent());
            feedback.setProject(updatedFeedback.getProject());
            feedback.setTask(updatedFeedback.getTask());
            feedback.setUser(updatedFeedback.getUser());
            return feedbackRepository.save(feedback);
        }
        return null;
    }

    // Delete feedback
    public void deleteFeedback(Long id) {
        feedbackRepository.deleteById(id);
    }
}
