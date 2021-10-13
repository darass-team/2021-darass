package com.darass.auth.api.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withUnauthorizedRequest;

import com.darass.auth.domain.NaverOAuthProvider;
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

@DisplayName("NaverOAuthProvider 클래스")
@RestClientTest(NaverOAuthProvider.class)
public class NaverOAuthProviderTest {

    String successUserInfoResponse =
        "{\"resultcode\":\"00\",\"message\":\"success\",\"response\":{\"id\":\"7dPyeBP34Xl192zmZqIYjUdUb90CO8s_fgU9NXBo1DM\","
            + "\"nickname\":\"bbwwpark\",\"profile_image\":\"https://phinf.pstatic.net/contact/20190904_51/1567567847450UeAYY_PNG/profileImage.png\","
            + "\"age\":\"20-29\",\"gender\":\"M\",\"email\":\"bbwwpark@naver.com\",\"mobile\":\"010-8373-9562\",\"mobile_e164\":\"+821083739562\",\""
            + "name\":\"박병욱\",\"birthday\":\"11-14\",\"birthyear\":\"1995\"}}";
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
    void findSocialLoginUser() {
        mockServer.expect(requestTo(authorizationServerUrl))
            .andRespond(withSuccess("{\"access_token\":\"naverAccessToken\"}", MediaType.APPLICATION_JSON));
        mockServer.expect(requestTo(apiServerUrl))
            .andRespond(withSuccess(successUserInfoResponse, MediaType.APPLICATION_JSON));

        //then
        SocialLoginUser socialLoginUser = naverOAuthProvider.requestSocialLoginUser("authorizationCode");

        //when
        assertThat(socialLoginUser.getNickName()).isEqualTo("박병욱");
        assertThat(socialLoginUser.getEmail()).isEqualTo("bbwwpark@naver.com");
        assertThat(socialLoginUser.getProfileImageUrl())
            .isEqualTo("https://phinf.pstatic.net/contact/20190904_51/1567567847450UeAYY_PNG/profileImage.png");
    }

    @DisplayName("findSocialLoginUser 메서드는 유효하지 않는 인가 코드로 요청을 보낼 경우 예외를 던진다.")
    @Test
    void findSocialLoginResponse_fail() {
        mockServer.expect(requestTo(authorizationServerUrl)).andRespond(withUnauthorizedRequest());
        mockServer.expect(requestTo(apiServerUrl))
            .andRespond(withSuccess(successUserInfoResponse, MediaType.APPLICATION_JSON));

        assertThatThrownBy(() -> naverOAuthProvider.requestSocialLoginUser("authorizationCode"))
            .isInstanceOf(ExceptionWithMessageAndCode.INVALID_OAUTH_AUTHORIZATION_CODE.getException().getClass());
    }

    @DisplayName("findSocialLoginUser 메서드는 유효하지 않는 엑세스 토큰으로 요청을 보낼 경우 예외를 던진다.")
    @Test
    void findSocialLoginResponse_fail2() {
        mockServer.expect(requestTo(authorizationServerUrl))
            .andRespond(withSuccess("{\"access_token\":\"naverAccessToken\"}", MediaType.APPLICATION_JSON));
        mockServer.expect(requestTo(apiServerUrl)).andRespond(withUnauthorizedRequest());

        assertThatThrownBy(() -> naverOAuthProvider.requestSocialLoginUser("authorizationCode"))
            .isInstanceOf(ExceptionWithMessageAndCode.INVALID_OAUTH_ACCESS_TOKEN.getException().getClass());
    }
}
