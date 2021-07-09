package com.darass.darass.auth.oauth.service;

import com.darass.darass.auth.oauth.api.domain.UserInfoProvider;
import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.repository.SocialLoginUserRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class OAuthService {

    private final SocialLoginUserRepository socialLoginUserRepository;
    private final JwtTokenProvider tokenProvider;
    private final UserInfoProvider userInfoProvider;

    public String login(String accessToken) {
        SocialLoginUser socialLoginUser = userInfoProvider.findSocialLoginUser(accessToken);
        Optional<SocialLoginUser> foundSocialLoginUser = socialLoginUserRepository.findByOauthId(socialLoginUser.getOauthId());

        if (foundSocialLoginUser.isEmpty()) {
            socialLoginUserRepository.save(socialLoginUser);
            return tokenProvider.createToken(socialLoginUser.getId().toString());
        }
        return tokenProvider.createToken(foundSocialLoginUser.get().getId().toString());
    }

}
