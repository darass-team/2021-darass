package com.darass.darass.auth.oauth.api.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withUnauthorizedRequest;

import com.darass.darass.auth.oauth.api.domain.dto.KaKaoAccount;
import com.darass.darass.auth.oauth.api.domain.dto.Profile;
import com.darass.darass.auth.oauth.api.domain.dto.SocialLoginResponse;
import com.darass.darass.auth.oauth.exception.AuthenticationException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;

@RestClientTest(UserInfoProvider.class)
class UserInfoProviderTest {

    @Autowired
    private UserInfoProvider userInfoProvider;

    @Autowired
    private MockRestServiceServer mockServer;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("카카오 api 서버에 액세스 토큰을 전송하여 유저 정보를 가져온다.")
    void findSocialLoginResponse() throws JsonProcessingException {
        SocialLoginResponse socialLoginResponse = new SocialLoginResponse(
            "1", new KaKaoAccount("jujubat@kakao.com",
            new Profile("우기"))
        );
        String expectedResult = objectMapper.writeValueAsString(socialLoginResponse);

        mockServer.expect(requestTo(UserInfoProvider.KAKAO_API_SERVER_URI))
            .andRespond(withSuccess(expectedResult, MediaType.APPLICATION_JSON));

        SocialLoginResponse actual = userInfoProvider.findSocialLoginResponse("test");
        assertThat(actual.getId()).isEqualTo(socialLoginResponse.getId());
    }

    @Test
    @DisplayName("카카오 api 서버에 잘못된 액세스 토큰을 전송하면 401번 예외를 던진다.")
    void findSocialLoginResponse_fail() {
        mockServer.expect(requestTo(UserInfoProvider.KAKAO_API_SERVER_URI))
            .andRespond(withUnauthorizedRequest());

        assertThatThrownBy(() -> userInfoProvider.findSocialLoginResponse("test"))
            .isInstanceOf(AuthenticationException.class)
            .hasMessage("토큰 인증에 실패하였습니다.");
    }
}