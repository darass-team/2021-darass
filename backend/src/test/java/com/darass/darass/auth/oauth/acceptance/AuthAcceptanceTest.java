package com.darass.darass.auth.oauth.acceptance;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.darass.darass.AcceptanceTest;
import com.darass.darass.auth.oauth.api.domain.KaKaoOAuthProvider;
import com.darass.darass.auth.oauth.api.domain.OAuthProviderFactory;
import com.darass.darass.auth.oauth.dto.TokenResponse;
import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.exception.dto.ExceptionResponse;
import com.darass.darass.user.domain.SocialLoginUser;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

@DisplayName("Auth 인수 테스트")
public class AuthAcceptanceTest extends AcceptanceTest {

    private static final String apiUrl = "/api/v1/login/oauth";

    @SpyBean(name = "jwtTokenProvider")
    private JwtTokenProvider jwtTokenProvider;

    @MockBean
    private OAuthProviderFactory oAuthProviderFactory;

    @MockBean
    private KaKaoOAuthProvider kaKaoOAuthProvider;

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
            .oAuthProvider(KaKaoOAuthProvider.NAME)
            .email("jujubebat@kakao.com")
            .build();
    }

    @DisplayName("oauth2 토큰을 통해 회원가입 또는 로그인을 진행하고 JWT 토큰을 발급 받는다.")
    @Test
    public void login_success() throws Exception {
        //
        given(oAuthProviderFactory.getOAuthProvider(any())).willReturn(kaKaoOAuthProvider);
        given(kaKaoOAuthProvider.findSocialLoginUser(any())).willReturn(socialLoginUser);

        //when
        ResultActions resultActions = 토큰_발급_요청(KaKaoOAuthProvider.NAME, authorizationCode);

        //then
        토큰_발급됨(resultActions);
    }

    @DisplayName("유효하지 않은 인가 코드를 보낼 경우 JWT 토큰을 발급 받지 못한다.")
    @Test
    public void login_fail() throws Exception {
        // given
        given(oAuthProviderFactory.getOAuthProvider(any())).willReturn(kaKaoOAuthProvider);
        given(kaKaoOAuthProvider.findSocialLoginUser(any()))
            .willThrow(ExceptionWithMessageAndCode.INVALID_OAUTH_AUTHORIZATION_CODE.getException());

        // when
        ResultActions resultActions = 토큰_발급_요청(KaKaoOAuthProvider.NAME, authorizationCode);

        //then
        토큰_발급_실패됨(resultActions);
    }

    private ResultActions 토큰_발급_요청(String oauthProviderName, String authorizationCode) throws Exception {
        return this.mockMvc.perform(get(apiUrl)
            .contentType(MediaType.APPLICATION_JSON)
            .param("oauthProviderName", oauthProviderName)
            .param("authorizationCode", authorizationCode));
    }

    private void 토큰_발급됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk());
        String jsonResponse = resultActions.andReturn().getResponse().getContentAsString();
        TokenResponse tokenResponse = new ObjectMapper().readValue(jsonResponse, TokenResponse.class);
        String accessToken = tokenResponse.getAccessToken();

        assertThat(jwtTokenProvider.getPayload(accessToken)).isEqualTo(socialLoginUser.getId().toString());

         토큰_인증_로그인_rest_doc_작성(resultActions);
    }

    private void 토큰_인증_로그인_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
            document("api/v1/auth-login/get/success",
                requestParameters(
                    parameterWithName("oauthProviderName").description("oauth 제공자 이름"),
                    parameterWithName("authorizationCode").description("oauth 제공자가 발급해준 인가 코드")
                ),
                responseFields(
                    fieldWithPath("accessToken").type(JsonFieldType.STRING).description("서버헤서 발급해준 엑세스 토큰")
                ))
        );
    }

    private void 토큰_발급_실패됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isUnauthorized());

        String jsonResponse = resultActions.andReturn().getResponse().getContentAsString();
        ExceptionResponse exceptionResponse = new ObjectMapper().readValue(jsonResponse, ExceptionResponse.class);

        assertThat(exceptionResponse.getMessage()).isEqualTo(ExceptionWithMessageAndCode.INVALID_OAUTH_AUTHORIZATION_CODE.findMessage());
        assertThat(exceptionResponse.getCode()).isEqualTo(ExceptionWithMessageAndCode.INVALID_OAUTH_AUTHORIZATION_CODE.findCode());

        토큰_인증_로그인_실패_rest_doc_작성(resultActions);
    }

    private void 토큰_인증_로그인_실패_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
            document("api/v1/auth-login/get/fail",
                responseFields(
                    fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                    fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                ))
        );
    }

}
