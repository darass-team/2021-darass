package com.darass.auth.api.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withUnauthorizedRequest;

import com.darass.auth.domain.GithubOAuthProvider;
import com.darass.exception.ExceptionWithMessageAndCode;
import com.darass.user.domain.SocialLoginUser;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;

@DisplayName("GithubOAuthProvider 클래스")
@RestClientTest(GithubOAuthProvider.class)
public class GithubOAuthProviderTest {

    String successAccessTokenResponse = "access_token=gho_qyZHlZbp4l1SBgZke9Hq00ZUJW8&scope=&token_type=bearer";
    String successUserInfoResponse = "{\"login\" : \"우기\",\"id\" : \"1231\",\"email\" : \"bbwwpark@naver.com\",\"avatar_url\" : \"https://github.com/avatoar_url_image\" }";
    @Autowired
    private GithubOAuthProvider githubOAuthProvider;
    @Autowired
    private MockRestServiceServer mockServer;
    @Autowired
    private ObjectMapper objectMapper;
    @Value("${oauth.github.authorization-server-url}")
    private String authorizationServerUrl;
    @Value("${oauth.github.api-server-url}")
    private String apiServerUrl;

    @DisplayName("findSocialLoginUser 메서드는 깃헙 인증서버에 인가 코드를 전송해서 엑세스 토큰을 얻어와 카카오 api 서버에 보낸후 SocialLoginUser 객체를 받아온다.")
    @Test
    void findSocialLoginUser() {
        //given
        mockServer.expect(requestTo(authorizationServerUrl)).andRespond(withSuccess(successAccessTokenResponse, MediaType.APPLICATION_JSON));
        mockServer.expect(requestTo(apiServerUrl)).andRespond(withSuccess(successUserInfoResponse, MediaType.APPLICATION_JSON));

        //then
        SocialLoginUser socialLoginUser = githubOAuthProvider.requestSocialLoginUser("authorizationCode");

        //when
        assertThat(socialLoginUser.getNickName()).isEqualTo("우기");
        assertThat(socialLoginUser.getEmail()).isEqualTo("bbwwpark@naver.com");
        assertThat(socialLoginUser.getProfileImageUrl()).isEqualTo("https://github.com/avatoar_url_image");
    }

    @DisplayName("findSocialLoginUser 메서드는 유효하지 않는 인가 코드로 요청을 보낼 경우 예외를 던진다.")
    @Test
    void findSocialLoginResponse_fail() {
        mockServer.expect(requestTo(authorizationServerUrl)).andRespond(withUnauthorizedRequest());
        mockServer.expect(requestTo(apiServerUrl)).andRespond(withSuccess(successUserInfoResponse, MediaType.APPLICATION_JSON));

        assertThatThrownBy(() -> githubOAuthProvider.requestSocialLoginUser("authorizationCode"))
            .isInstanceOf(ExceptionWithMessageAndCode.INVALID_OAUTH_AUTHORIZATION_CODE.getException().getClass());
    }

    @DisplayName("findSocialLoginUser 메서드는 유효하지 않는 엑세스 토큰으로 요청을 보낼 경우 예외를 던진다.")
    @Test
    void findSocialLoginResponse_fail2() {
        mockServer.expect(requestTo(authorizationServerUrl)).andRespond(withSuccess(successAccessTokenResponse, MediaType.APPLICATION_JSON));
        mockServer.expect(requestTo(apiServerUrl)).andRespond(withUnauthorizedRequest());

        assertThatThrownBy(() -> githubOAuthProvider.requestSocialLoginUser("authorizationCode"))
            .isInstanceOf(ExceptionWithMessageAndCode.INVALID_OAUTH_ACCESS_TOKEN.getException().getClass());
    }

}
