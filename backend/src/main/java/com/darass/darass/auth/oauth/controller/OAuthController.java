package com.darass.darass.auth.oauth.controller;

import com.darass.darass.auth.oauth.exception.AuthenticationException;
import com.darass.darass.auth.oauth.service.OAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class OAuthController {

    private final OAuthService oAuthService;

    @GetMapping("/login/oauth")
    public String login(@RequestParam String accessToken) {
        return oAuthService.login(accessToken);
    }

    @ExceptionHandler(AuthenticationException.class)
    public String authenticationExceptionHandler(AuthenticationException exception) {
        return exception.getMessage();
    }

}
