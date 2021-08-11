package com.darass.darass.auth.oauth.api.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class KaKaoAccount {

    private String email;
    private Profile profile;
}
