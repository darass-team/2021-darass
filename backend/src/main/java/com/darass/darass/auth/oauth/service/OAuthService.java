package com.darass.darass.auth.oauth.service;

import com.darass.darass.auth.oauth.api.domain.UserInfoProvider;
import com.darass.darass.auth.oauth.controller.dto.TokenResponse;
import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.repository.SocialLoginUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@AllArgsConstructor
@Transactional
public class OAuthService {

    private SocialLoginUserRepository socialLoginUserRepository;
    private JwtTokenProvider jwtTokenProvider;
    private UserInfoProvider userInfoProvider;

    public TokenResponse oauthLogin(String oauthAccessToken) {
        SocialLoginUser socialLoginUser = userInfoProvider.findSocialLoginUser(oauthAccessToken);
        Optional<SocialLoginUser> possibleSocialLoginUser = socialLoginUserRepository.findByOauthId(socialLoginUser.getOauthId());

        if (possibleSocialLoginUser.isEmpty()) {
            socialLoginUserRepository.save(socialLoginUser);
            return TokenResponse.of(jwtTokenProvider.createAccessToken(socialLoginUser.getId().toString()));
        }

        SocialLoginUser foundSocialLoginUser = possibleSocialLoginUser.get();
        foundSocialLoginUser.update(socialLoginUser);

        return TokenResponse.of(jwtTokenProvider.createAccessToken(foundSocialLoginUser.getId().toString()));
    }

    public SocialLoginUser findSocialLoginUserByAccessToken(String accessToken) {
        jwtTokenProvider.validateAccessToken(accessToken);
        String userId = jwtTokenProvider.getPayload(accessToken);

        return socialLoginUserRepository.findById(Long.parseLong(userId))
            .orElseThrow(ExceptionWithMessageAndCode.INVALID_JWT_NOT_FOUND_USER_TOKEN::getException);
    }

}
