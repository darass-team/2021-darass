package com.darass.darass.auth.oauth.controller;

import com.darass.darass.auth.oauth.service.OAuthService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OAuthController {

    private final OAuthService oAuthService;

    public OAuthController(OAuthService oAuthService) {
        this.oAuthService = oAuthService;
    }

    @GetMapping("/login/oauth")
    public void login(@RequestParam String accessToken) {
        oAuthService.login(accessToken);
    }

}
