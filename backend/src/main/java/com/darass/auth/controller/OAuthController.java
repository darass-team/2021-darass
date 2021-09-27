package com.darass.auth.controller;

import com.darass.auth.domain.RequiredLogin;
import com.darass.auth.dto.AccessTokenResponse;
import com.darass.auth.dto.TokenRequest;
import com.darass.auth.dto.TokenResponse;
import com.darass.auth.service.OAuthService;
import com.darass.exception.ExceptionWithMessageAndCode;
import com.darass.user.domain.SocialLoginUser;
import java.util.Objects;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class OAuthController {

    private static final int SECONDS_OF_TWO_MONTHS = 24 * 60 * 60 * 60;
    private static final String REFRESH_TOKEN_NAME = "refreshToken";
    private static final String DOMAIN = "darass.co.kr";

    private final OAuthService oAuthService;

    @Value("${cookie.same-site}")
    private String sameSite;

    @PostMapping("/login/oauth")
    public ResponseEntity<AccessTokenResponse> oauthLogin(@RequestBody TokenRequest tokenRequest,
        HttpServletResponse response) {
        TokenResponse tokenResponse = oAuthService.oauthLogin(tokenRequest);
        createCookie(response, tokenResponse.getRefreshToken());

        return ResponseEntity.status(HttpStatus.OK).body(new AccessTokenResponse(tokenResponse.getAccessToken()));
    }

    @PostMapping("/login/refresh")
    public ResponseEntity<AccessTokenResponse> refreshToken(
        @CookieValue(value = REFRESH_TOKEN_NAME, required = false) Cookie cookie,
        HttpServletResponse response) {
        validateRefreshTokenCookie(cookie);

        TokenResponse tokenResponse = oAuthService.refreshAccessTokenWithRefreshToken(cookie.getValue());
        createCookie(response, tokenResponse.getRefreshToken());

        return ResponseEntity.status(HttpStatus.OK).body(new AccessTokenResponse(tokenResponse.getAccessToken()));
    }

    private void validateRefreshTokenCookie(Cookie cookie) {
        if (Objects.isNull(cookie)) {
            throw ExceptionWithMessageAndCode.NOT_EXISTS_COOKIE.getException();
        }
    }

    private void createCookie(HttpServletResponse response, String refreshToken) {
        ResponseCookie cookie = ResponseCookie.from(REFRESH_TOKEN_NAME, refreshToken)
            .sameSite(sameSite)
            .domain(DOMAIN)
            .maxAge(SECONDS_OF_TWO_MONTHS)
            .path("/")
            .secure(true)
            .httpOnly(true)
            .build();
        response.addHeader("Set-Cookie", cookie.toString());
    }

    @DeleteMapping("/log-out")
    public ResponseEntity<AccessTokenResponse> logOut(HttpServletResponse response, @RequiredLogin SocialLoginUser socialLoginUser) {
        oAuthService.logOut(socialLoginUser);

        ResponseCookie cookie = ResponseCookie.from(REFRESH_TOKEN_NAME, "")
            .sameSite(sameSite)
            .domain(DOMAIN)
            .maxAge(0)
            .path("/")
            .secure(true)
            .httpOnly(true)
            .build();
        response.addHeader("Set-Cookie", cookie.toString());

        return ResponseEntity.noContent().build();
    }

}
