package com.darass.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class UserUpdateRequest {

    private String nickName;

    private MultipartFile profileImageFile;

    private Boolean hasRecentAlarm;
}

