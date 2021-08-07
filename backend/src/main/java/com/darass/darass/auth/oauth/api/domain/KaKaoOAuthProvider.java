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
public class KaKaoOAuthProvider extends OAuthProvider {

    public static final String NAME = "KAKAO";

    public KaKaoOAuthProvider(RestTemplateBuilder restTemplateBuilder) {
        restTemplate = restTemplateBuilder.build();
    }

    @Value("${oauth.kakao.client-id}")
    public void setClientId(String clientId) {
        super.clientId = clientId;
    }

    @Value("${oauth.kakao.client-secret}")
    public void setClientSecret(String clientSecret) {
        super.clientSecret = clientSecret;
    }

    @Value("${oauth.kakao.authorization-server-url}")
    public void setAuthorizationServerUrl(String authorizationServerUrl) {
        super.authorizationServerUrl = authorizationServerUrl;
    }

    @Value("${oauth.kakao.api-server-url}")
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
        JSONObject kakaoAccount = (JSONObject) jsonObject.get("kakao_account");
        JSONObject profile = (JSONObject) kakaoAccount.get("profile");

        return SocialLoginUser.builder()
            .nickName(profile.getString("nickname"))
            .oauthId(String.valueOf(jsonObject.getLong("id")))
            .oAuthProvider(NAME)
            .email(kakaoAccount.getString("email"))
            .profileImageUrl(profile.getString("thumbnail_image_url"))
            .build();
    }

}


