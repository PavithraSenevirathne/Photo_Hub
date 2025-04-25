package com.example.backend.repo;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
}
