package com.darass.darass.user.controller;

import com.darass.darass.auth.oauth.domain.RequiredLogin;
import com.darass.darass.comment.controller.dto.UserResponse;
import com.darass.darass.user.controller.dto.PasswordCheckRequest;
import com.darass.darass.user.controller.dto.PasswordCheckResponse;
import com.darass.darass.user.controller.dto.UserUpdateRequest;
import com.darass.darass.user.domain.User;
import com.darass.darass.user.service.UserService;
import javax.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@AllArgsConstructor
@Validated
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<UserResponse> find(@RequiredLogin User user) {
        UserResponse userResponse = userService.findById(user.getId());
        return ResponseEntity.ok(userResponse);
    }

    @PatchMapping
    public ResponseEntity<UserResponse> updateNickname(@RequiredLogin User user, @Valid @RequestBody UserUpdateRequest userUpdateRequest) {
        UserResponse userResponse = userService.updateNickName(user.getId(), userUpdateRequest);
        return ResponseEntity.ok(userResponse);
    }

    @DeleteMapping
    public ResponseEntity<Void> delete(@RequiredLogin User user) {
        userService.deleteById(user.getId());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/check-password")
    public ResponseEntity<PasswordCheckResponse> checkGuestUserPassword(@ModelAttribute PasswordCheckRequest passwordCheckRequest) {
        PasswordCheckResponse passwordCheckResponse = userService.checkGuestUserPassword(passwordCheckRequest);
        return ResponseEntity.ok(passwordCheckResponse);
    }
}
