package com.darass.darass.auth.oauth.api.domain;

import com.darass.darass.auth.oauth.api.domain.dto.SocialLoginResponse;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.user.domain.SocialLoginUser;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

//@Component
public abstract class OAuthProvider {

    protected static final RestTemplate REST_TEMPLATE = new RestTemplate();

    public SocialLoginUser findSocialLoginUser(String accessToken) {
        try {
            return parseSocialLoginUserResponse(requestSocialLoginUser(accessToken));
        } catch (Exception e) {
            throw ExceptionWithMessageAndCode.INVALID_JWT_TOKEN.getException();
        }
    }

    protected abstract SocialLoginUser parseSocialLoginUserResponse(SocialLoginResponse requestSocialLoginUser);

    abstract protected SocialLoginResponse requestSocialLoginUser(String accessToken);

}
