package com.darass.darass.user.controller;

import com.darass.darass.AcceptanceTest;
import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.comment.controller.dto.CommentCreateRequest;
import com.darass.darass.comment.controller.dto.CommentResponse;
import com.darass.darass.comment.controller.dto.UserResponse;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.exception.dto.ExceptionResponse;
import com.darass.darass.project.domain.Project;
import com.darass.darass.project.domain.RandomSecretKeyFactory;
import com.darass.darass.project.repository.ProjectRepository;
import com.darass.darass.user.controller.dto.PasswordCheckResponse;
import com.darass.darass.user.controller.dto.UserUpdateRequest;
import com.darass.darass.user.domain.OAuthPlatform;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("User 인수테스트")
public class UserAcceptanceTest extends AcceptanceTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private JwtTokenProvider tokenProvider;
    private SocialLoginUser socialLoginUser;
    private final String apiUrl = "/api/v1/users";
    private String secretKey;

    @BeforeEach
    public void setUser() { // TODO: 이 부분 로그인 인수테스트로 바꾸기
        socialLoginUser = SocialLoginUser
                .builder()
                .nickName("우기")
                .oauthId("2312312312")
                .oauthPlatform(OAuthPlatform.KAKAO)
                .email("bbwwpark@naver.com")
                .profileImageUrl("https://imageUrl")
                .build();
        userRepository.save(socialLoginUser);
    }

    @Test
    @DisplayName("엑세스 토큰으로 유저를 조회한다.")
    public void findUser_success() throws Exception {
        //given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser.getId().toString());

        //when
        ResultActions resultActions = 유저_조회_요청(accessToken);

        //then
        유저_조회됨(resultActions);
    }

    @Test
    @DisplayName("유효하지 않은 엑세스 토큰으로 인해 유저 조회를 실패한다.")
    public void findUser_fail() throws Exception {
        //given
        String incorrectAccessToken = "incorrectAccessToken";

        //when
        ResultActions resultActions = 유저_조회_요청(incorrectAccessToken);

        //then
        유저_조회_실패됨(resultActions);
    }

    @Test
    @DisplayName("엑세스 토큰으로 유저 닉네임을 수정한다.")
    public void updateUserNickname_success() throws Exception {
        //given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser.getId().toString());
        UserUpdateRequest userUpdateRequest = new UserUpdateRequest("병욱");

        //when
        ResultActions resultActions = 유저_닉네임_수정_요청(userUpdateRequest, accessToken);

        //then
        유저_닉네임_수정됨(resultActions, userUpdateRequest);
    }

    @Test
    @DisplayName("유효하지 않은 엑세스 토큰으로 인해 유저 닉네임 수정을 실패한다.")
    public void updateUserNickname_fail() throws Exception {
        //given
        String incorrectAccessToken = "incorrectAccessToken";
        UserUpdateRequest userUpdateRequest = new UserUpdateRequest("병욱");

        //when
        ResultActions resultActions = 유저_닉네임_수정_요청(userUpdateRequest, incorrectAccessToken);

        //then
        유저_닉네임_수정_실패됨(resultActions);
    }

    @Test
    @DisplayName("엑세스 토큰으로 유저를 삭제한다.")
    public void deleteUser_success() throws Exception {
        //given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser.getId().toString());

        //when
        ResultActions resultActions = 유저_삭제_요청(accessToken);

        //then
        유저_정보_삭제됨(resultActions);
    }

    @Test
    @DisplayName("유효하지 않은 엑세스 토큰으로 인해 유저 삭제를 실패 한다.")
    public void deleteUser_fail() throws Exception {
        //given
        String incorrectAccessToken = "incorrectAccessToken";

        //when
        ResultActions resultActions = 유저_삭제_요청(incorrectAccessToken);

        //then
        유저_삭제_실패됨(resultActions);
    }

    @Test
    @DisplayName("비로그인 사용자의 비밀번호 일치여부를 조회한다.")
    void checkGuestUserPassword() throws Exception {
        //given
        String expected = "password";
        String actual = "password";

        //when
        ResultActions resultActions = 비로그인_유저_비밀번호_일치여부_조회_요청(expected, actual);

        //then
        비로그인_유저_비밀번호_일치함(resultActions);
    }

    private void 비로그인_유저_비밀번호_일치함(ResultActions resultActions) throws Exception {
        String responseJson = resultActions.andReturn().getResponse().getContentAsString();
        PasswordCheckResponse passwordCheckResponse = new ObjectMapper().readValue(responseJson, PasswordCheckResponse.class);
        resultActions.andExpect(status().isOk());
        assertThat(passwordCheckResponse.getIsCorrectPassword()).isTrue();
    }

    private ResultActions 비로그인_유저_비밀번호_일치여부_조회_요청(String expected, String actual) throws Exception {
        Project project = Project.builder()
                .name("project")
                .secretKeyFactory(new RandomSecretKeyFactory())
                .user(socialLoginUser)
                .build();
        projectRepository.save(project);
        secretKey = project.getSecretKey();
        String responseJson = 비로그인_댓글_등록됨(expected).andReturn().getResponse().getContentAsString();
        UserResponse userResponse = new ObjectMapper().readValue(responseJson, CommentResponse.class).getUser();

        return this.mockMvc.perform(get(apiUrl + "/check-password")
                .contentType(MediaType.APPLICATION_JSON)
                .param("guestUserId", userResponse.getId().toString())
                .param("guestUserPassword", actual)
        );
    }

    private ResultActions 비로그인_댓글_등록됨(String password) throws Exception {
        return this.mockMvc.perform(post("/api/v1/comments")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(new CommentCreateRequest("guest", password, secretKey, "content", "url"))))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.user..type").value("GuestUser"));
    }

    private ResultActions 유저_조회_요청(String accessToken) throws Exception {
        return this.mockMvc.perform(get(apiUrl)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + accessToken));
    }

    private void 유저_조회됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk());
        String jsonResponse = resultActions.andReturn().getResponse().getContentAsString();
        UserResponse userResponse = new ObjectMapper().readValue(jsonResponse, UserResponse.class);

        assertThat(userResponse.getId()).isEqualTo(socialLoginUser.getId());
        assertThat(userResponse.getNickName()).isEqualTo(socialLoginUser.getNickName());
        assertThat(userResponse.getProfileImageUrl()).isEqualTo(socialLoginUser.getProfileImageUrl());

        유저_조회_rest_doc_작성(resultActions);
    }

    private void 유저_조회_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
                document("api/v1/users/get/success",
                        requestHeaders(
                                headerWithName("Authorization").description("JWT - Bearer 토큰")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("유저 아이디"),
                                fieldWithPath("nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                                fieldWithPath("type").type(JsonFieldType.STRING).description("유저 타입"),
                                fieldWithPath("createdDate").type(JsonFieldType.STRING).description("유저 생성일"),
                                fieldWithPath("modifiedDate").type(JsonFieldType.STRING).description("유저 수정일"),
                                fieldWithPath("profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지")
                        ))
        );
    }

    private void 유저_조회_실패됨(ResultActions resultActions) throws Exception {
        유저_토큰_인증_실패됨(resultActions);
        유저_조회_실패_rest_doc_작성(resultActions);
    }

    private void 유저_조회_실패_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
                document("api/v1/users/get/fail",
                        responseFields(
                                fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                                fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                        ))
        );
    }

    private ResultActions 유저_닉네임_수정_요청(UserUpdateRequest userUpdateRequest, String accessToken) throws Exception {
        return this.mockMvc.perform(patch(apiUrl)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + accessToken)
                .content(asJsonString(userUpdateRequest)));
    }

    private void 유저_닉네임_수정됨(ResultActions resultActions, UserUpdateRequest userUpdateRequest) throws Exception {
        resultActions.andExpect(status().isOk());
        String jsonResponse = resultActions.andReturn().getResponse().getContentAsString();
        UserResponse userResponse = new ObjectMapper().readValue(jsonResponse, UserResponse.class);

        assertThat(userResponse.getNickName()).isEqualTo(userUpdateRequest.getNickName());

        유저_닉네임_수정_rest_doc_작성(resultActions);
    }

    private void 유저_닉네임_수정_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
                document("api/v1/users/patch/success",
                        requestHeaders(
                                headerWithName("Authorization").description("JWT - Bearer 토큰")
                        ),
                        requestFields(
                                fieldWithPath("nickName").type(JsonFieldType.STRING).description("새로운 유저 닉네임")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("유저 아이디"),
                                fieldWithPath("nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                                fieldWithPath("type").type(JsonFieldType.STRING).description("유저 타입"),
                                fieldWithPath("createdDate").type(JsonFieldType.STRING).description("유저 생성일"),
                                fieldWithPath("modifiedDate").type(JsonFieldType.STRING).description("유저 수정일"),
                                fieldWithPath("profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지")
                        ))
        );
    }

    private void 유저_닉네임_수정_실패됨(ResultActions resultActions) throws Exception {
        유저_토큰_인증_실패됨(resultActions);
        유저_닉네임_수정_실패_rest_doc_작성(resultActions);
    }

    private void 유저_닉네임_수정_실패_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
                document("api/v1/users/patch/fail",
                        responseFields(
                                fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                                fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                        ))
        );
    }

    private ResultActions 유저_삭제_요청(String accessToken) throws Exception {
        return this.mockMvc.perform(delete(apiUrl)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + accessToken));
    }

    private void 유저_정보_삭제됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isNoContent());
        유저_삭제_rest_doc_작성(resultActions);
    }

    private void 유저_삭제_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
                document("api/v1/users/delete/success",
                        requestHeaders(
                                headerWithName("Authorization").description("JWT - Bearer 토큰")
                        )
                ));
    }

    private void 유저_삭제_실패됨(ResultActions resultActions) throws Exception {
        유저_토큰_인증_실패됨(resultActions);
        유저_삭제_실패_rest_doc_작성(resultActions);
    }

    private void 유저_삭제_실패_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
                document("api/v1/users/delete/fail",
                        responseFields(
                                fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                                fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                        ))
        );
    }

    private void 유저_토큰_인증_실패됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isUnauthorized());

        String jsonResponse = resultActions.andReturn().getResponse().getContentAsString();
        ExceptionResponse exceptionResponse = new ObjectMapper().readValue(jsonResponse, ExceptionResponse.class);

        assertThat(exceptionResponse.getMessage()).isEqualTo(ExceptionWithMessageAndCode.INVALID_JWT_TOKEN.findMessage());
        assertThat(exceptionResponse.getCode()).isEqualTo(ExceptionWithMessageAndCode.INVALID_JWT_TOKEN.findCode());
    }

}
