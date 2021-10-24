package com.darass.user.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.partWithName;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.restdocs.request.RequestDocumentation.requestParts;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.darass.SpringContainerTest;
import com.darass.auth.infrastructure.JwtTokenProvider;
import com.darass.comment.dto.CommentCreateRequest;
import com.darass.comment.dto.CommentResponse;
import com.darass.commentalarm.domain.CommentAlarmMachine;
import com.darass.exception.ExceptionWithMessageAndCode;
import com.darass.exception.dto.ExceptionResponse;
import com.darass.project.domain.Project;
import com.darass.project.repository.ProjectRepository;
import com.darass.user.domain.SocialLoginUser;
import com.darass.user.dto.PasswordCheckResponse;
import com.darass.user.dto.UserResponse;
import com.darass.user.dto.UserUpdateRequest;
import com.darass.user.infrastructure.S3Uploader;
import com.darass.user.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.file.Files;
import java.nio.file.Paths;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMultipartHttpServletRequestBuilder;
import org.springframework.web.multipart.MultipartFile;

//TODO: user 필드에 추가된 빨간점 알람. flyway 반영

@DisplayName("User 인수테스트")
class UserAcceptanceTest extends SpringContainerTest { //TODO: 로그이웃 기능 체크

    private static final String API_URL = "/api/v1/users";

    private static final String REFRESH_TOKEN = "refreshToken";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private JwtTokenProvider tokenProvider;

    private SocialLoginUser socialLoginUser;

    private String projectSecretKey;

    @MockBean
    private S3Uploader s3Uploader;

    @MockBean
    private CommentAlarmMachine commentAlarmMachine;

    @BeforeEach
    public void setUser() { // TODO: 이 부분 로그인 인수테스트로 바꾸기
        doNothing().when(commentAlarmMachine).sendMessage(any());

        socialLoginUser = SocialLoginUser
            .builder()
            .nickName("우기")
            .oauthId("2312312312")
            .oauthProvider("kakao")
            .email("bbwwpark@naver.com")
            .profileImageUrl("https://imageUrl")
            .refreshToken(REFRESH_TOKEN)
            .build();
        userRepository.save(socialLoginUser);
    }

    @Test
    @DisplayName("엑세스 토큰으로 유저를 조회한다.")
    void findUser_success() throws Exception {
        //given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser);

        //when
        ResultActions resultActions = 유저_조회_요청(accessToken, REFRESH_TOKEN);

        //then
        유저_조회됨(resultActions);
    }

    @Test
    @DisplayName("유효하지 않은 엑세스 토큰으로 인해 유저 조회를 실패한다.")
    void findUser_fail() throws Exception {
        //given
        String incorrectAccessToken = "incorrectAccessToken";

        //when
        ResultActions resultActions = 유저_조회_요청(incorrectAccessToken, REFRESH_TOKEN);

        //then
        유저_토큰_인증_실패됨(resultActions);
        유저_조회_실패_rest_doc_작성(resultActions);
    }


    @Test
    @DisplayName("유효하지 않은 리프레쉬 토큰으로 인해 토큰으로 유저 조회를 실패한다.")
    void findUser_success2() throws Exception {
        //given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser);

        //when
        ResultActions resultActions = 유저_조회_요청(accessToken, "invalidRefreshToken");

        //then
        유효하지_않은_리프레쉬_토큰으로_인해_유저_토큰_인증_실패됨(resultActions);
        유저_조회_실패_rest_doc_작성(resultActions);
    }

