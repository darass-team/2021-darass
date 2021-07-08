package com.darass.darass.auth.oauth.api.domain;

import com.darass.darass.auth.oauth.api.domain.dto.SocialLoginResponse;
import com.darass.darass.auth.oauth.exception.AuthenticationException;
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

    public SocialLoginResponse findSocialLoginResponse(String accessToken) {
        HttpEntity<HttpHeaders> apiRequest = prepareRequest(accessToken);
        try {
            return restTemplate.postForObject(KAKAO_API_SERVER_URI, apiRequest, SocialLoginResponse.class);
        } catch (HttpClientErrorException e) {
            throw new AuthenticationException("토큰 인증에 실패하였습니다.");
        }
    }

    private HttpEntity<HttpHeaders> prepareRequest(String accessToken) {
        HttpHeaders apiRequestHeader = new HttpHeaders();
        apiRequestHeader.setBearerAuth(accessToken);
        apiRequestHeader.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        apiRequestHeader.setAcceptCharset(Collections.singletonList(StandardCharsets.UTF_8));
        return new HttpEntity<>(apiRequestHeader);
    }
}
