package com.darass.darass.auth.oauth;

import com.darass.darass.auth.oauth.controller.AuthenticationPrincipalArgumentResolver;
import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.auth.oauth.infrastructure.LoginInterceptor;
import com.darass.darass.auth.oauth.service.AuthService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class AuthenticationPrincipalConfig implements WebMvcConfigurer {

    private final JwtTokenProvider jwtTokenProvider;
    private final AuthService authService;


    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginInterceptor())
            .addPathPatterns("/api/v1/**")
            .excludePathPatterns("/api/v1/login/oauth");
    }

    @Bean
    public HandlerInterceptor loginInterceptor() {
        return new LoginInterceptor(jwtTokenProvider);
    }

    @Override
    public void addArgumentResolvers(List argumentResolvers) {
        argumentResolvers.add(createAuthenticationPrincipalArgumentResolver());
    }

    @Bean
    public AuthenticationPrincipalArgumentResolver createAuthenticationPrincipalArgumentResolver() {
        return new AuthenticationPrincipalArgumentResolver(authService);
    }
}
