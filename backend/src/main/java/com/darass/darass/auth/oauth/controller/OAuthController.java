package com.darass.darass.auth.oauth.controller;

import com.darass.darass.auth.oauth.domain.RequiredLogin;
import com.darass.darass.auth.oauth.dto.AccessTokenResponse;
import com.darass.darass.auth.oauth.dto.TokenRequest;
import com.darass.darass.auth.oauth.dto.TokenResponse;
import com.darass.darass.auth.oauth.service.OAuthService;
import com.darass.darass.user.domain.SocialLoginUser;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
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

    private final OAuthService oAuthService;

    @PostMapping("/login/oauth")
    public ResponseEntity<AccessTokenResponse> oauthLogin(@RequestBody TokenRequest tokenRequest,
        HttpServletResponse response) {
        TokenResponse tokenResponse = oAuthService.oauthLogin(tokenRequest);
        createCookie(response, tokenResponse.getRefreshToken());

        return ResponseEntity.status(HttpStatus.OK).body(new AccessTokenResponse(tokenResponse.getAccessToken()));
    }

    @PostMapping("/login/refresh")
    public ResponseEntity<AccessTokenResponse> refreshToken(@CookieValue(value = REFRESH_TOKEN_NAME) Cookie cookie,
        HttpServletResponse response) {
        TokenResponse tokenResponse = oAuthService.refreshAccessTokenWithRefreshToken(cookie.getValue());
        createCookie(response, tokenResponse.getRefreshToken());

        return ResponseEntity.status(HttpStatus.OK).body(new AccessTokenResponse(tokenResponse.getAccessToken()));
    }

    private void createCookie(HttpServletResponse response, String refreshToken) {
        ResponseCookie cookie = ResponseCookie.from(REFRESH_TOKEN_NAME, refreshToken)
            .sameSite("None")
            .maxAge(SECONDS_OF_TWO_MONTHS)
            .path("/")
            .secure(true)
            .httpOnly(true)
            .build();
        response.addHeader("Set-Cookie", cookie.toString());
    }

    @DeleteMapping("/log-out")
    public ResponseEntity<AccessTokenResponse> logOut(@RequiredLogin SocialLoginUser socialLoginUser) {
        oAuthService.logOut(socialLoginUser);

        return ResponseEntity.noContent().build();
    }

}
