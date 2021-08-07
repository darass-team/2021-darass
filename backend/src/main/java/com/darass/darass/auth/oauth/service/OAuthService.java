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
        createCookieWithRefreshToken(response);
        return TokenResponse.of(jwtTokenProvider.createAccessToken(socialLoginUser.getId().toString()));
    }

    private void createCookieWithRefreshToken(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from(REFRESH_TOKEN_NAME, jwtTokenProvider.createRefreshToken())
            .sameSite("None")
            .maxAge(SECONDS_OF_TWO_MONTHS)
            .path("/")
            .secure(true)
            .build();
        // TODO :  RefreshToken을 DB에 저장하는 코드 추가하기
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
                // TODO
                // RefreshToken을 DB에 존재하는 지 체크
                // -> 존재하지 않을 경우, 이상한 RefreshToken이라고 판단
                // -> 존재할 경우, 해당 RefreshToken을 가지고 있는 User의 id를 담아서 Access Token을 새로 발급

                // RefreshToken을 새로 발급해서 쿠키로 만들어주기 / DB에 RefreshToken을 새로 저장

            }
        }
        return null;
    }
}
