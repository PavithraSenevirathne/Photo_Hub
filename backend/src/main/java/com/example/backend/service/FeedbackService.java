package com.example.backend.service;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entity.Feedback;
import com.example.backend.repo.FeedbackRepository;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepo;

    public List<Feedback> getAllFeedback() {
        return feedbackRepo.findAll();
    }

    public Optional<Feedback> getFeedbackById(Long id) {
        return feedbackRepo.findById(id);
    }

    public Feedback createFeedback(Feedback feedback) {
        return feedbackRepo.save(feedback);
    }

    public void deleteFeedback(Long id) {
        feedbackRepo.deleteById(id);
    }
}
