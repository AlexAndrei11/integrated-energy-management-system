package com.iems.usermanagementmicroservice.controller;

import com.iems.usermanagementmicroservice.model.UserModel;
import com.iems.usermanagementmicroservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/users")
public class UsersController {

    private final UserService userService;

    @Autowired
    public UsersController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserModel> getUsers() {
        return userService.getUsers();
    }

    @GetMapping(path = "/{userId}")
    public ResponseEntity<UserModel> getUser(@PathVariable("userId") Long userId) {
        try {
            UserModel userModel = userService.getUser(userId);
            return new ResponseEntity<>(userModel, HttpStatus.OK);
        } catch (IllegalStateException exception) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public void createUser(@RequestBody UserModel userModel) {
        userService.createUser(userModel);
    }

    @DeleteMapping(path = "/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId) {
        userService.deleteUser(userId);
    }

    @PutMapping
    public void updateUser(@RequestBody UserModel userModel) {
        userService.updateUser(userModel);
    }
}
