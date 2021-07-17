package com.darass.darass.auth.oauth.acceptance;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.darass.darass.AcceptanceTest;
import com.darass.darass.auth.oauth.api.domain.UserInfoProvider;
import com.darass.darass.auth.oauth.controller.dto.TokenResponse;
import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.auth.oauth.service.OAuthService;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.exception.dto.ExceptionResponse;
import com.darass.darass.user.domain.OAuthPlatform;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.repository.SocialLoginUserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

@DisplayName("Auth 인수 테스트")
public class AuthAcceptanceTest extends AcceptanceTest {

    @InjectMocks
    private OAuthService oAuthService;

    @SpyBean(name = "socialLoginUserRepository")
    private SocialLoginUserRepository socialLoginUserRepository;

    @SpyBean(name = "jwtTokenProvider")
    private JwtTokenProvider jwtTokenProvider;

    @MockBean(name = "userInfoProvider")
    private UserInfoProvider userInfoProvider;

    private final String apiUrl = "/api/v1/login/oauth";

    private String oauthAccessToken;

    private SocialLoginUser socialLoginUser;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);

        oauthAccessToken = "LiCNQrImAFxi3LJAdt9ipGMSeOhmR4hw33Ao9cx6jkvW5w";
        socialLoginUser = SocialLoginUser
            .builder()
            .nickName("우기")
            .oauthId("6752453")
            .oauthPlatform(OAuthPlatform.KAKAO)
            .email("jujubebat@kakao.com")
            .build();
    }

    @Test
    @DisplayName("oauth2 토큰을 통해 회원가입 또는 로그인을 진행하고 JWT 토큰을 발급 받는다.")
    public void login_success() throws Exception {
        // given
        given(userInfoProvider.findSocialLoginUser(oauthAccessToken)).willReturn(socialLoginUser);

        //when
        ResultActions resultActions = 토큰_발급_요청(oauthAccessToken);

        //then
        토큰_발급됨(resultActions);
    }

    @Test
    @DisplayName("올바르지 않은 oauth2 토큰을 보낼 경우 로그인을 실패하고 JWT 토큰을 발급 받지 못한다.")
    public void login_fail() throws Exception {
        // given
        given(userInfoProvider.findSocialLoginUser(oauthAccessToken)).willThrow(ExceptionWithMessageAndCode.INVALID_JWT_TOKEN.getException());

        // when
        ResultActions resultActions = 토큰_발급_요청(oauthAccessToken);

        //then
        토큰_발급_실패됨(resultActions);
    }

    private ResultActions 토큰_발급_요청(String oauthAccessToken) throws Exception {
        return this.mockMvc.perform(get(apiUrl)
            .contentType(MediaType.APPLICATION_JSON)
            .param("oauthAccessToken", oauthAccessToken));
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
                    parameterWithName("oauthAccessToken").description("소셜 로그인을 통한 발급받은 엑세스 토큰")
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

        assertThat(exceptionResponse.getMessage()).isEqualTo(ExceptionWithMessageAndCode.INVALID_JWT_TOKEN.findMessage());
        assertThat(exceptionResponse.getCode()).isEqualTo(ExceptionWithMessageAndCode.INVALID_JWT_TOKEN.findCode());

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
