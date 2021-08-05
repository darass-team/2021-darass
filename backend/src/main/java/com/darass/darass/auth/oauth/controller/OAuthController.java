package com.darass.darass.auth.oauth.controller;

import com.darass.darass.auth.oauth.dto.TokenResponse;
import com.darass.darass.auth.oauth.dto.TokenRequest;
import com.darass.darass.auth.oauth.service.OAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class OAuthController {

    private final OAuthService oAuthService;

    @PostMapping("/login/oauth")
    public ResponseEntity<TokenResponse> oauthLogin(@RequestBody TokenRequest tokenRequest) {
        TokenResponse tokenResponse = oAuthService.oauthLogin(
            tokenRequest.getOauthProviderName(),
            tokenRequest.getOauthAccessToken()
        );
        return ResponseEntity.status(HttpStatus.OK).body(tokenResponse);
    }
}
