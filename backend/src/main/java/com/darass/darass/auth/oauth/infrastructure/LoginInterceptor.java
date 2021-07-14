package com.darass.darass.auth.oauth.infrastructure;

import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Objects;

public class LoginInterceptor implements HandlerInterceptor {

    private final JwtTokenProvider jwtTokenProvider;

    public LoginInterceptor(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
                             Object handler) {
        if ("OPTIONS".equals(request.getMethod())) {
            return true;
        }

        final String accessToken = AuthorizationExtractor.extract(request);

        if (Objects.isNull(accessToken)) {
            return true;
        }
        jwtTokenProvider.validateAccessToken(accessToken);
        return true;
    }
}
