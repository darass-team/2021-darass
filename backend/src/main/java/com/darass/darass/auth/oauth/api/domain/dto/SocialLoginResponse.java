package com.darass.darass.auth.oauth.api.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class SocialLoginResponse {

    private String id;

    @JsonProperty("kakao_account")
    private KaKaoAccount kaKaoAccount;
}
