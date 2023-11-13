package com.iems.usermanagementmicroservice.service;

import com.iems.usermanagementmicroservice.model.UserModel;
import com.iems.usermanagementmicroservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RestTemplate restTemplate;

    @Autowired
    public UserService(UserRepository userRepository, RestTemplate restTemplate) {
        this.userRepository = userRepository;
        this.restTemplate = restTemplate;
    }

    public List<UserModel> getUsers() {
        return userRepository.findAll();
    }

    public void createUser(UserModel userModel) {
        Optional<UserModel> userOptional = userRepository.findUserModelByEmail(userModel.getEmail());
        if (userOptional.isPresent()) {
            throw new IllegalStateException("Email is taken");
        }
        userRepository.save(userModel);
    }

    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new IllegalStateException("User with id = " + userId + " does not exist");
        }
        String url = "http://localhost:8082/devices?userId=" + userId;
        restTemplate.delete(url);
        userRepository.deleteById(userId);
    }

    public void updateUser(UserModel userModel) {
        Optional<UserModel> userOptional = userRepository.findUserModelByEmail(userModel.getEmail());
        if (userOptional.isPresent()) {
            throw new IllegalStateException("Email is taken");
        }
        userRepository.save(userModel);
    }
}
