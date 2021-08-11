package com.darass.darass.auth.oauth.api.domain.dto;

import com.darass.darass.user.domain.SocialLoginUser;

public interface SocialLoginResponse {

    SocialLoginUser toEntity();
}
