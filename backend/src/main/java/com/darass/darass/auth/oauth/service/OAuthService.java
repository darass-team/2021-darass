package com.darass.darass.auth.oauth.service;

import com.darass.darass.auth.oauth.api.domain.UserInfoProvider;
import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.repository.SocialLoginUserRepository;
import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@NoArgsConstructor
@Transactional
public class OAuthService {

    private SocialLoginUserRepository socialLoginUserRepository;
    private JwtTokenProvider jwtTokenProvider;
    private UserInfoProvider userInfoProvider;

    public String oauthLogin(String oauthAccessToken) {
        SocialLoginUser socialLoginUser = userInfoProvider.findSocialLoginUser(oauthAccessToken);
        Optional<SocialLoginUser> foundSocialLoginUser = socialLoginUserRepository.findByOauthId(socialLoginUser.getOauthId());

        if (foundSocialLoginUser.isEmpty()) {
            socialLoginUserRepository.save(socialLoginUser);
            return jwtTokenProvider.createAccessToken(socialLoginUser.getId().toString());
        }
        return jwtTokenProvider.createAccessToken(foundSocialLoginUser.get().getId().toString());
    }

    public SocialLoginUser findSocialLoginUserByAccessToken(String accessToken) {
        jwtTokenProvider.validateAccessToken(accessToken);
        String userId = jwtTokenProvider.getPayload(accessToken);

        return socialLoginUserRepository.findById(Long.parseLong(userId))
            .orElseThrow(ExceptionWithMessageAndCode.INVALID_JWT_NOT_FOUND_USER_TOKEN::getException);
    }

}
