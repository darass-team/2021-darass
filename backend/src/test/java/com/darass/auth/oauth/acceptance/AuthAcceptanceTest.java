package com.darass.auth.oauth.acceptance;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.darass.MockSpringContainerTest;
import com.darass.SpringContainerTest;
import com.darass.auth.domain.KaKaoOAuthProvider;
import com.darass.auth.domain.OAuthProviderFactory;
import com.darass.auth.dto.AccessTokenResponse;
import com.darass.auth.dto.TokenRequest;
import com.darass.auth.infrastructure.JwtTokenProvider;
import com.darass.exception.ExceptionWithMessageAndCode;
import com.darass.exception.dto.ExceptionResponse;
import com.darass.user.domain.SocialLoginUser;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import javax.servlet.http.Cookie;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

@DisplayName("Auth 인수 테스트")
class AuthAcceptanceTest extends MockSpringContainerTest {

    private String authorizationCode;

    private SocialLoginUser socialLoginUser;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);

        authorizationCode = "2FAF32IGO332IRFIJF3213";
        socialLoginUser = SocialLoginUser
            .builder()
            .nickName("우기")
            .oauthId("6752453")
            .oauthProvider(KaKaoOAuthProvider.NAME)
            .email("jujubebat@kakao.com")
            .build();
    }

    @DisplayName("oauth 인가 코드를 통해 회원가입 또는 로그인을 진행하고 refreshToken과 accessToken을 발급 받는다.")
    @Test
    void login_success() throws Exception {
        //given
        given(oAuthProviderFactory.getOAuthProvider(any())).willReturn(kaKaoOAuthProvider);
        given(kaKaoOAuthProvider.requestSocialLoginUser(any())).willReturn(socialLoginUser);

        //when
        ResultActions resultActions = 토큰_발급_요청(KaKaoOAuthProvider.NAME, authorizationCode);

        //then
        토큰_발급됨(resultActions);
        토큰_인증_로그인_rest_doc_작성(resultActions);
    }

    @DisplayName("유효하지 않은 인가 코드를 보낼 경우 refreshToken과 accessToken을 발급 받지 못한다.")
    @Test
    void login_fail() throws Exception {
        //given
        given(oAuthProviderFactory.getOAuthProvider(any())).willReturn(kaKaoOAuthProvider);
        given(kaKaoOAuthProvider.requestSocialLoginUser(any()))
            .willThrow(ExceptionWithMessageAndCode.INVALID_OAUTH_AUTHORIZATION_CODE.getException());

        //when
        ResultActions resultActions = 토큰_발급_요청(KaKaoOAuthProvider.NAME, authorizationCode);

        //then
        토큰_발급_실패됨(resultActions);
    }

    @DisplayName("쿠키에 들어있는 refresh 토큰을 통해 accessToken과 refresh 토큰을 재발급 받는다.")
    @Test
    void refreshToken() throws Exception {
        //given
        given(oAuthProviderFactory.getOAuthProvider(any())).willReturn(kaKaoOAuthProvider);
        given(kaKaoOAuthProvider.requestSocialLoginUser(any())).willReturn(socialLoginUser);

        ResultActions tokenRequestResultActions = 토큰_발급_요청(KaKaoOAuthProvider.NAME, authorizationCode);
        토큰_발급됨(tokenRequestResultActions);

        String jsonResponse = tokenRequestResultActions.andReturn().getResponse().getContentAsString();
        AccessTokenResponse accessTokenResponse = new ObjectMapper().readValue(jsonResponse, AccessTokenResponse.class);
        String accessToken = accessTokenResponse.getAccessToken();

        Cookie cookie = tokenRequestResultActions.andReturn().getResponse().getCookie("refreshToken");
        String refreshToken = cookie.getValue();

        // when
        Thread.sleep(1000);

        ResultActions tokenRefreshResultActions = 토큰_리프레시_요청(cookie);

        엑세스_토큰과_리프레쉬_토큰_재발급됨(accessToken, refreshToken, tokenRefreshResultActions);
    }

    @DisplayName("쿠키에 refresh 토큰이 들어있지 않다면, accessToken과 refresh 토큰을 재발급을 실패한다.")
    @Test
    void refreshToken_not_exists_refresh_token_fail() throws Exception {
        //given
        given(oAuthProviderFactory.getOAuthProvider(any())).willReturn(kaKaoOAuthProvider);
        given(kaKaoOAuthProvider.requestSocialLoginUser(any())).willReturn(socialLoginUser);

        Cookie cookie = new Cookie("name", "value");

        // when
        Thread.sleep(1000);

        ResultActions tokenRefreshResultActions = 토큰_리프레시_요청(cookie);

        유효하지_않은_리프레쉬_토큰으로_인해_엑세스_토큰과_리프레쉬_토큰_재발급_실패됨(tokenRefreshResultActions);
    }

    @DisplayName("쿠키를 보내지 않는다면, 404를 응답한다.")
    @Test
    void refreshToken_not_exists_cookie_fail() throws Exception {
        //given
        given(oAuthProviderFactory.getOAuthProvider(any())).willReturn(kaKaoOAuthProvider);
        given(kaKaoOAuthProvider.requestSocialLoginUser(any())).willReturn(socialLoginUser);

        ResultActions tokenRefreshResultActions = 토큰_리프레시_요청(null);

        쿠키가_존재_하지않아_엑세스_토큰과_리프레쉬_토큰_재발급_실패됨(tokenRefreshResultActions);
    }

    @DisplayName("쿠키에 유효하지 않는 refresh 않다면, accessToken과 refresh 토큰을 재발급을 실패한다.")
    @Test
    void refreshToken_invalid_refresh_token_fail() throws Exception {
        //given
        given(oAuthProviderFactory.getOAuthProvider(any())).willReturn(kaKaoOAuthProvider);
        given(kaKaoOAuthProvider.requestSocialLoginUser(any())).willReturn(socialLoginUser);

        Cookie cookie = new Cookie("refreshToken", "invalidRefreshToken");

        // when
        Thread.sleep(1000);

        ResultActions tokenRefreshResultActions = 토큰_리프레시_요청(cookie);

        유효하지_않은_리프레쉬_토큰으로_인해_엑세스_토큰과_리프레쉬_토큰_재발급_실패됨(tokenRefreshResultActions);
    }

    @DisplayName("엑세스 토큰을 보내서 로그아웃을 진행한다.")
    @Test
    void logOut() throws Exception {
        //given
        given(oAuthProviderFactory.getOAuthProvider(any())).willReturn(kaKaoOAuthProvider);
        given(kaKaoOAuthProvider.requestSocialLoginUser(any())).willReturn(socialLoginUser);

        ResultActions resultActions = 토큰_발급_요청(KaKaoOAuthProvider.NAME, authorizationCode);
        Map<String, String> tokens = 토큰_발급됨(resultActions);

        ResultActions logOutResultActions = 로그아웃_요청(tokens);

        로그아웃_됨(logOutResultActions);
        로그아웃_rest_doc_작성(logOutResultActions);
    }

    private void 리프레시_토큰이_존재_하지않아_엑세스_토큰과_리프레쉬_토큰_재발급_실패됨(ResultActions tokenRefreshResultActions)
        throws Exception {
        tokenRefreshResultActions.andExpect(status().is5xxServerError());

        토큰_인증_로그인_실패_rest_doc_작성(tokenRefreshResultActions);
    }

    private void 쿠키가_존재_하지않아_엑세스_토큰과_리프레쉬_토큰_재발급_실패됨(ResultActions tokenRefreshResultActions)
        throws Exception {
        tokenRefreshResultActions.andExpect(status().isBadRequest());
    }

    private void 유효하지_않은_리프레쉬_토큰으로_인해_엑세스_토큰과_리프레쉬_토큰_재발급_실패됨(ResultActions tokenRefreshResultActions)
        throws Exception {
        tokenRefreshResultActions.andExpect(status().is4xxClientError());

        토큰_인증_로그인_실패_rest_doc_작성(tokenRefreshResultActions);
    }

    private ResultActions 토큰_리프레시_요청(Cookie cookie) throws Exception {
        if (Objects.isNull(cookie)) {
            return this.mockMvc.perform(RestDocumentationRequestBuilders.post("/api/v1/login/refresh")
                .contentType(MediaType.APPLICATION_JSON));
        }
        return this.mockMvc.perform(RestDocumentationRequestBuilders.post("/api/v1/login/refresh")
            .cookie(cookie)
            .contentType(MediaType.APPLICATION_JSON));
    }

    private void 엑세스_토큰과_리프레쉬_토큰_재발급됨(String accessToken, String refreshToken, ResultActions tokenRefreshResultActions)
        throws Exception {
        tokenRefreshResultActions.andExpect(status().isOk());
        String jsonResponse = tokenRefreshResultActions.andReturn().getResponse().getContentAsString();
        AccessTokenResponse accessTokenResponse = new ObjectMapper().readValue(jsonResponse, AccessTokenResponse.class);
        String newAccessToken = accessTokenResponse.getAccessToken();

        Cookie cookie = tokenRefreshResultActions.andReturn().getResponse().getCookie("refreshToken");
        String newRefreshToken = cookie.getValue();

        assertThat(accessToken).isNotEqualTo(newAccessToken);
        assertThat(refreshToken).isNotEqualTo(newRefreshToken);

        엑세스_토큰과_리프레쉬_토큰_재발급됨_rest_doc_작성(tokenRefreshResultActions);
    }

    private void 엑세스_토큰과_리프레쉬_토큰_재발급됨_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
            document("api/v1/login-refresh/post/success",
                responseFields(
                    fieldWithPath("accessToken").type(JsonFieldType.STRING).description("서버에서 발급해준 엑세스 토큰")
                )
            )
        );
    }

    private ResultActions 토큰_발급_요청(String oauthProviderName, String authorizationCode) throws Exception {
        return this.mockMvc.perform(RestDocumentationRequestBuilders.post("/api/v1/login/oauth")
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(new TokenRequest(oauthProviderName, authorizationCode))));
    }

    private Map<String, String> 토큰_발급됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk());
        String jsonResponse = resultActions.andReturn().getResponse().getContentAsString();
        AccessTokenResponse accessTokenResponse = new ObjectMapper().readValue(jsonResponse, AccessTokenResponse.class);
        String accessToken = accessTokenResponse.getAccessToken();

        Cookie cookie = resultActions.andReturn().getResponse().getCookie("refreshToken");
        String refreshToken = cookie.getValue();

        assertThatCode(() -> jwtTokenProvider.validateRefreshToken(refreshToken)).doesNotThrowAnyException();
        assertThat(jwtTokenProvider.getAccessTokenPayload(accessToken)).isEqualTo(socialLoginUser.getId().toString());

        Map<String, String> tokens = new HashMap<>();
        tokens.put("accessToken", accessToken);
        tokens.put("refreshToken", refreshToken);

        return tokens;
    }

    private void 토큰_인증_로그인_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
            document("api/v1/auth-login/post/success",
                requestFields(
                    fieldWithPath("oauthProviderName").description("oauth 제공자 이름"),
                    fieldWithPath("authorizationCode").description("oauth 제공자가 발급해준 인가 코드")
                ),
                responseFields(
                    fieldWithPath("accessToken").type(JsonFieldType.STRING).description("서버에서 발급해준 엑세스 토큰")
                )
            )
        );
    }

    private void 토큰_발급_실패됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isUnauthorized());

        String jsonResponse = resultActions.andReturn().getResponse().getContentAsString();
        ExceptionResponse exceptionResponse = new ObjectMapper().readValue(jsonResponse, ExceptionResponse.class);

        assertThat(exceptionResponse.getMessage())
            .isEqualTo(ExceptionWithMessageAndCode.INVALID_OAUTH_AUTHORIZATION_CODE.findMessage());
        assertThat(exceptionResponse.getCode())
            .isEqualTo(ExceptionWithMessageAndCode.INVALID_OAUTH_AUTHORIZATION_CODE.findCode());

        토큰_인증_로그인_실패_rest_doc_작성(resultActions);
    }

    private void 토큰_인증_로그인_실패_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
            document("api/v1/auth-login/post/fail",
                responseFields(
                    fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                    fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                ))
        );
    }

    private ResultActions 로그아웃_요청(Map<String, String> tokens) throws Exception {
        return this.mockMvc.perform(RestDocumentationRequestBuilders.delete("/api/v1/log-out")
            .header("Authorization", "Bearer " + tokens.get("accessToken"))
            .header("Cookie", "refreshToken=" + tokens.get("refreshToken")));
    }

    private void 로그아웃_됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isNoContent());
    }

    private void 로그아웃_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
            document("api/v1/log-out/post/success")
        );
    }
}
