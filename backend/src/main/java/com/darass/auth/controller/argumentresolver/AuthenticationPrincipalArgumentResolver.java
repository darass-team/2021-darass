package com.darass.auth.controller.argumentresolver;

import com.darass.auth.domain.AuthenticationPrincipal;
import com.darass.auth.infrastructure.AuthorizationExtractor;
import com.darass.auth.service.OAuthService;
import com.darass.user.domain.GuestUser;
import com.darass.user.domain.User;
import java.util.Objects;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@RequiredArgsConstructor
public class AuthenticationPrincipalArgumentResolver implements HandlerMethodArgumentResolver {

    private final OAuthService oAuthService;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(AuthenticationPrincipal.class);
    }

    @Override
    public User resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
        NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
        String accessToken = AuthorizationExtractor
            .extract(Objects.requireNonNull(webRequest.getNativeRequest(HttpServletRequest.class)));

        if (Objects.isNull(accessToken) || accessToken.isEmpty()) {
            return new GuestUser();
        }

        return oAuthService.findSocialLoginUserByAccessToken(accessToken);
    }
}
