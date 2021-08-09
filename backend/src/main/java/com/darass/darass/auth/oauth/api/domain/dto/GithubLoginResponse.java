package com.darass.darass.auth.oauth.api.domain.dto;

import com.darass.darass.user.domain.SocialLoginUser;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class GithubLoginResponse implements SocialLoginResponse {

    private String id;

    private String name;

    private String email;

    @JsonProperty("avatar_url")
    private String profileImageUrl;

    @Override
    public SocialLoginUser toEntity() {
        return SocialLoginUser
            .builder()
            .nickName(name)
            .oauthId(id)
            .oauthProvider("github")
            .email(email)
            .profileImageUrl(profileImageUrl)
            .build();
    }

}
