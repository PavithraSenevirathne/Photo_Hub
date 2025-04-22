package com.example.backend.service.controller;

import com.example.backend.service.model.Feedback;
import com.example.backend.service.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    // Get feedback for a specific project
    @GetMapping("/project/{projectId}")
    public List<Feedback> getFeedbackByProject(@PathVariable Long projectId) {
        return feedbackService.getFeedbackByProject(projectId);
    }

    // Get feedback for a specific task
    @GetMapping("/task/{taskId}")
    public List<Feedback> getFeedbackByTask(@PathVariable Long taskId) {
        return feedbackService.getFeedbackByTask(taskId);
    }

    // Get feedback by user
    @GetMapping("/user/{userId}")
    public List<Feedback> getFeedbackByUser(@PathVariable Long userId) {
        return feedbackService.getFeedbackByUser(userId);
    }

    // Create new feedback
    @PostMapping
    public Feedback createFeedback(@RequestBody Feedback feedback) {
        return feedbackService.createFeedback(feedback);
    }

    // Update existing feedback
    @PutMapping("/{id}")
    public Feedback updateFeedback(@PathVariable Long id, @RequestBody Feedback updatedFeedback) {
        return feedbackService.updateFeedback(id, updatedFeedback);
    }

    // Delete feedback
    @DeleteMapping("/{id}")
    public void deleteFeedback(@PathVariable Long id) {
        feedbackService.deleteFeedback(id);
    }
}
