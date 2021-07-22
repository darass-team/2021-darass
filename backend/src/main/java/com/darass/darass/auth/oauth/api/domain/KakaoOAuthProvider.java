package com.darass.darass.auth.oauth.api.domain;

import com.darass.darass.auth.oauth.api.domain.dto.KaKaoAccount;
import com.darass.darass.auth.oauth.api.domain.dto.Profile;
import com.darass.darass.auth.oauth.api.domain.dto.SocialLoginResponse;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.user.domain.OAuthPlatform;
import com.darass.darass.user.domain.SocialLoginUser;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Objects;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

//@Component
public class KakaoOAuthProvider extends OAuthProvider{

    public static final String KAKAO_API_SERVER_URI = "https://kapi.kakao.com/v2/user/me";

    @Override
    protected SocialLoginResponse requestSocialLoginUser(String accessToken) {
        HttpHeaders apiRequestHeader = new HttpHeaders();
        apiRequestHeader.setBearerAuth(accessToken);
        apiRequestHeader.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        apiRequestHeader.setAcceptCharset(Collections.singletonList(StandardCharsets.UTF_8));

        return REST_TEMPLATE.postForObject(KAKAO_API_SERVER_URI, new HttpEntity<>(apiRequestHeader), SocialLoginResponse.class);
    }

    @Override
    protected SocialLoginUser parseSocialLoginUserResponse(SocialLoginResponse socialLoginResponse) {
        String oauthId = socialLoginResponse.getId();
        KaKaoAccount kaKaoAccount = socialLoginResponse.getKaKaoAccount();
        String email = kaKaoAccount.getEmail();
        Profile profile = socialLoginResponse.getKaKaoAccount().getProfile();
        String nickname = profile.getNickname();
        String profileImageUrl = profile.getThumbnailImageUrl();

        return SocialLoginUser
            .builder()
            .nickName(nickname)
            .oauthId(oauthId)
            .oauthPlatform(OAuthPlatform.KAKAO)
            .email(email)
            .profileImageUrl(profileImageUrl)
            .build();
    }
}
