package com.darass.darass.auth.oauth.api.domain;

import com.darass.darass.user.domain.SocialLoginUser;
import lombok.Getter;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Getter
@Service
public class NaverOAuthProvider extends OAuthProvider {

    public static final String NAME = "NAVER";

    public NaverOAuthProvider(RestTemplateBuilder restTemplateBuilder) {
        restTemplate = restTemplateBuilder.build();
    }

    @Value("${oauth.naver.client-id}")
    public void setClientId(String clientId) {
        super.clientId = clientId;
    }

    @Value("${oauth.naver.client-secret}")
    public void setClientSecret(String clientSecret) {
        super.clientSecret = clientSecret;
    }

    @Value("${oauth.naver.authorization-server-url}")
    public void setAuthorizationServerUrl(String authorizationServerUrl) {
        super.authorizationServerUrl = authorizationServerUrl;
    }

    @Value("${oauth.naver.api-server-url}")
    public void setApiServerUrl(String apiServerUrl) {
        super.apiServerUrl = apiServerUrl;
    }

    @Override
    protected String parseAccessToken(ResponseEntity<String> response) {
        JSONObject jsonObject = new JSONObject(response.getBody());
        return jsonObject.getString("access_token");
    }

    @Override
    protected SocialLoginUser parseSocialLoginUser(ResponseEntity<String> response) {
        JSONObject jsonObject = new JSONObject(response.getBody());
        JSONObject naverAccount = (JSONObject) jsonObject.get("response");

        return SocialLoginUser.builder()
            .nickName(naverAccount.getString("name"))
            .oauthId(naverAccount.getString("id"))
            .oAuthProvider(NAME)
            .email(naverAccount.getString("email"))
            .profileImageUrl(naverAccount.getString("profile_image"))
            .build();
    }

}
