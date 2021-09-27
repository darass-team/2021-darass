package com.darass.user.dto;

import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PasswordCheckRequest {

    @NotNull
    private Long guestUserId;

    @NotNull
    private String guestUserPassword;

}
