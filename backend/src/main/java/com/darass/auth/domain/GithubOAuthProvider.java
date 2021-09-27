package com.darass.auth.domain;

import com.darass.user.domain.SocialLoginUser;
import com.google.common.base.Splitter;
import java.util.Map;
import lombok.Getter;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Getter
@Service
public class GithubOAuthProvider extends OAuthProvider {

    public static final String NAME = "GITHUB";

    public GithubOAuthProvider(RestTemplateBuilder restTemplateBuilder) {
        restTemplate = restTemplateBuilder.build();
    }

    @Value("${oauth.github.client-id}")
    private void setClientId(String clientId) {
        super.clientId = clientId;
    }

    @Value("${oauth.github.client-secret}")
    private void setClientSecret(String clientSecret) {
        super.clientSecret = clientSecret;
    }

    @Value("${oauth.github.authorization-server-url}")
    private void setAuthorizationServerUrl(String authorizationServerUrl) {
        super.authorizationServerUrl = authorizationServerUrl;
    }

    @Value("${oauth.github.api-server-url}")
    private void setApiServerUrl(String apiServerUrl) {
        super.apiServerUrl = apiServerUrl;
    }

    @Override
    protected String parseAccessToken(ResponseEntity<String> response) {
        Map<String, String> queryParameters = Splitter
            .on("&")
            .withKeyValueSeparator("=")
            .split(response.getBody());
        return queryParameters.get("access_token");
    }

    @Override
    protected SocialLoginUser parseSocialLoginUser(ResponseEntity<String> response) {
        JSONObject jsonObject = new JSONObject(response.getBody());

        return SocialLoginUser.builder()
            .nickName(jsonObject.getString("login"))
            .oauthId(String.valueOf(jsonObject.getLong("id")))
            .oauthProvider(NAME)
            .email(jsonObject.getString("email"))
            .profileImageUrl(jsonObject.getString("avatar_url"))
            .build();
    }

}
