package com.darass.auth.api.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withUnauthorizedRequest;

import com.darass.auth.domain.KaKaoOAuthProvider;
import com.darass.exception.ExceptionWithMessageAndCode;
import com.darass.user.domain.SocialLoginUser;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;

@DisplayName("KaKaoOAuthProvider 클래스")
@RestClientTest(KaKaoOAuthProvider.class)
class KaKaoOAuthProviderTest {

    String successUserInfoResponse =
        "{\"id\":1791380911,\"connected_at\":\"2021-07-02T10:42:36Z\",\"properties\":{\"nickname\":\"병욱\"},"
            + "\"kakao_account\":{\"profile_nickname_needs_agreement\":false,\"profile_image_needs_agreement\":false,\""
            + "profile\":{\"nickname\":\"병욱\",\"thumbnail_image_url\":\"http://k.kakaocdn.net/dn/cQc7At/btq9Zq3eBJb/DDAc7l5Iv7rOJfF7DZZkfK/img_110x110.jpg\","
            + "\"profile_image_url\":\"http://k.kakaocdn.net/dn/cQc7At/btq9Zq3eBJb/DDAc7l5Iv7rOJfF7DZZkfK/img_640x640.jpg\",\"is_default_image\":false},\"has_email\":true,"
            + "\"email_needs_agreement\":false,\"is_email_valid\":true,\"is_email_verified\":true,\"email\":\"jujubebat@kakao.com\",\"has_age_range\":true,"
            + "\"age_range_needs_agreement\":false,\"age_range\":\"20~29\",\"has_birthday\":true,\"birthday_needs_agreement\":false,\"birthday\":\"1114\",\"birthday_type\":\"SOLAR\","
            + "\"has_gender\":true,\"gender_needs_agreement\":false,\"gender\":\"male\"}}";
    @Autowired
    private KaKaoOAuthProvider kaKaoOAuthProvider;
    @Autowired
    private MockRestServiceServer mockServer;
    @Value("${oauth.kakao.authorization-server-url}")
    private String authorizationServerUrl;
    @Value("${oauth.kakao.api-server-url}")
    private String apiServerUrl;

    @DisplayName("findSocialLoginUser 메서드는 카카오 인증서버에 인가 코드를 전송해서 엑세스 토큰을 얻어와 카카오 api 서버에 보낸후 SocialLoginUser 객체를 받아온다.")
    @Test
    void findSocialLoginUser() {
        mockServer.expect(requestTo(authorizationServerUrl))
            .andRespond(withSuccess("{\"access_token\":\"kakaoAccessToken\"}", MediaType.APPLICATION_JSON));
        mockServer.expect(requestTo(apiServerUrl))
            .andRespond(withSuccess(successUserInfoResponse, MediaType.APPLICATION_JSON));

        //then
        SocialLoginUser socialLoginUser = kaKaoOAuthProvider.requestSocialLoginUser("authorizationCode");

        //when
        assertThat(socialLoginUser.getNickName()).isEqualTo("병욱");
        assertThat(socialLoginUser.getEmail()).isEqualTo("jujubebat@kakao.com");
        assertThat(socialLoginUser.getProfileImageUrl())
            .isEqualTo("http://k.kakaocdn.net/dn/cQc7At/btq9Zq3eBJb/DDAc7l5Iv7rOJfF7DZZkfK/img_110x110.jpg");
    }

    @DisplayName("findSocialLoginUser 메서드는 유효하지 않는 인가 코드로 요청을 보낼 경우 예외를 던진다.")
    @Test
    void findSocialLoginResponse_fail() {
        mockServer.expect(requestTo(authorizationServerUrl)).andRespond(withUnauthorizedRequest());
        mockServer.expect(requestTo(apiServerUrl))
            .andRespond(withSuccess(successUserInfoResponse, MediaType.APPLICATION_JSON));

        assertThatThrownBy(() -> kaKaoOAuthProvider.requestSocialLoginUser("authorizationCode"))
            .isInstanceOf(ExceptionWithMessageAndCode.INVALID_OAUTH_AUTHORIZATION_CODE.getException().getClass());
    }

    @DisplayName("findSocialLoginUser 메서드는 유효하지 않는 엑세스 토큰으로 요청을 보낼 경우 예외를 던진다.")
    @Test
    void findSocialLoginResponse_fail2() {
        mockServer.expect(requestTo(authorizationServerUrl))
            .andRespond(withSuccess("{\"access_token\":\"kakaoAccessToken\"}", MediaType.APPLICATION_JSON));
        mockServer.expect(requestTo(apiServerUrl)).andRespond(withUnauthorizedRequest());

        assertThatThrownBy(() -> kaKaoOAuthProvider.requestSocialLoginUser("authorizationCode"))
            .isInstanceOf(ExceptionWithMessageAndCode.INVALID_OAUTH_ACCESS_TOKEN.getException().getClass());
    }

    @DisplayName("findSocialLoginUser 메서드는 카카오 인증서버에 인가 코드를 전송해서 엑세스 토큰을 얻어와 카카오 api 서버에 보낸후 SocialLoginUser 객체를 받아온다.(카카오에서 유저 이메일 정보를 제공하지 않는경우)")
    @Test
    void findSocialLoginUser_not_provide_userEmail() {
        String userInfoResponse =
            "{\"id\":1791380911,\"connected_at\":\"2021-07-02T10:42:36Z\",\"properties\":{\"nickname\":\"병욱\"},"
                + "\"kakao_account\":{\"profile_nickname_needs_agreement\":false,\"profile_image_needs_agreement\":false,\""
                + "profile\":{\"nickname\":\"병욱\",\"thumbnail_image_url\":\"http://k.kakaocdn.net/dn/cQc7At/btq9Zq3eBJb/DDAc7l5Iv7rOJfF7DZZkfK/img_110x110.jpg\","
                + "\"profile_image_url\":\"http://k.kakaocdn.net/dn/cQc7At/btq9Zq3eBJb/DDAc7l5Iv7rOJfF7DZZkfK/img_640x640.jpg\",\"is_default_image\":false},\"has_email\":true,"
                + "\"email_needs_agreement\":false,\"is_email_valid\":true,\"is_email_verified\":true,\"has_age_range\":true,"
                + "\"age_range_needs_agreement\":false,\"age_range\":\"20~29\",\"has_birthday\":true,\"birthday_needs_agreement\":false,\"birthday\":\"1114\",\"birthday_type\":\"SOLAR\","
                + "\"has_gender\":true,\"gender_needs_agreement\":false,\"gender\":\"male\"}}";

        mockServer.expect(requestTo(authorizationServerUrl))
            .andRespond(withSuccess("{\"access_token\":\"kakaoAccessToken\"}", MediaType.APPLICATION_JSON));
        mockServer.expect(requestTo(apiServerUrl))
            .andRespond(withSuccess(userInfoResponse, MediaType.APPLICATION_JSON));

        //then
        SocialLoginUser socialLoginUser = kaKaoOAuthProvider.requestSocialLoginUser("authorizationCode");

        //when
        assertThat(socialLoginUser.getNickName()).isEqualTo("병욱");
        assertThat(socialLoginUser.getEmail()).isEqualTo(null);
        assertThat(socialLoginUser.getProfileImageUrl())
            .isEqualTo("http://k.kakaocdn.net/dn/cQc7At/btq9Zq3eBJb/DDAc7l5Iv7rOJfF7DZZkfK/img_110x110.jpg");
    }
}