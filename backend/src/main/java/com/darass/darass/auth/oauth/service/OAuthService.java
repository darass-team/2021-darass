package com.darass.darass.auth.oauth.service;

import com.darass.darass.auth.oauth.api.domain.OAuthProvider;
import com.darass.darass.auth.oauth.api.domain.OAuthProviderFactory;
import com.darass.darass.auth.oauth.dto.TokenResponse;
import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.repository.SocialLoginUserRepository;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@AllArgsConstructor
@Service
public class OAuthService {

    private final SocialLoginUserRepository socialLoginUserRepository;

    private final JwtTokenProvider jwtTokenProvider;

    private final OAuthProviderFactory oAuthProviderFactory;

    public TokenResponse oauthLogin(String oauthProviderName, String authorizationCode) {
        OAuthProvider oAuthProvider = oAuthProviderFactory.getOAuthProvider(oauthProviderName);
        SocialLoginUser socialLoginUser = oAuthProvider.findSocialLoginUser(authorizationCode);

        Optional<SocialLoginUser> possibleSocialLoginUser =
            socialLoginUserRepository.findByOauthId(socialLoginUser.getOauthId());

        if (possibleSocialLoginUser.isEmpty()) {
            socialLoginUserRepository.save(socialLoginUser);
            return TokenResponse.of(jwtTokenProvider.createAccessToken(socialLoginUser.getId().toString()));
        }

        SocialLoginUser foundSocialLoginUser = possibleSocialLoginUser.get();
        return TokenResponse.of(jwtTokenProvider.createAccessToken(foundSocialLoginUser.getId().toString()));
    }

    public SocialLoginUser findSocialLoginUserByAccessToken(String accessToken) {
        jwtTokenProvider.validateAccessToken(accessToken);
        String userId = jwtTokenProvider.getPayload(accessToken);

        return socialLoginUserRepository.findById(Long.parseLong(userId))
            .orElseThrow(ExceptionWithMessageAndCode.INVALID_JWT_NOT_FOUND_USER_TOKEN::getException);
    }

}
