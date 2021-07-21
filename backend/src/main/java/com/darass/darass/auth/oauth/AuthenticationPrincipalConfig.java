package com.darass.darass.auth.oauth;

import com.darass.darass.auth.oauth.controller.AuthenticationPrincipalArgumentResolver;
import com.darass.darass.auth.oauth.controller.RequiredLoginArgumentResolver;
import com.darass.darass.auth.oauth.service.OAuthService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class AuthenticationPrincipalConfig implements WebMvcConfigurer {

    private final OAuthService oAuthService;

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.add(createAuthenticationPrincipalArgumentResolver());
        argumentResolvers.add(createRequiredLoginArgumentResolver());
    }

    @Bean
    public AuthenticationPrincipalArgumentResolver createAuthenticationPrincipalArgumentResolver() {
        return new AuthenticationPrincipalArgumentResolver(oAuthService);
    }

    @Bean
    public RequiredLoginArgumentResolver createRequiredLoginArgumentResolver() {
        return new RequiredLoginArgumentResolver(oAuthService);
    }
}
