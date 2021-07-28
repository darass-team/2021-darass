package com.darass.darass.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@NoArgsConstructor
@Getter
@AllArgsConstructor
public class UserUpdateRequest {

    private String nickName;

    private MultipartFile profileImageFile;

}

