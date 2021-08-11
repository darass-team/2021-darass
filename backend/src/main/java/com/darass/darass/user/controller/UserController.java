package com.darass.darass.user.controller;

import com.darass.darass.auth.oauth.domain.RequiredLogin;
import com.darass.darass.user.domain.User;
import com.darass.darass.user.dto.PasswordCheckRequest;
import com.darass.darass.user.dto.PasswordCheckResponse;
import com.darass.darass.user.dto.UserResponse;
import com.darass.darass.user.dto.UserUpdateRequest;
import com.darass.darass.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RequestMapping("/api/v1/users")
@RestController
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<UserResponse> find(@RequiredLogin User user) {
        UserResponse userResponse = userService.findById(user.getId());
        return ResponseEntity.ok(userResponse);
    }

    @PatchMapping
    public ResponseEntity<UserResponse> updateNickname(@RequiredLogin User user,
        @ModelAttribute UserUpdateRequest userUpdateRequest
    ) {
        UserResponse userResponse = userService.update(user.getId(), userUpdateRequest);
        return ResponseEntity.ok(userResponse);
    }

    @DeleteMapping
    public ResponseEntity<Void> delete(@RequiredLogin User user) {
        userService.deleteById(user.getId());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/check-password")
    public ResponseEntity<PasswordCheckResponse> checkGuestUserPassword(
        @ModelAttribute PasswordCheckRequest passwordCheckRequest) {
        PasswordCheckResponse passwordCheckResponse = userService.checkGuestUserPassword(passwordCheckRequest);
        return ResponseEntity.ok(passwordCheckResponse);
    }
}
