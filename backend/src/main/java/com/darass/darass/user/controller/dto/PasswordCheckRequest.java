package com.darass.darass.user.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@AllArgsConstructor
public class PasswordCheckRequest {

    @NotNull
    private Long guestUserId;

    @NotNull
    private String guestUserPassword;

}
