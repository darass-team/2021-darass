package com.darass.darass.auth.oauth.api.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class NaverAccount {

    private String id;

    @JsonProperty("name")
    private String nickname;

    private String email;

    @JsonProperty("profile_image")
    private String profileImageUrl;

}
