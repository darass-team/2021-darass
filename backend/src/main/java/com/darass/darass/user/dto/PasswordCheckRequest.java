package com.darass.darass.user.dto;

import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@EqualsAndHashCode
@Getter
@AllArgsConstructor
public class PasswordCheckRequest {

    @NotNull
    private Long guestUserId;

    @NotNull
    private String guestUserPassword;

}
