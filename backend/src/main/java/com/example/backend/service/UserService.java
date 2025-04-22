package com.example.backend.service.service;

import com.example.backend.service.model.User;
import com.example.backend.service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User updateUserRole(Long userId, User.Role newRole) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            user.setRole(newRole);
            return userRepository.save(user);
        }
        return null;
    }
}
