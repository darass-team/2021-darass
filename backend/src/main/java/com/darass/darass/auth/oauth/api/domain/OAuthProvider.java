package com.darass.darass.auth.oauth.api.domain;

import com.darass.darass.auth.oauth.api.domain.dto.SocialLoginResponse;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.user.domain.SocialLoginUser;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class OAuthProvider {

    private RestTemplate restTemplate;

    public OAuthProvider(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    public SocialLoginUser findSocialLoginUser(String providerName, String accessToken) {
        try {
            return requestSocialLoginUser(providerName, accessToken).toEntity();
        } catch (Exception e) {
            throw ExceptionWithMessageAndCode.INVALID_JWT_TOKEN.getException();
        }
    }

    protected SocialLoginResponse requestSocialLoginUser(String providerName, String accessToken) {
        String apiUrl = OAuthProviderType.urlOf(providerName);
        HttpHeaders apiRequestHeader = new HttpHeaders();
        apiRequestHeader.setBearerAuth(accessToken);
        apiRequestHeader.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        apiRequestHeader.setAcceptCharset(Collections.singletonList(StandardCharsets.UTF_8));

        return restTemplate.exchange(apiUrl, HttpMethod.GET, new HttpEntity<>(apiRequestHeader),
            OAuthProviderType.responseTypeOf(providerName).getClass())
            .getBody();
    }

}
