package com.example.backend.service.repository;

import com.example.backend.service.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> { 
    User findByEmail(String email);
}
