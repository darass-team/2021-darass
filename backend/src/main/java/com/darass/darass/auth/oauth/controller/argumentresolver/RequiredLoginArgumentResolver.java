package com.darass.darass.auth.oauth.controller.argumentresolver;

import com.darass.darass.auth.oauth.domain.RequiredLogin;
import com.darass.darass.auth.oauth.infrastructure.AuthorizationExtractor;
import com.darass.darass.auth.oauth.service.OAuthService;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.user.domain.SocialLoginUser;
import java.net.HttpCookie;
import java.util.List;
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
    public SocialLoginUser resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
        NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
        String accessToken = findAccessToken(webRequest);
        String refreshToken = findRefreshToken(webRequest);

        return findSocialLoginUserByAccessToken(accessToken, refreshToken);
    }

    private SocialLoginUser findSocialLoginUserByAccessToken(String accessToken, String refreshToken) {
        SocialLoginUser socialLoginUser = oAuthService.findSocialLoginUserByAccessToken(accessToken);
        if (socialLoginUser.isSameRefreshToken(refreshToken)) {
            return socialLoginUser;
        }
        throw ExceptionWithMessageAndCode.INVALID_REFRESH_TOKEN.getException();
    }

    private String findAccessToken(NativeWebRequest webRequest) {
        String accessToken = AuthorizationExtractor
            .extract(Objects.requireNonNull(webRequest.getNativeRequest(HttpServletRequest.class)));

        if (Objects.isNull(accessToken)) {
            throw ExceptionWithMessageAndCode.NOT_EXISTS_ACCESS_TOKEN.getException();
        }
        return accessToken;
    }

    private String findRefreshToken(NativeWebRequest webRequest) {
        List<HttpCookie> cookies = HttpCookie.parse(Objects.requireNonNull(webRequest.getHeader("Set-Cookie")));
        HttpCookie httpCookie = cookies.stream()
            .filter(it -> it.getName().equals("refreshToken") && !it.getValue().isEmpty())
            .findAny()
            .orElseThrow(ExceptionWithMessageAndCode.NOT_EXISTS_REFRESH_TOKEN::getException);

        return httpCookie.getValue();
    }
}
