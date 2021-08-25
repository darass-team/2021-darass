package com.darass.darass.auth.oauth.service;

import com.darass.darass.auth.oauth.api.domain.OAuthProvider;
import com.darass.darass.auth.oauth.api.domain.OAuthProviderFactory;
import com.darass.darass.auth.oauth.dto.TokenRequest;
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

    public TokenResponse oauthLogin(TokenRequest tokenRequest) {
        OAuthProvider oAuthProvider = oAuthProviderFactory.getOAuthProvider(tokenRequest.getOauthProviderName());
        SocialLoginUser responseSocialLoginUser = oAuthProvider.requestSocialLoginUser(tokenRequest.getAuthorizationCode());

        Optional<SocialLoginUser> possibleSocialLoginUser = socialLoginUserRepository
            .findByOauthId(responseSocialLoginUser.getOauthId());

        SocialLoginUser socialLoginUser = possibleSocialLoginUser.orElseGet(
            () -> socialLoginUserRepository.save(responseSocialLoginUser)
        );

        return TokenResponse.of(jwtTokenProvider.createAccessToken(socialLoginUser),
            jwtTokenProvider.createRefreshToken(socialLoginUser));
    }

    public SocialLoginUser findSocialLoginUserByAccessToken(String accessToken) {
        jwtTokenProvider.validateAccessToken(accessToken);
        String userId = jwtTokenProvider.getAccessTokenPayload(accessToken);

        return socialLoginUserRepository.findById(Long.parseLong(userId))
            .orElseThrow(ExceptionWithMessageAndCode.INVALID_JWT_NOT_FOUND_USER_TOKEN::getException);
    }


}
