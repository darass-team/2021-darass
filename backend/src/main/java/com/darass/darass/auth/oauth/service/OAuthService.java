package com.darass.darass.auth.oauth.service;

import com.darass.darass.auth.oauth.api.domain.UserInfoProvider;
import com.darass.darass.auth.oauth.api.domain.dto.KaKaoAccount;
import com.darass.darass.auth.oauth.api.domain.dto.Profile;
import com.darass.darass.auth.oauth.api.domain.dto.SocialLoginResponse;
import com.darass.darass.auth.oauth.controller.JwtTokenProvider;
import com.darass.darass.user.domain.OAuthPlatform;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.domain.User;
import com.darass.darass.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class OAuthService {

    private final UserRepository userRepository;
    private final JwtTokenProvider tokenProvider;
    private final UserInfoProvider userInfoProvider;

    public String login(String accessToken) {
        User socialLoginUser = parseUser(userInfoProvider.findSocialLoginResponse(accessToken));
        userRepository.save(socialLoginUser);
        return tokenProvider.createToken(socialLoginUser.getId().toString());
    }

    private User parseUser(SocialLoginResponse socialLoginResponse) {
        String oauthId = socialLoginResponse.getId();
        KaKaoAccount kaKaoAccount = socialLoginResponse.getKaKaoAccount();
        String email = kaKaoAccount.getEmail();
        Profile profile = socialLoginResponse.getKaKaoAccount().getProfile();
        String nickname = profile.getNickname();
        return new SocialLoginUser(nickname, oauthId, OAuthPlatform.KAKAO, email);
    }

}
