package com.darass.darass.auth.oauth.service;

import com.darass.darass.auth.oauth.api.domain.OAuthProvider;
import com.darass.darass.auth.oauth.dto.TokenResponse;
import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.repository.SocialLoginUserRepository;
import java.util.Optional;
import javax.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@AllArgsConstructor
@Service
public class OAuthService {

    private static final int SECONDS_OF_TWO_MONTHS = 24 * 60 * 60 * 60;
    private SocialLoginUserRepository socialLoginUserRepository;

    private JwtTokenProvider jwtTokenProvider;

    private OAuthProvider oAuthProvider;

    public TokenResponse oauthLogin(String oauthProviderName, String oauthAccessToken, HttpServletResponse response) {
        SocialLoginUser inputSocialLoginUser = oAuthProvider.findSocialLoginUser(oauthProviderName, oauthAccessToken);

        Optional<SocialLoginUser> possibleSocialLoginUser = socialLoginUserRepository
            .findByOauthId(inputSocialLoginUser.getOauthId());

        SocialLoginUser socialLoginUser = possibleSocialLoginUser.orElseGet(() -> {
            socialLoginUserRepository.save(inputSocialLoginUser);
            return inputSocialLoginUser;
        });
        createCookieWithRefreshToken(response);
        return TokenResponse.of(jwtTokenProvider.createAccessToken(socialLoginUser.getId().toString()));
    }

    private void createCookieWithRefreshToken(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("refreshToken", jwtTokenProvider.createRefreshToken())
            .sameSite("None")
            .maxAge(SECONDS_OF_TWO_MONTHS)
            .path("/")
            .secure(true)
            .build();
        response.addHeader("Set-Cookie", cookie.toString());
    }

    public SocialLoginUser findSocialLoginUserByAccessToken(String accessToken) {
        jwtTokenProvider.validateAccessToken(accessToken);
        String userId = jwtTokenProvider.getPayloadOfAccessToken(accessToken);

        return socialLoginUserRepository.findById(Long.parseLong(userId))
            .orElseThrow(ExceptionWithMessageAndCode.INVALID_JWT_NOT_FOUND_USER_TOKEN::getException);
    }

}