    private void 유효하지_않은_리프레쉬_토큰으로_인해_유저_토큰_인증_실패됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isUnauthorized());

        String jsonResponse = resultActions.andReturn().getResponse().getContentAsString();
        ExceptionResponse exceptionResponse = new ObjectMapper().readValue(jsonResponse, ExceptionResponse.class);

        assertThat(exceptionResponse.getMessage()).isEqualTo(ExceptionWithMessageAndCode.INVALID_REFRESH_TOKEN.findMessage());
        assertThat(exceptionResponse.getCode()).isEqualTo(ExceptionWithMessageAndCode.INVALID_REFRESH_TOKEN.findCode());
    }

    @Test
    @DisplayName("엑세스 토큰으로 유저 닉네임을 수정한다.")
    void updateUserNickname_success() throws Exception {
        //given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser);
        UserUpdateRequest userUpdateRequest = new UserUpdateRequest("병욱", null, true);

        //when
        ResultActions resultActions = 유저_닉네임_수정_요청(userUpdateRequest, accessToken);

        //then
        유저_닉네임_수정됨(resultActions, userUpdateRequest);
    }

    @Test
    @DisplayName("액세스 토큰으로 유저 프로필 사진을 수정한다.")
    void updateProfileImage_success() throws Exception {
        //given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser);
        byte[] bytes = Files.readAllBytes(Paths.get("./src/test/resources/static/testImg.jpg"));
        String originalFilename = "testImg.jpg";
        MultipartFile multipartFile = new MockMultipartFile("profileImageFile", originalFilename, "image/jpeg", bytes);
        UserUpdateRequest userUpdateRequest = new UserUpdateRequest("우기", multipartFile, true);
        given(s3Uploader.upload(any())).willReturn(originalFilename);

        //when
        ResultActions resultActions = 유저_프로필_사진_수정_요청(userUpdateRequest, accessToken);

        //then
        유저_프로필_사진_수정됨(resultActions, userUpdateRequest);
    }

    @Test
    @DisplayName("유효하지 않은 닉네일 길이로 인해 유저 닉네임 수정을 실패한다.")
    void updateUserNickname_length_fail() throws Exception {
        //given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser);
        String invalidNickName = "invalid_nickName_invalid_nickName_invalid_nickName_invalid_nickName";
        UserUpdateRequest userUpdateRequest = new UserUpdateRequest(invalidNickName, null, true);

        //when
        ResultActions resultActions = 유저_닉네임_수정_요청(userUpdateRequest, accessToken);

        //then
        잘못된_닉네임으로_유저_닉네임_수정_실패됨(resultActions);
    }

    @Test
    @DisplayName("유효하지 않은 엑세스 토큰으로 인해 유저 닉네임 수정을 실패한다.")
    void updateUserNickname_fail() throws Exception {
        //given
        String incorrectAccessToken = "incorrectAccessToken";
        UserUpdateRequest userUpdateRequest = new UserUpdateRequest("병욱", null, true);

        //when
        ResultActions resultActions = 유저_닉네임_수정_요청(userUpdateRequest, incorrectAccessToken);

        //then
        잘못된_토큰으로_유저_닉네임_수정_실패됨(resultActions);
    }

    @Test
    @DisplayName("5MB보다 큰 용량의 큰 파일 경우, 유저 프로필 이미지 수정을 실패한다.")
    public void updateProfileImage_fail() throws Exception {
        //given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser);
        byte[] bytes = Files.readAllBytes(Paths.get("./src/test/resources/static/overSizeImage.jpg"));
        String originalFilename = "overSizeImage.jpg";
        MultipartFile multipartFile = new MockMultipartFile("profileImageFile", originalFilename, "image/jpeg", bytes);
        UserUpdateRequest userUpdateRequest = new UserUpdateRequest(null, multipartFile, true);
        given(s3Uploader.upload(any())).willReturn(originalFilename);

        //when
        ResultActions resultActions = 유저_프로필_사진_수정_요청(userUpdateRequest, accessToken);

        //then
        큰_용량_프로필_이미지로_인해_변경_실패됨(resultActions);
        유저_수정_실패_rest_doc_작성(resultActions, "api/v1/users/patch/fail-invalid-file");
    }

    @Test
    @DisplayName("엑세스 토큰으로 유저를 삭제한다.")
    void deleteUser_success() throws Exception {
        //given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser);

        //when
        ResultActions resultActions = 유저_삭제_요청(accessToken);

        //then
        유저_정보_삭제됨(resultActions);
    }

    @Test
    @DisplayName("유효하지 않은 엑세스 토큰으로 인해 유저 삭제를 실패 한다.")
    void deleteUser_fail() throws Exception {
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

    @Test
    @DisplayName("비로그인 사용자의 비밀번호 일치여부 조회시 일치하지 않는다.")
    void checkWrongGuestUserPassword() throws Exception {
        //given
        String expected = "password";
        String actual = "wrongPassword";

        //when
        ResultActions resultActions = 비로그인_유저_비밀번호_일치여부_조회_요청(expected, actual);

        //then
        비로그인_유저_비밀번호_틀림(resultActions);
    }

    private void 비로그인_유저_비밀번호_틀림(ResultActions resultActions) throws Exception {
        String responseJson = resultActions.andReturn().getResponse().getContentAsString();
        PasswordCheckResponse passwordCheckResponse = new ObjectMapper()
            .readValue(responseJson, PasswordCheckResponse.class);
        assertThat(passwordCheckResponse.getIsCorrectPassword()).isFalse();
        비밀번호_일치여부_조회_rest_doc_작성(resultActions, "api/v1/users/get/password-check-incorrect");
    }

    private void 비로그인_유저_비밀번호_일치함(ResultActions resultActions) throws Exception {
        String responseJson = resultActions.andReturn().getResponse().getContentAsString();
        PasswordCheckResponse passwordCheckResponse = new ObjectMapper()
            .readValue(responseJson, PasswordCheckResponse.class);
        assertThat(passwordCheckResponse.getIsCorrectPassword()).isTrue();
        비밀번호_일치여부_조회_rest_doc_작성(resultActions, "api/v1/users/get/password-check-correct");
    }

    private ResultActions 비밀번호_일치여부_조회_rest_doc_작성(ResultActions resultActions, String path) throws Exception {
        return resultActions.andExpect(status().isOk())
            .andDo(
                document(path,
                    requestParameters(
                        parameterWithName("guestUserId").description("검증하려는 비로그인 유저 id"),
                        parameterWithName("guestUserPassword").description("검증하려는 비밀번호")
                    ),
                    responseFields(
                        fieldWithPath("isCorrectPassword").type(JsonFieldType.BOOLEAN).description("비밀번호 일치 여부")
                    ))
            );
    }

    private ResultActions 비로그인_유저_비밀번호_일치여부_조회_요청(String expected, String actual) throws Exception {
        Project project = Project.builder()
            .name("project")
            .user(socialLoginUser)
            .build();
        projectRepository.save(project);
        projectSecretKey = project.getSecretKey();
        String responseJson = 비로그인_댓글_등록됨(expected).andReturn().getResponse().getContentAsString();
        UserResponse userResponse = new ObjectMapper().readValue(responseJson, CommentResponse.class).getUser();

        return this.mockMvc.perform(get(API_URL + "/check-password")
            .contentType(MediaType.APPLICATION_JSON)
            .param("guestUserId", userResponse.getId().toString())
            .param("guestUserPassword", actual)
        );
    }

    private ResultActions 비로그인_댓글_등록됨(String password) throws Exception {
        return this.mockMvc.perform(post("/api/v1/comments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(new CommentCreateRequest("guest", password, null, projectSecretKey, "content", "url"))))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.user..type").value("GuestUser"));
    }

    private ResultActions 유저_조회_요청(String accessToken, String refreshToken) throws Exception {
        return this.mockMvc.perform(get(API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .header("Authorization", "Bearer " + accessToken)
            .header("Cookie", "refreshToken=" + refreshToken));
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
                    fieldWithPath("profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지"),
                    fieldWithPath("hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부")
                ))
        );
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
        return this.mockMvc.perform(patch(API_URL)
            .contentType(MediaType.MULTIPART_FORM_DATA)
            .header("Authorization", "Bearer " + accessToken)
            .header("Cookie", "refreshToken=refreshToken")
            .param("nickName", userUpdateRequest.getNickName())
            .param("hasRecentAlarm", "true")
            .content(asJsonString(userUpdateRequest)));
    }

    private ResultActions 유저_프로필_사진_수정_요청(UserUpdateRequest userUpdateRequest, String accessToken) throws Exception {
        MockMultipartHttpServletRequestBuilder multipart = (MockMultipartHttpServletRequestBuilder) multipart(API_URL)
            .with(request -> {
                request.setMethod(HttpMethod.PATCH.toString());
                return request;
            });

        return this.mockMvc.perform(multipart
            .file((MockMultipartFile) userUpdateRequest.getProfileImageFile())
            .param("nickName", userUpdateRequest.getNickName())
            .param("hasRecentAlarm", "true")
            .header("Authorization", "Bearer " + accessToken)
            .header("Cookie", "refreshToken=refreshToken"));
    }

    private void 유저_닉네임_수정됨(ResultActions resultActions, UserUpdateRequest userUpdateRequest) throws Exception {
        resultActions.andExpect(status().isOk());
        String jsonResponse = resultActions.andReturn().getResponse().getContentAsString();
        UserResponse userResponse = new ObjectMapper().readValue(jsonResponse, UserResponse.class);

        assertThat(userResponse.getNickName()).isEqualTo(userUpdateRequest.getNickName());

        유저_닉네임_수정_rest_doc_작성(resultActions);
    }

    private void 유저_프로필_사진_수정됨(ResultActions resultActions, UserUpdateRequest userUpdateRequest) throws Exception {
        resultActions.andExpect(status().isOk());
        String jsonResponse = resultActions.andReturn().getResponse().getContentAsString();
        UserResponse userResponse = new ObjectMapper().readValue(jsonResponse, UserResponse.class);

        assertThat(userResponse.getProfileImageUrl())
            .isEqualTo(userUpdateRequest.getProfileImageFile().getOriginalFilename());

        유저_프로필_사진_수정_rest_doc_작성(resultActions);
    }

    private void 유저_닉네임_수정_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
            document("api/v1/users/patch/success-nickname",
                requestHeaders(
                    headerWithName("Authorization").description("JWT - Bearer 토큰")
                ),
                requestParts(
                    partWithName("profileImageFile").description("프로필 이미지 파일").optional(),
                    partWithName("nickName").description("새로운 유저 닉네임").optional()
                ),
                responseFields(
                    fieldWithPath("id").type(JsonFieldType.NUMBER).description("유저 아이디"),
                    fieldWithPath("nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                    fieldWithPath("type").type(JsonFieldType.STRING).description("유저 타입"),
                    fieldWithPath("createdDate").type(JsonFieldType.STRING).description("유저 생성일"),
                    fieldWithPath("modifiedDate").type(JsonFieldType.STRING).description("유저 수정일"),
                    fieldWithPath("profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지"),
                    fieldWithPath("hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부")
                ))
        );
    }

    private void 유저_프로필_사진_수정_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
            document("api/v1/users/patch/success-image",
                requestHeaders(
                    headerWithName("Authorization").description("JWT - Bearer 토큰")
                ),
                requestParts(
                    partWithName("profileImageFile").description("프로필 이미지 파일").optional(),
                    partWithName("nickName").description("새로운 유저 닉네임").optional()
                ),
                responseFields(
                    fieldWithPath("id").type(JsonFieldType.NUMBER).description("유저 아이디"),
                    fieldWithPath("nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                    fieldWithPath("type").type(JsonFieldType.STRING).description("유저 타입"),
                    fieldWithPath("createdDate").type(JsonFieldType.STRING).description("유저 생성일"),
                    fieldWithPath("modifiedDate").type(JsonFieldType.STRING).description("유저 수정일"),
                    fieldWithPath("profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지"),
                    fieldWithPath("hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부")
                ))
        );
    }

    private void 잘못된_토큰으로_유저_닉네임_수정_실패됨(ResultActions resultActions) throws Exception {
        유저_토큰_인증_실패됨(resultActions);
        유저_수정_실패_rest_doc_작성(resultActions, "api/v1/users/patch/fail");
    }

    private void 잘못된_닉네임으로_유저_닉네임_수정_실패됨(ResultActions resultActions) throws Exception {
        잘못된_닉네임으로_변경_실패됨(resultActions);
        유저_수정_실패_rest_doc_작성(resultActions, "api/v1/users/patch/fail-invalid-nickname");
    }

    private void 유저_수정_실패_rest_doc_작성(ResultActions resultActions, String documentPath) throws Exception {
        resultActions.andDo(
            document(documentPath,
                responseFields(
                    fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                    fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                ))
        );
    }

    private ResultActions 유저_삭제_요청(String accessToken) throws Exception {
        return this.mockMvc.perform(delete(API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .header("Authorization", "Bearer " + accessToken)
            .header("Cookie", "refreshToken=refreshToken"));
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


    private void 잘못된_닉네임으로_변경_실패됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isBadRequest());

        String jsonResponse = resultActions.andReturn().getResponse().getContentAsString();
        ExceptionResponse exceptionResponse = new ObjectMapper().readValue(jsonResponse, ExceptionResponse.class);

        assertThat(exceptionResponse.getMessage()).isEqualTo(ExceptionWithMessageAndCode.INVALID_INPUT_LENGTH.findMessage());
        assertThat(exceptionResponse.getCode()).isEqualTo(ExceptionWithMessageAndCode.INVALID_INPUT_LENGTH.findCode());
    }

    private void 큰_용량_프로필_이미지로_인해_변경_실패됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isBadRequest());

        String jsonResponse = resultActions.andReturn().getResponse().getContentAsString();
        ExceptionResponse exceptionResponse = new ObjectMapper().readValue(jsonResponse, ExceptionResponse.class);

        assertThat(exceptionResponse.getMessage()).isEqualTo(ExceptionWithMessageAndCode.OVER_MAX_FILE_SIZE.findMessage());
        assertThat(exceptionResponse.getCode()).isEqualTo(ExceptionWithMessageAndCode.OVER_MAX_FILE_SIZE.findCode());
    }

}
