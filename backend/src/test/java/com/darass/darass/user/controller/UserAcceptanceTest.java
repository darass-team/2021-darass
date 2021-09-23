package com.darass.darass.user.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.partWithName;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.restdocs.request.RequestDocumentation.requestParts;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.darass.darass.AcceptanceTest;
import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.auth.oauth.service.OAuthService;
import com.darass.darass.comment.dto.CommentCreateRequest;
import com.darass.darass.comment.dto.CommentResponse;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.exception.dto.ExceptionResponse;
import com.darass.darass.project.domain.Project;
import com.darass.darass.project.repository.ProjectRepository;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.dto.PasswordCheckRequest;
import com.darass.darass.user.dto.PasswordCheckResponse;
import com.darass.darass.user.dto.UserResponse;
import com.darass.darass.user.dto.UserUpdateRequest;
import com.darass.darass.user.infrastructure.S3Uploader;
import com.darass.darass.user.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import javax.servlet.http.Cookie;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMultipartHttpServletRequestBuilder;
import org.springframework.web.multipart.MultipartFile;

/*
인수 테스트 건들이기가 매우 힘들었음
인수테스트시 테스트 픽스쳐를 만들기 힘들었음
서비스 테스트와의 중복
restdoc + e2e 테스트 하니까 너무 느림.
지금은 괜찮지만, 테스트가 1000개가 되면? 더 느려지고 더 유지보수하기 힘들어짐

이에반에 e2e 테스트가 우리에게 주는 장점?
실제로 끝점에서 끝점까지 잘동작 하는지 확인할 수 있음 -> 더 큰 안정감.

e2e 테스트를 안하면 불안정적인가?

현재 단위 테스트에서 검증해할걸 인수 테스트에서 검증하고 있음... 유저 닉네임 길이 오류
현재 UserAcceptanceTest 에 서비스 테스트, 도메인 테스트를 퉁치는 테스트들이 있다는 문제 (예를들어 유저 비밀 번호 체크)

컨트롤러 슬라이스 테스트(서비스 mocking)를 제안하는 이유
- 서비스 레이어와 테스트 중복
- restdoc + e2e를 하니 너무 느림
- 인수테스트 구현, 리팩토링에 대한 부담이 너무 큼
- 서비스 레이어를 mocking 하면 더 빠르고 손쉽게 인수테스트를 작성할 수 있음
 */


/*
TODO:  아래 도메인 예외 테스트 구현(서비스에 구현하자)
- OVER_MAX_FILE_SIZE
- INVALID_INPUT_LENGTH

TODO: checkGuestUserPassword가 실패했을 경우는 서비스 테스트에서 수행 해야한다.
컨트롤러 테스트는 컨트롤러 단에서 api 요청 응답을 잘 테스트 하는지 검증한다.

파일 업로드 부분도 컨트롤러에 작성되어 있음

*/


@DisplayName("User 인수테스트")
class UserAcceptanceTest extends AcceptanceTest {

    private static final SocialLoginUser SOCIAL_LOGIN_USER;
    public static final String ACCESS_TOKEN = "accessToken";
    public static final String REFRESH_TOKEN = "refreshToken";

    @MockBean
    private UserService userService;

    @MockBean
    private OAuthService oAuthService;

    static {
        SOCIAL_LOGIN_USER = SocialLoginUser
            .builder()
            .id(1L)
            .nickName("우기")
            .oauthId("2312312312")
            .oauthProvider("kakao")
            .email("bbwwpark@naver.com")
            .profileImageUrl("https://imageUrl")
            .refreshToken(REFRESH_TOKEN)
            .build();
    }

    @BeforeEach
    void setUp(){
        given(oAuthService.findSocialLoginUserByAccessToken(ACCESS_TOKEN)).willReturn(SOCIAL_LOGIN_USER);
    }

