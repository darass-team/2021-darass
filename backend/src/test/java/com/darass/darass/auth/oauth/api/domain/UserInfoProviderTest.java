package com.darass.darass.auth.oauth.api.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withUnauthorizedRequest;

import com.darass.darass.auth.oauth.api.domain.dto.KaKaoAccount;
import com.darass.darass.auth.oauth.api.domain.dto.KakaoLoginResponse;
import com.darass.darass.auth.oauth.api.domain.dto.Profile;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.user.domain.SocialLoginUser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;

@DisplayName("UserInfoProvider 클래스")
@RestClientTest(OAuthProvider.class)
class UserInfoProviderTest {

    @Autowired
    private OAuthProvider oauthProvider;

    @Autowired
    private MockRestServiceServer mockServer;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("findSocialLoginUser 메서드는 카카오 api 서버에 액세스 토큰을 전송하면 SocialLoginUser 객체를 리턴한다.")
    void findSocialLoginUser() throws JsonProcessingException {
        Profile profile = new Profile("우기", "https://kakao.com/image");
        KaKaoAccount kaKaoAccount = new KaKaoAccount("jujubat@kakao.com", profile);
        KakaoLoginResponse socialLoginResponse = new KakaoLoginResponse("1", kaKaoAccount);

        String expectedResult = objectMapper.writeValueAsString(socialLoginResponse);
        mockServer.expect(requestTo(OAuthProviderType.KAKAO.getUrl()))
            .andRespond(withSuccess(expectedResult, MediaType.APPLICATION_JSON));

        SocialLoginUser socialLoginUser = oauthProvider.findSocialLoginUser(OAuthProviderType.KAKAO.getName(), "test");

        assertThat(socialLoginUser.getNickName()).isEqualTo(profile.getNickname());
        assertThat(socialLoginUser.getEmail()).isEqualTo(kaKaoAccount.getEmail());
        assertThat(socialLoginUser.getProfileImageUrl()).isEqualTo(profile.getThumbnailImageUrl());
    }


    @Test
    @DisplayName("findSocialLoginUser 메서드는 카카오 api 서버에 잘못된 액세스 토큰을 전송하면 예외를 던진다.")
    void findSocialLoginResponse_fail() {
        mockServer.expect(requestTo(OAuthProviderType.KAKAO.getUrl()))
            .andRespond(withUnauthorizedRequest());

        assertThatThrownBy(() -> oauthProvider.findSocialLoginUser(OAuthProviderType.KAKAO.getName(), "test"))
            .isInstanceOf(ExceptionWithMessageAndCode.INVALID_JWT_TOKEN.getException().getClass())
            .hasMessage("유효하지 않은 토큰입니다.");
    }
}