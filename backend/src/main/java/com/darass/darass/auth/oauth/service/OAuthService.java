package com.darass.darass.auth.oauth.service;

import com.darass.darass.auth.oauth.api.domain.UserInfoProvider;
import com.darass.darass.auth.oauth.dto.TokenResponse;
import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.repository.SocialLoginUserRepository;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class OAuthService {

    private final SocialLoginUserRepository socialLoginUserRepository;

    private final JwtTokenProvider jwtTokenProvider;

    private final UserInfoProvider userInfoProvider; //TODO: Mocking시 final 못붙이는 문제가 있다.

    public TokenResponse oauthLogin(String oauthAccessToken) {
        SocialLoginUser socialLoginUser = userInfoProvider.findSocialLoginUser(oauthAccessToken);
        Optional<SocialLoginUser> foundSocialLoginUser = socialLoginUserRepository
            .findByOauthId(socialLoginUser.getOauthId());

        if (foundSocialLoginUser.isEmpty()) { //TODO: 옵셔널로 변경 가능?
            socialLoginUserRepository.save(socialLoginUser);
            return TokenResponse.of(jwtTokenProvider.createAccessToken(socialLoginUser.getId().toString()));
        }
        return TokenResponse.of(jwtTokenProvider.createAccessToken(foundSocialLoginUser.get().getId().toString()));
    }

    public SocialLoginUser findSocialLoginUserByAccessToken(String accessToken) {
        jwtTokenProvider.validateAccessToken(accessToken);
        String userId = jwtTokenProvider.getPayload(accessToken);

        return socialLoginUserRepository.findById(Long.parseLong(userId))
            .orElseThrow(ExceptionWithMessageAndCode.INVALID_JWT_NOT_FOUND_USER_TOKEN::getException);
    }

}
