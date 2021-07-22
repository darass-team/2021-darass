package com.darass.darass.auth.oauth.service;

import com.darass.darass.auth.oauth.api.domain.OAuthProvider;
import com.darass.darass.auth.oauth.api.domain.OAuthProviderType;
import com.darass.darass.auth.oauth.dto.TokenResponse;
import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.user.domain.OAuthPlatform;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.repository.SocialLoginUserRepository;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public class MockOAuthService extends OAuthService{

    public MockOAuthService(SocialLoginUserRepository socialLoginUserRepository, JwtTokenProvider jwtTokenProvider) {
        super(socialLoginUserRepository, jwtTokenProvider);
    }

    @Override
    public SocialLoginUser findSocialLoginUser(String oauthProviderName, String oauthAccessToken) {
        return SocialLoginUser
            .builder()
            .nickName("우기")
            .oauthId("6752453")
            .oauthPlatform(OAuthPlatform.KAKAO)
            .email("jujubebat@kakao.com")
            .profileImageUrl("http://kakao/profile_image.png")
            .build();
    }

    @Override
    public SocialLoginUser findSocialLoginUserByAccessToken(String accessToken) {
        return SocialLoginUser
            .builder()
            .nickName("우기")
            .oauthId("6752453")
            .oauthPlatform(OAuthPlatform.KAKAO)
            .email("jujubebat@kakao.com")
            .profileImageUrl("http://kakao/profile_image.png")
            .build();
    }
}
