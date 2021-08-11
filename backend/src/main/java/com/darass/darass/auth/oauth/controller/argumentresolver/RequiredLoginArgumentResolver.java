package com.darass.darass.auth.oauth.controller.argumentresolver;

import com.darass.darass.auth.oauth.domain.RequiredLogin;
import com.darass.darass.auth.oauth.infrastructure.AuthorizationExtractor;
import com.darass.darass.auth.oauth.service.OAuthService;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.user.domain.User;
import java.util.Objects;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@RequiredArgsConstructor
public class RequiredLoginArgumentResolver implements HandlerMethodArgumentResolver {

    private final OAuthService oAuthService;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(RequiredLogin.class);
    }

    @Override
    public User resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
        NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
        String accessToken = AuthorizationExtractor
            .extract(Objects.requireNonNull(webRequest.getNativeRequest(HttpServletRequest.class)));

        if (Objects.isNull(accessToken)) {
            throw ExceptionWithMessageAndCode.SHOULD_LOGIN.getException();
        }
        return oAuthService.findSocialLoginUserByAccessToken(accessToken);
    }
}
