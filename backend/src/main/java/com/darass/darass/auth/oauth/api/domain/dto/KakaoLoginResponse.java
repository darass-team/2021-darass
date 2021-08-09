package com.darass.darass.auth.oauth.api.domain.dto;

import com.darass.darass.auth.oauth.api.domain.vo.KaKaoAccount;
import com.darass.darass.user.domain.SocialLoginUser;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class KakaoLoginResponse implements SocialLoginResponse {

    private String id;

    @JsonProperty("kakao_account")
    private KaKaoAccount kaKaoAccount;

    @Override
    public SocialLoginUser toEntity() {
        return SocialLoginUser
            .builder()
            .nickName(kaKaoAccount.getProfile().getNickname())
            .oauthId(id)
            .oauthProvider("kakao")
            .email(kaKaoAccount.getEmail())
            .profileImageUrl(kaKaoAccount.getProfile().getThumbnailImageUrl())
            .build();
    }
}
