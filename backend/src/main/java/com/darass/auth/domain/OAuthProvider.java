package com.darass.auth.domain;

import com.darass.exception.ExceptionWithMessageAndCode;
import com.darass.user.domain.SocialLoginUser;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import org.apache.tomcat.util.json.ParseException;
import org.json.JSONException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

public abstract class OAuthProvider {

    protected RestTemplate restTemplate;
    protected String clientId;
    protected String clientSecret;
    protected String authorizationServerUrl;
    protected String apiServerUrl;

    public SocialLoginUser requestSocialLoginUser(String authorizationCode) {
        String accessToken = requestAccessToken(authorizationCode);
        return requestUserInformation(accessToken);
    }

    private String requestAccessToken(String authorizationCode) {
        try {
            ResponseEntity<String> tokenResponse = restTemplate.exchange(
                authorizationServerUrl, HttpMethod.POST, makeAccessTokenRequest(authorizationCode), String.class
            );
            return parseAccessToken(tokenResponse);
        } catch (Exception e) {
            throw ExceptionWithMessageAndCode.INVALID_OAUTH_AUTHORIZATION_CODE.getException();
        }
    }

    private SocialLoginUser requestUserInformation(String accessToken) {
        try {
            ResponseEntity<String> tokenResponse = restTemplate.exchange(
                apiServerUrl, HttpMethod.GET, makeUserInformationRequest(accessToken), String.class
            );
            return parseSocialLoginUser(tokenResponse);
        } catch (JSONException e) {
            throw ExceptionWithMessageAndCode.JSON_PROCESSING_EXCEPTION.getException();
        } catch (Exception e) {
            throw ExceptionWithMessageAndCode.INVALID_OAUTH_ACCESS_TOKEN.getException();
        }
    }

    private HttpEntity<MultiValueMap<String, String>> makeAccessTokenRequest(String authorizationCode) {
        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("grant_type", "authorization_code");
        requestBody.add("code", authorizationCode);
        requestBody.add("client_id", clientId);
        requestBody.add("client_secret", clientSecret);

        HttpHeaders requestHeader = new HttpHeaders();
        requestHeader.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        return new HttpEntity<>(requestBody, requestHeader);
    }

    private HttpEntity<MultiValueMap<String, String>> makeUserInformationRequest(String accessToken) {
        HttpHeaders requestHeader = new HttpHeaders();
        requestHeader.setBearerAuth(accessToken);
        requestHeader.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        requestHeader.setAcceptCharset(Collections.singletonList(StandardCharsets.UTF_8));

        return new HttpEntity<>(requestHeader);
    }

    abstract protected String parseAccessToken(ResponseEntity<String> response);

    abstract protected SocialLoginUser parseSocialLoginUser(ResponseEntity<String> response)
        throws JsonProcessingException, ParseException;

}
