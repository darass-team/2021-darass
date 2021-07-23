package com.darass.darass.auth.oauth.api.domain.dto;

import com.darass.darass.user.domain.SocialLoginUser;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

public interface SocialLoginResponse {

    SocialLoginUser toEntity();
}
