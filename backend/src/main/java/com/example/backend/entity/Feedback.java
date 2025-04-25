package com.example.backend.entity;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;

    private LocalDateTime timestamp;

    // Who gave the feedback
    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;

    // Project related to feedback
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    public Feedback() {}

    public Feedback(String message, LocalDateTime timestamp, User sender, Project project) {
        this.message = message;
        this.timestamp = timestamp;
        this.sender = sender;
        this.project = project;
    }
    public Long getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
