package com.darass.darass.user.controller;

import com.darass.darass.auth.oauth.domain.RequiredLogin;
import com.darass.darass.user.domain.User;
import com.darass.darass.user.dto.PasswordCheckRequest;
import com.darass.darass.user.dto.PasswordCheckResponse;
import com.darass.darass.user.dto.UserResponse;
import com.darass.darass.user.dto.UserUpdateRequest;
import com.darass.darass.user.service.UserService;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;
import javax.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

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
        @Valid @RequestBody UserUpdateRequest userUpdateRequest) {
        UserResponse userResponse = userService.updateNickName(user.getId(), userUpdateRequest);
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

    @PatchMapping("/test")
    public ResponseEntity<Void> test(@RequestParam("data") MultipartFile multipartFile) throws IOException {
        System.out.println(multipartFile);
        File file = new File(multipartFile.getOriginalFilename());
        if (file.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(file)) {
                fos.write(multipartFile.getBytes());
            }
        }

        Region region = Region.AP_NORTHEAST_2;
        S3Client s3 = S3Client.builder()
            .region(region)
            .build();
        PutObjectRequest objectRequest = PutObjectRequest.builder()
            .bucket("darass-user-profile-image")
            .key(file.getName())
            .build();
        s3.putObject(objectRequest, software.amazon.awssdk.core.sync.RequestBody.fromFile(file));
        file.delete();
        return ResponseEntity.noContent().build();
    }
}
