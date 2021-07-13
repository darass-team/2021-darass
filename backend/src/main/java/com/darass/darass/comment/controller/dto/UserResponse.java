package com.darass.darass.comment.controller.dto;

import com.darass.darass.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Getter
@NoArgsConstructor
public class UserResponse {

    private Long id;

    private String nickName;

    private String userType;

    public static UserResponse of(User user, String userType) {
        return new UserResponse(user.getId(), user.getNickName(), userType);
    }
}
