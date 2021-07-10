package com.darass.darass.auth.oauth.api.domain;

import com.darass.darass.auth.oauth.api.domain.dto.KaKaoAccount;
import com.darass.darass.auth.oauth.api.domain.dto.Profile;
import com.darass.darass.auth.oauth.api.domain.dto.SocialLoginResponse;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.user.domain.OAuthPlatform;
import com.darass.darass.user.domain.SocialLoginUser;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Component
public class UserInfoProvider {

    public static final String KAKAO_API_SERVER_URI = "https://kapi.kakao.com/v2/user/me";

    private final RestTemplate restTemplate;

    public UserInfoProvider(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    public SocialLoginUser findSocialLoginUser(String accessToken) {
        HttpEntity<HttpHeaders> apiRequest = prepareRequest(accessToken);
        try {
            SocialLoginResponse socialLoginResponse
                = restTemplate.postForObject(KAKAO_API_SERVER_URI, apiRequest, SocialLoginResponse.class);
            return parseUser(socialLoginResponse);

        } catch (HttpClientErrorException e) {
            throw ExceptionWithMessageAndCode.INVALID_JWT_TOKEN.getException();
        }
    }

    private HttpEntity<HttpHeaders> prepareRequest(String accessToken) {
        HttpHeaders apiRequestHeader = new HttpHeaders();
        apiRequestHeader.setBearerAuth(accessToken);
        apiRequestHeader.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        apiRequestHeader.setAcceptCharset(Collections.singletonList(StandardCharsets.UTF_8));
        return new HttpEntity<>(apiRequestHeader);
    }

    private SocialLoginUser parseUser(SocialLoginResponse socialLoginResponse) {
        String oauthId = socialLoginResponse.getId();
        KaKaoAccount kaKaoAccount = socialLoginResponse.getKaKaoAccount();
        String email = kaKaoAccount.getEmail();
        Profile profile = socialLoginResponse.getKaKaoAccount().getProfile();
        String nickname = profile.getNickname();
        return new SocialLoginUser(nickname, oauthId, OAuthPlatform.KAKAO, email);
    }
}
