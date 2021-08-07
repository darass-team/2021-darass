package com.darass.darass.auth.oauth.api.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withUnauthorizedRequest;

import com.darass.darass.auth.oauth.api.domain.dto.NaverLoginResponse;
import com.darass.darass.auth.oauth.api.domain.vo.NaverAccount;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.user.domain.SocialLoginUser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;

@DisplayName("NaverOAuthProvider 클래스")
@RestClientTest(NaverOAuthProvider.class)
public class NaverOAuthProviderTest {

    @Autowired
    private NaverOAuthProvider naverOAuthProvider;

    @Autowired
    private MockRestServiceServer mockServer;

    @Autowired
    private ObjectMapper objectMapper;

    @Value("${oauth.naver.authorization-server-url}")
    private String authorizationServerUrl;

    @Value("${oauth.naver.api-server-url}")
    private String apiServerUrl;

    @DisplayName("findSocialLoginUser 메서드는 네이버 인증서버에 인가 코드를 전송해서 엑세스 토큰을 얻어와 카카오 api 서버에 보낸후 SocialLoginUser 객체를 받아온다.")
    @Test
    void findSocialLoginUser() throws JsonProcessingException {
        //given
        NaverAccount naverAccount = new NaverAccount("213132", "우기", "bbwwpark@naver.com", "https://naver.com/image");
        NaverLoginResponse naverLoginResponse = new NaverLoginResponse(naverAccount);
        String expectedResult = objectMapper.writeValueAsString(naverLoginResponse);

        mockServer.expect(requestTo(authorizationServerUrl)).andRespond(withSuccess("{\"access_token\":\"naverAccessToken\"}", MediaType.APPLICATION_JSON));
        mockServer.expect(requestTo(apiServerUrl)).andRespond(withSuccess(expectedResult, MediaType.APPLICATION_JSON));

        //then
        SocialLoginUser socialLoginUser = naverOAuthProvider.findSocialLoginUser("authorizationCode");

        //when
        assertThat(socialLoginUser.getNickName()).isEqualTo(naverAccount.getNickname());
        assertThat(socialLoginUser.getEmail()).isEqualTo(naverAccount.getEmail());
        assertThat(socialLoginUser.getProfileImageUrl()).isEqualTo(naverAccount.getProfileImageUrl());
    }

    @DisplayName("findSocialLoginUser 메서드는 유효하지 않는 인가 코드로 요청을 보낼 경우 예외를 던진다.")
    @Test
    void findSocialLoginResponse_fail() throws JsonProcessingException {
        //given
        NaverAccount naverAccount = new NaverAccount("213132", "우기", "bbwwpark@naver.com", "https://naver.com/image");
        NaverLoginResponse naverLoginResponse = new NaverLoginResponse(naverAccount);
        String expectedResult = objectMapper.writeValueAsString(naverLoginResponse);

        mockServer.expect(requestTo(authorizationServerUrl)).andRespond(withUnauthorizedRequest());
        mockServer.expect(requestTo(apiServerUrl)).andRespond(withSuccess(expectedResult, MediaType.APPLICATION_JSON));

        assertThatThrownBy(() -> naverOAuthProvider.findSocialLoginUser("authorizationCode"))
            .isInstanceOf(ExceptionWithMessageAndCode.INVALID_OAUTH_AUTHORIZATION_CODE.getException().getClass());
    }

    @DisplayName("findSocialLoginUser 메서드는 유효하지 않는 엑세스 토큰으로 요청을 보낼 경우 예외를 던진다.")
    @Test
    void findSocialLoginResponse_fail2() {
        mockServer.expect(requestTo(authorizationServerUrl))
            .andRespond(withSuccess("{\"access_token\":\"naverAccessToken\"}", MediaType.APPLICATION_JSON));
        mockServer.expect(requestTo(apiServerUrl)).andRespond(withUnauthorizedRequest());

        assertThatThrownBy(() -> naverOAuthProvider.findSocialLoginUser("authorizationCode"))
            .isInstanceOf(ExceptionWithMessageAndCode.INVALID_OAUTH_ACCESS_TOKEN.getException().getClass());
    }
}
