package com.darass.darass.auth.oauth.service;

import com.darass.darass.auth.oauth.controller.JwtTokenProvider;
import com.darass.darass.user.domain.OAuthPlatform;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.domain.User;
import com.darass.darass.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@AllArgsConstructor
public class OAuthService {

    private final UserRepository userRepository;
    private final JwtTokenProvider tokenProvider;

    public String login(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders apiRequestHeader = new HttpHeaders();
        apiRequestHeader.add("Authorization", "Bearer " + accessToken);
        apiRequestHeader.add("Content-type", "application/x-www-form-urlencoded;charset=utf8");
        HttpEntity<HttpHeaders> apiRequest = new HttpEntity<>(apiRequestHeader);

        HttpEntity<String> apiResponse = restTemplate.exchange(
            "https://kapi.kakao.com/v2/user/me",
            HttpMethod.POST,
            apiRequest,
            String.class
        );

        JSONObject jsonObject = new JSONObject(apiResponse.getBody());
        Long oauth_id = jsonObject.getLong("id");
        JSONObject kakao_account = (JSONObject) jsonObject.get("kakao_account");
        String email = kakao_account.getString("email");
        JSONObject profile = (JSONObject) kakao_account.get("profile");
        String nickname = profile.getString("nickname");

        User socialLoginUser = new SocialLoginUser(nickname, oauth_id.toString(),
            OAuthPlatform.KAKAO, email);

        userRepository.save(socialLoginUser);

        // 토큰 발급
        return tokenProvider.createToken(socialLoginUser.getId().toString());
    }

}
