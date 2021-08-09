package com.darass.darass.auth.oauth.service;

import com.darass.darass.auth.oauth.api.domain.OAuthProvider;
import com.darass.darass.auth.oauth.dto.TokenResponse;
import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.repository.SocialLoginUserRepository;
import java.util.Objects;
import java.util.Optional;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
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
    private static final String REFRESH_TOKEN_NAME = "refreshToken";

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
        String payload = socialLoginUser.getId().toString();
        socialLoginUser.createRefreshToken(jwtTokenProvider);
        socialLoginUserRepository.save(socialLoginUser);
        createCookieWithRefreshToken(response, socialLoginUser.getRefreshToken());
        return TokenResponse.of(jwtTokenProvider.createAccessToken(payload));
    }

    private void createCookieWithRefreshToken(HttpServletResponse response, String refreshToken) {
        ResponseCookie cookie = ResponseCookie.from(REFRESH_TOKEN_NAME, refreshToken)
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

    public TokenResponse createAccessTokenWithRefreshToken(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        if (Objects.isNull(cookies)) {
            throw ExceptionWithMessageAndCode.SHOULD_LOGIN.getException();
        }
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(REFRESH_TOKEN_NAME)) {
                String existingRefreshToken = cookie.getValue();
                jwtTokenProvider.validateRefreshToken(existingRefreshToken);
                Optional<SocialLoginUser> possibleRefreshToken = socialLoginUserRepository
                    .findByRefreshToken(existingRefreshToken);
                SocialLoginUser socialLoginUser = possibleRefreshToken.orElseThrow(() -> {
                    throw ExceptionWithMessageAndCode.SHOULD_LOGIN.getException();
                });
                String payload = socialLoginUser.getId().toString();
                socialLoginUser.createRefreshToken(jwtTokenProvider);
                socialLoginUserRepository.save(socialLoginUser);
                createCookieWithRefreshToken(response, socialLoginUser.getRefreshToken());
                String accessToken = jwtTokenProvider.createAccessToken(payload);
                return new TokenResponse(accessToken);
            }
        }
        throw ExceptionWithMessageAndCode.SHOULD_LOGIN.getException();
    }
}
