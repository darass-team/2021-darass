package com.darass.darass.auth.oauth;

import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.auth.oauth.infrastructure.LoginInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class AuthenticationPrincipalConfig implements WebMvcConfigurer {

    private final JwtTokenProvider jwtTokenProvider;

    public AuthenticationPrincipalConfig(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

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
}