    @DisplayName("유저를 조회한다.")
    @Test
    void findUser_success() throws Exception {
        //given
        UserResponse userResponse = UserResponse.builder()
            .id(1L)
            .nickName("병욱")
            .type("SocialLoginUser")
            .profileImageUrl("https://darass/image")
            .createdDate(LocalDateTime.now())
            .modifiedDate(LocalDateTime.now())
            .build();

        given(userService.findById(any())).willReturn(userResponse);

        //when
        ResultActions resultActions = this.mockMvc.perform(
            get("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + ACCESS_TOKEN)
                .cookie(new Cookie(REFRESH_TOKEN, "refreshToken"))
        );

        //then
        resultActions
            .andExpect(status().isOk())
            .andDo(document("api/v1/users/get/success",
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

    @DisplayName("엑세스 토큰을 보내지 않으면 유저 조회를 실패한다.")
    @Test
    void findUser_fail() throws Exception {
        //given
        UserResponse userResponse = UserResponse.builder()
            .id(1L)
            .nickName("병욱")
            .type("SocialLoginUser")
            .profileImageUrl("https://darass/image")
            .createdDate(LocalDateTime.now())
            .modifiedDate(LocalDateTime.now())
            .build();

        given(userService.findById(any())).willReturn(userResponse);

        //when
        ResultActions resultActions = this.mockMvc.perform(
            get("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .cookie(new Cookie("refreshToken", REFRESH_TOKEN))
        );

        //then
        resultActions
            .andExpect(status().isUnauthorized())
            .andDo(document("api/v1/users/get/fail",
                responseFields(
                    fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                    fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                ))
            );
    }

    @DisplayName("리프레쉬 토큰을 보내지 않으면 유저 조회를 실패한다.")
    @Test
    void findUser_success2() throws Exception {
        UserResponse userResponse = UserResponse.builder()
            .id(1L)
            .nickName("병욱")
            .type("SocialLoginUser")
            .profileImageUrl("https://darass/image")
            .createdDate(LocalDateTime.now())
            .modifiedDate(LocalDateTime.now())
            .build();

        given(userService.findById(any())).willReturn(userResponse);

        //when
        ResultActions resultActions = this.mockMvc.perform(
            get("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + ACCESS_TOKEN)
        );

        //then
        resultActions
            .andExpect(status().isBadRequest())
            .andDo(document("api/v1/users/get/fail",
                responseFields(
                    fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                    fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                ))
            );
    }

    @DisplayName("유저 닉네임과 프로필 사진을 수정한다.")
    @Test
    void updateUserNickname_success() throws Exception {
        //given
        byte[] bytes = Files.readAllBytes(Paths.get("./src/test/resources/static/testImg.jpg"));
        MultipartFile multipartFile = new MockMultipartFile("profileImageFile", "testImg.jpg", "image/jpeg", bytes);
        UserUpdateRequest userUpdateRequest = new UserUpdateRequest("우기", multipartFile);

        UserResponse updatedUserResponse = UserResponse.builder()
            .id(1L)
            .nickName("우기")
            .type("SocialLoginUser")
            .profileImageUrl("https://darass/image")
            .createdDate(LocalDateTime.now())
            .modifiedDate(LocalDateTime.now())
            .build();

        given(userService.update(1L, userUpdateRequest)).willReturn(updatedUserResponse);

        MockMultipartHttpServletRequestBuilder multipart = (MockMultipartHttpServletRequestBuilder) multipart(
            "/api/v1/users")
            .with(request -> {
                request.setMethod(HttpMethod.PATCH.toString());
                return request;
            });

        //when
        ResultActions resultActions = this.mockMvc.perform(multipart.file((MockMultipartFile) userUpdateRequest.getProfileImageFile())
            .param("nickName", userUpdateRequest.getNickName())
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + ACCESS_TOKEN)
            .cookie(new Cookie("refreshToken", REFRESH_TOKEN)));

        //then
        resultActions
            .andExpect(status().isOk())
            .andDo(
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
                        fieldWithPath("profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지")
                    ))
            );
    }

    @DisplayName("유저를 삭제한다.")
    @Test
    void deleteUser_success() throws Exception {
        //given
        doNothing().when(userService).deleteById(1L);

        //when
        ResultActions resultActions = this.mockMvc.perform(delete("/api/v1/users")
            .contentType(MediaType.APPLICATION_JSON)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + ACCESS_TOKEN)
            .cookie(new Cookie("refreshToken", REFRESH_TOKEN)));

        //then
        resultActions.andDo(
            document("api/v1/users/delete/success",
                requestHeaders(
                    headerWithName("Authorization").description("JWT - Bearer 토큰")
                )
            ));

    }

    @DisplayName("유효한 게스트 유저의 비밀 번호 일치여부를 조회한다.")
    @Test
    void checkGuestUserPassword() throws Exception {
        //given
        PasswordCheckRequest passwordCheckRequest = new PasswordCheckRequest(1L, "password");
        PasswordCheckResponse passwordCheckResponse = new PasswordCheckResponse(true);

        given(userService.checkGuestUserPassword(passwordCheckRequest)).willReturn(passwordCheckResponse);
        given(oAuthService.findSocialLoginUserByAccessToken(ACCESS_TOKEN)).willReturn(SOCIAL_LOGIN_USER);

        //when
        ResultActions resultActions =  this.mockMvc.perform(get("/api/v1/users" + "/check-password")
            .contentType(MediaType.APPLICATION_JSON)
            .param("guestUserId", "1")
            .param("guestUserPassword", "password")
        );

        String responseJson = resultActions.andReturn().getResponse().getContentAsString();
        Boolean result = new ObjectMapper()
            .readValue(responseJson, PasswordCheckResponse.class).getIsCorrectPassword();
        assertThat(result).isTrue();

        //then
        resultActions.andExpect(status().isOk())
            .andDo(
                document("api/v1/users/get/password-check-correct",
                    requestParameters(
                        parameterWithName("guestUserId").description("검증하려는 비로그인 유저 id"),
                        parameterWithName("guestUserPassword").description("검증하려는 비밀번호")
                    ),
                    responseFields(
                        fieldWithPath("isCorrectPassword").type(JsonFieldType.BOOLEAN).description("비밀번호 일치 여부")
                    ))
            );
    }

}

