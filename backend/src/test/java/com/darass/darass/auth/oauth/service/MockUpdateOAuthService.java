package com.darass.darass.auth.oauth.service;

import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.user.domain.OAuthPlatform;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.repository.SocialLoginUserRepository;

public class MockUpdateOAuthService extends OAuthService{

    public MockUpdateOAuthService(SocialLoginUserRepository socialLoginUserRepository, JwtTokenProvider jwtTokenProvider) {
        super(socialLoginUserRepository, jwtTokenProvider);
    }

    @Override
    public SocialLoginUser findSocialLoginUser(String oauthProviderName, String oauthAccessToken) {
        return SocialLoginUser
            .builder()
            .nickName("병욱")
            .oauthId("6752453")
            .oauthPlatform(OAuthPlatform.KAKAO)
            .email("bbwwpark@naver.com")
            .profileImageUrl("http://kakao/updated_profile_image.png")
            .build();
    }
}
