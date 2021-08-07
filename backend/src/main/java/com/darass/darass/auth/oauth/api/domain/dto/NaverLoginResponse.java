package com.darass.darass.auth.oauth.api.domain.dto;


import com.darass.darass.auth.oauth.api.domain.vo.NaverAccount;
import com.darass.darass.user.domain.SocialLoginUser;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class NaverLoginResponse implements SocialLoginResponse {

    @JsonProperty("response")
    private NaverAccount naverAccount;

    @Override
    public SocialLoginUser toEntity() {
        return SocialLoginUser
            .builder()
            .nickName(naverAccount.getNickname())
            .oauthId(naverAccount.getId())
            .oAuthProvider("naver")
            .email(naverAccount.getEmail())
            .profileImageUrl(naverAccount.getProfileImageUrl())
            .build();
    }

}
