package com.darass.comment.acceptance;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.relaxedRequestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.relaxedResponseFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.darass.MockSpringContainerTest;
import com.darass.SpringContainerTest;
import com.darass.auth.infrastructure.JwtTokenProvider;
import com.darass.comment.dto.CommentCreateRequest;
import com.darass.comment.dto.CommentReadSecretCommentRequest;
import com.darass.comment.dto.CommentResponse;
import com.darass.comment.dto.CommentResponses;
import com.darass.comment.dto.CommentUpdateRequest;
import com.darass.commentalarm.domain.CommentAlarmMachine;
import com.darass.exception.ExceptionWithMessageAndCode;
import com.darass.project.domain.Project;
import com.darass.project.repository.ProjectRepository;
import com.darass.user.domain.SocialLoginUser;
import com.darass.user.dto.UserResponse;
import com.darass.user.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDate;
import java.util.stream.IntStream;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

@DisplayName("Comment 인수 테스트")
class CommentAcceptanceTest extends MockSpringContainerTest {

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserRepository users;

    @Autowired
    private ProjectRepository projects;

    private SocialLoginUser admin;

    private SocialLoginUser socialLoginUser;

    private Project project;

    private String adminToken;

    private String token;

    private String secretKey;

    private void setUpProject() {
        project = Project.builder()
            .name("project")
            .user(admin)
            .build();
        projects.save(project);
        secretKey = project.getSecretKey();
    }

    private void setUpUser() {
        admin = SocialLoginUser
            .builder()
            .nickName("admin")
            .oauthId("abc22g")
            .oauthProvider("kakao")
            .email("admind1445@naver.com")
            .profileImageUrl("https://imageUrl")
            .refreshToken("refreshToken")
            .build();
        users.save(admin);

        socialLoginUser = SocialLoginUser
            .builder()
            .nickName("nickname")
            .oauthId("abc13gag")
            .oauthProvider("kakao")
            .email("qkrwotjd1445@naver.com")
            .profileImageUrl("https://imageUrl")
            .refreshToken("refreshToken")
            .build();
        users.save(socialLoginUser);

        adminToken = jwtTokenProvider.createAccessToken(admin);
        token = jwtTokenProvider.createAccessToken(socialLoginUser);
    }

    @BeforeEach
    void setUp() {
        doNothing().when(commentAlarmMachine).sendMessage(any());

        setUpUser();
        setUpProject();
    }

    @DisplayName("소셜 로그인 유저가 댓글을 등록한다.")
    @Test
    void saveLoginUser() throws Exception {
        소셜_로그인_댓글_등록됨("content", "url").andDo(

            document("api/v1/comments/post/success-login-user",
                requestHeaders(
                    headerWithName("Authorization").description("JWT - Bearer 토큰")
                ),
                relaxedRequestFields(
                    fieldWithPath("projectSecretKey").type(JsonFieldType.STRING)
                        .description("프로젝트 시크릿 키"),
                    fieldWithPath("content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("url").type(JsonFieldType.STRING).description("url"),
                    fieldWithPath("secret").type(JsonFieldType.BOOLEAN).description("댓글의 공개/비공개 여부")
                ),
                responseFields(
                    fieldWithPath("id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("url").type(JsonFieldType.STRING).description("댓글이 있는 url"),
                    fieldWithPath("createdDate").type(JsonFieldType.STRING).description("댓글 생성 시점"),
                    fieldWithPath("modifiedDate").type(JsonFieldType.STRING)
                        .description("댓글 수정 시점"),
                    fieldWithPath("secret").type(JsonFieldType.BOOLEAN).description("댓글의 공개/비공개 여부"),
                    fieldWithPath("readable").type(JsonFieldType.BOOLEAN).description("댓글 조회 가능 여부"),
                    fieldWithPath("likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
                    fieldWithPath("user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                    fieldWithPath("user.createdDate").type(JsonFieldType.STRING)
                        .description("유저 생성 시점"),
                    fieldWithPath("user.modifiedDate").type(JsonFieldType.STRING)
                        .description("유저 수정 시점"),
                    fieldWithPath("user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                    fieldWithPath("user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                    fieldWithPath("user.type").type(JsonFieldType.STRING).description("유저 유형"),
                    fieldWithPath("user.profileImageUrl").type(JsonFieldType.STRING)
                        .description("유저 프로필 이미지"),
                    fieldWithPath("user.hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부"),
                    fieldWithPath("subComments[]").type(JsonFieldType.ARRAY).description("대댓글 정보")
                ))
        );
    }

    @DisplayName("비로그인 유저가 댓글을 등록한다.")
    @Test
    void saveGuestUser() throws Exception {
        비로그인_댓글_등록됨("content", "url").andDo(
            document("api/v1/comments/post/success-guest-user",
                requestFields(
                    fieldWithPath("guestNickName").type(JsonFieldType.STRING)
                        .description("비로그인 유저 닉네입"),
                    fieldWithPath("guestPassword").type(JsonFieldType.STRING)
                        .description("비로그인 유저 비밀번호"),
                    fieldWithPath("parentId").optional().type(JsonFieldType.NUMBER)
                        .description("부모 댓글 id"),
                    fieldWithPath("projectSecretKey").type(JsonFieldType.STRING)
                        .description("프로젝트 시크릿 키"),
                    fieldWithPath("content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("url").type(JsonFieldType.STRING).description("url"),
                    fieldWithPath("secret").type(JsonFieldType.BOOLEAN).description("댓글의 공개/비공개 여부")
                ),
                relaxedResponseFields(
                    fieldWithPath("id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("createdDate").type(JsonFieldType.STRING).description("댓글 생성 시점"),
                    fieldWithPath("modifiedDate").type(JsonFieldType.STRING)
                        .description("댓글 수정 시점"),
                    fieldWithPath("secret").type(JsonFieldType.BOOLEAN).description("댓글의 공개/비공개 여부"),
                    fieldWithPath("readable").type(JsonFieldType.BOOLEAN).description("댓글 조회 가능 여부"),
                    fieldWithPath("likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
                    fieldWithPath("user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                    fieldWithPath("user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                    fieldWithPath("user.createdDate").type(JsonFieldType.STRING)
                        .description("유저 생성 시점"),
                    fieldWithPath("user.modifiedDate").type(JsonFieldType.STRING)
                        .description("유저 수정 시점"),
                    fieldWithPath("user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                    fieldWithPath("user.type").type(JsonFieldType.STRING).description("유저 유형"),
                    fieldWithPath("user.hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부"),
                    fieldWithPath("subComments[]").type(JsonFieldType.ARRAY).description("대댓글 정보")
                ))
        );
    }

    @DisplayName("프로젝트 시크릿 키 존재하지 않다면 댓글을 등록할 수 없다.")
    @Test
    void saveWithInvalidSecretKey() throws Exception {
        mockMvc.perform(post("/api/v1/comments")
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(
                new CommentCreateRequest("guest", "password", null, "invalidKey", "content", "url"))))
            .andExpect(status().isNotFound())
            .andExpect(jsonPath("$.code").value(700))
            .andDo(
                document("api/v1/comments/post/fail-missing-project-key",
                    responseFields(
                        fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                        fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                    ))
            );
    }

    @DisplayName("제한 길이를 초과하는 댓글을 등록할 수 없다.")
    @Test
    void saveWithInvalidContentLength() throws Exception {
        StringBuilder stringBuilder = new StringBuilder();
        IntStream.rangeClosed(0, 1000)
            .forEach(it -> stringBuilder.append("str"));

        mockMvc.perform(post("/api/v1/comments")
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(
                new CommentCreateRequest("guest", "password", null, secretKey,
                    stringBuilder.toString(), "url"))))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.code").value(ExceptionWithMessageAndCode.INVALID_INPUT_LENGTH.findCode()))
            .andDo(
                document("api/v1/comments/post/fail-invalid-content-length",
                    responseFields(
                        fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                        fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                    ))
            );
    }

    @DisplayName("제한 길이를 초과하는 닉네임, 비밀번호로 댓글을 등록할 수 없다.")
    @Test
    void saveWithInvalidGuestUserLength() throws Exception {
        String invalidNickName = "invalid_nickName_invalid_nickName_invalid_nickName_invalid_nickName";
        String invalidPassword = "invalid_password_invalid_password_invalid_password_invalid_password";

        mockMvc.perform(post("/api/v1/comments")
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(
                new CommentCreateRequest(invalidNickName, invalidPassword, null, secretKey,
                    "content", "url"))))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.code").value(ExceptionWithMessageAndCode.INVALID_INPUT_LENGTH.findCode()))
            .andDo(
                document("api/v1/comments/post/fail-invalid-content-length",
                    responseFields(
                        fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                        fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                    ))
            );
    }

    private ResultActions 소셜_로그인_대댓글_등록됨(String content, String url, Long parentId, boolean secret) throws Exception {

        ResultActions subCommentPostResult = mockMvc.perform(post("/api/v1/comments")
            .contentType(MediaType.APPLICATION_JSON)
            .header("Authorization", "Bearer " + token)
            .header("Cookie", "refreshToken=refreshToken")
            .content(asJsonString(new CommentCreateRequest(null, null, parentId, secretKey, content, url, secret))))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.user..type").value("SocialLoginUser"));

        String contentAsString = mockMvc.perform(get("/api/v1/comments")
            .header("Authorization", "Bearer " + token)
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .param("url", url)
            .param("projectKey", secretKey))
            .andExpect(status().isOk())
            .andReturn().getResponse().getContentAsString();
        CommentResponses commentResponses = new ObjectMapper().readValue(contentAsString, CommentResponses.class);

        CommentResponse commentResponse = commentResponses.getComments().stream()
            .filter(it -> it.getId().equals(parentId))
            .findAny()
            .orElseGet(CommentResponse::new);

        assertThat(commentResponse.getSubComments()).isNotEmpty();

        return subCommentPostResult;
    }

    private CommentResponse 소셜_로그인_대댓글_등록됨_Response_반환(String content, String url, Long parentId) throws Exception {
        String responseJson = 소셜_로그인_대댓글_등록됨(content, url, parentId, false).andReturn().getResponse()
            .getContentAsString();
        return new ObjectMapper().readValue(responseJson, CommentResponse.class);
    }

    @DisplayName("소셜 로그인 유저가 댓글을 대댓글로 등록한다.")
    @Test
    void saveSubCommentLoginUser() throws Exception {
        CommentResponse commentResponse = 소셜_로그인_댓글_등록됨_Response_반환("content", "url");
        Long parentId = commentResponse.getId();

        소셜_로그인_대댓글_등록됨("content", "url", parentId, false).andDo(

            document("api/v1/comments/post/sub-comments/success-login-user",
                requestHeaders(
                    headerWithName("Authorization").description("JWT - Bearer 토큰")
                ),
                relaxedRequestFields(
                    fieldWithPath("parentId").type(JsonFieldType.NUMBER)
                        .description("부모 댓글 id"),
                    fieldWithPath("projectSecretKey").type(JsonFieldType.STRING)
                        .description("프로젝트 시크릿 키"),
                    fieldWithPath("content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("url").type(JsonFieldType.STRING).description("url"),
                    fieldWithPath("secret").type(JsonFieldType.BOOLEAN).description("댓글의 공개/비공개 여부")
                ),
                responseFields(
                    fieldWithPath("id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("url").type(JsonFieldType.STRING).description("댓글이 있는 url"),
                    fieldWithPath("createdDate").type(JsonFieldType.STRING).description("댓글 생성 시점"),
                    fieldWithPath("modifiedDate").type(JsonFieldType.STRING).description("댓글 수정 시점"),
                    fieldWithPath("secret").type(JsonFieldType.BOOLEAN).description("댓글의 공개/비공개 여부"),
                    fieldWithPath("readable").type(JsonFieldType.BOOLEAN).description("댓글 조회 가능 여부"),
                    fieldWithPath("likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
                    fieldWithPath("user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                    fieldWithPath("user.createdDate").type(JsonFieldType.STRING).description("유저 생성 시점"),
                    fieldWithPath("user.modifiedDate").type(JsonFieldType.STRING).description("유저 수정 시점"),
                    fieldWithPath("user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                    fieldWithPath("user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                    fieldWithPath("user.type").type(JsonFieldType.STRING).description("유저 유형"),
                    fieldWithPath("user.profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지"),
                    fieldWithPath("user.hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부"),
                    fieldWithPath("subComments[]").type(JsonFieldType.ARRAY).description("대댓글 정보")
                ))
        );
    }

    @DisplayName("대댓글에 댓글을 달 수 없다.")
    @Test
    void saveSubCommentLoginUserFail() throws Exception {
        CommentResponse commentResponse = 소셜_로그인_댓글_등록됨_Response_반환("content", "url");
        Long parentId = commentResponse.getId();

        String responseJson = 소셜_로그인_대댓글_등록됨("content", "url", parentId, false).andReturn().getResponse().getContentAsString();
        CommentResponse subCommentResponse = new ObjectMapper().readValue(responseJson, CommentResponse.class);

        소셜_로그인_대댓글_등록_실패됨("content", "url", subCommentResponse.getId())
            .andDo(document("api/v1/comments/post/sub-comments/fail-login-user",
                responseFields(
                    fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                    fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                )
            ));
    }

    private ResultActions 소셜_로그인_대댓글_등록_실패됨(String content, String url, Long parentId) throws Exception {
        return mockMvc.perform(post("/api/v1/comments")
            .contentType(MediaType.APPLICATION_JSON)
            .header("Authorization", "Bearer " + token)
            .content(asJsonString(new CommentCreateRequest(null, null, parentId, secretKey, content, url))))
            .andExpect(status().isBadRequest());
    }

    @DisplayName("비로그인 유저가 특정 URL의 댓글을 최신순으로 조회한다.")
    @Test
    void readOrderByLatest_guest_user() throws Exception {
        비로그인_댓글_등록됨("content1", "url", true);
        비로그인_댓글_등록됨("content2", "url", true);
        비로그인_댓글_등록됨("content3", "url", true);
        비로그인_댓글_등록됨("content4", "url");
        비로그인_댓글_등록됨("content5", "url");
        소셜_로그인_댓글_등록됨("content6", "url");
        소셜_로그인_댓글_등록됨("content7", "url");
        소셜_로그인_댓글_등록됨("content8", "url", true);
        소셜_로그인_댓글_등록됨("content9", "url", true);
        소셜_로그인_댓글_등록됨("content10", "url", true);

        mockMvc.perform(get("/api/v1/comments")
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .param("sortOption", "LATEST")
            .param("url", "url")
            .param("projectKey", secretKey))
            .andExpect(status().isOk())
            .andDo(document("api/v1/comments/get/latest/guest-user/success",
                requestParameters(
                    parameterWithName("sortOption").description("정렬 방식"),
                    parameterWithName("url").description("조회 url"),
                    parameterWithName("projectKey").description("프로젝트 시크릿 키")
                ),
                responseFields(
                    fieldWithPath("totalComment").type(JsonFieldType.NUMBER).description("댓글의 총 개수"),
                    fieldWithPath("totalPage").type(JsonFieldType.NUMBER).description("페이지의 총 개수"),
                    fieldWithPath("comments.[].createdDate").type(JsonFieldType.STRING).description("댓글 생성 시점"),
                    fieldWithPath("comments.[].modifiedDate").type(JsonFieldType.STRING).description("댓글 수정 시점"),
                    fieldWithPath("comments.[].id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("comments.[].content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("comments.[].url").type(JsonFieldType.STRING).description("댓글이 있는 url"),
                    fieldWithPath("comments.[].secret").type(JsonFieldType.BOOLEAN).description("댓글의 공개/비공개 여부"),
                    fieldWithPath("comments.[].readable").type(JsonFieldType.BOOLEAN).description("댓글 조회 가능 여부"),
                    fieldWithPath("comments.[].likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
                    fieldWithPath("comments.[].user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                    fieldWithPath("comments.[].user.createdDate").type(JsonFieldType.STRING).description("유저 생성 시점"),
                    fieldWithPath("comments.[].user.modifiedDate").type(JsonFieldType.STRING).description("유저 수정 시점"),
                    fieldWithPath("comments.[].user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                    fieldWithPath("comments.[].user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                    fieldWithPath("comments.[].user.type").type(JsonFieldType.STRING).description("유저 타입"),
                    fieldWithPath("comments.[].user.profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지"),
                    fieldWithPath("comments.[].user.hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부"),
                    fieldWithPath("comments.[].subComments[]").type(JsonFieldType.ARRAY).description("대댓글 정보")
                )
            ));
    }

    @DisplayName("로그인 유저가 특정 URL의 댓글을 최신순으로 조회한다.")
    @Test
    void readOrderByLatest_social_login_user() throws Exception {
        비로그인_댓글_등록됨("content1", "url", true);
        비로그인_댓글_등록됨("content2", "url", true);
        비로그인_댓글_등록됨("content3", "url", true);
        비로그인_댓글_등록됨("content4", "url");
        비로그인_댓글_등록됨("content5", "url");
        소셜_로그인_댓글_등록됨("content6", "url");
        소셜_로그인_댓글_등록됨("content7", "url");
        소셜_로그인_댓글_등록됨("content8", "url", true);
        소셜_로그인_댓글_등록됨("content9", "url", true);
        소셜_로그인_댓글_등록됨("content10", "url", true);

        mockMvc.perform(get("/api/v1/comments")
            .header("Authorization", "Bearer " + token)
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .param("sortOption", "LATEST")
            .param("url", "url")
            .param("projectKey", secretKey))
            .andExpect(status().isOk())
            .andDo(document("api/v1/comments/get/latest/login-user/success",
                requestParameters(
                    parameterWithName("sortOption").description("정렬 방식"),
                    parameterWithName("url").description("조회 url"),
                    parameterWithName("projectKey").description("프로젝트 시크릿 키")
                ),
                responseFields(
                    fieldWithPath("totalComment").type(JsonFieldType.NUMBER).description("댓글의 총 개수"),
                    fieldWithPath("totalPage").type(JsonFieldType.NUMBER).description("페이지의 총 개수"),
                    fieldWithPath("comments.[].createdDate").type(JsonFieldType.STRING).description("댓글 생성 시점"),
                    fieldWithPath("comments.[].modifiedDate").type(JsonFieldType.STRING).description("댓글 수정 시점"),
                    fieldWithPath("comments.[].id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("comments.[].content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("comments.[].url").type(JsonFieldType.STRING).description("댓글이 있는 url"),
                    fieldWithPath("comments.[].secret").type(JsonFieldType.BOOLEAN).description("댓글의 공개/비공개 여부"),
                    fieldWithPath("comments.[].readable").type(JsonFieldType.BOOLEAN).description("댓글 조회 가능 여부"),
                    fieldWithPath("comments.[].likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
                    fieldWithPath("comments.[].user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                    fieldWithPath("comments.[].user.createdDate").type(JsonFieldType.STRING).description("유저 생성 시점"),
                    fieldWithPath("comments.[].user.modifiedDate").type(JsonFieldType.STRING).description("유저 수정 시점"),
                    fieldWithPath("comments.[].user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                    fieldWithPath("comments.[].user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                    fieldWithPath("comments.[].user.type").type(JsonFieldType.STRING).description("유저 타입"),
                    fieldWithPath("comments.[].user.profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지"),
                    fieldWithPath("comments.[].user.hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부"),
                    fieldWithPath("comments.[].subComments[]").type(JsonFieldType.ARRAY).description("대댓글 정보")
                )
            ));
    }

    @DisplayName("관리자가 특정 URL의 댓글을 최신순으로 조회한다.")
    @Test
    void readOrderByLatest_admin() throws Exception {
        비로그인_댓글_등록됨("content1", "url", true);
        비로그인_댓글_등록됨("content2", "url", true);
        비로그인_댓글_등록됨("content3", "url", true);
        비로그인_댓글_등록됨("content4", "url");
        비로그인_댓글_등록됨("content5", "url");
        소셜_로그인_댓글_등록됨("content6", "url");
        소셜_로그인_댓글_등록됨("content7", "url");
        소셜_로그인_댓글_등록됨("content8", "url", true);
        소셜_로그인_댓글_등록됨("content9", "url", true);
        소셜_로그인_댓글_등록됨("content10", "url", true);

        mockMvc.perform(get("/api/v1/comments")
            .header("Authorization", "Bearer " + adminToken)
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .param("sortOption", "LATEST")
            .param("url", "url")
            .param("projectKey", secretKey))
            .andExpect(status().isOk())
            .andDo(document("api/v1/comments/get/latest/admin/success",
                requestParameters(
                    parameterWithName("sortOption").description("정렬 방식"),
                    parameterWithName("url").description("조회 url"),
                    parameterWithName("projectKey").description("프로젝트 시크릿 키")
                ),
                responseFields(
                    fieldWithPath("totalComment").type(JsonFieldType.NUMBER).description("댓글의 총 개수"),
                    fieldWithPath("totalPage").type(JsonFieldType.NUMBER).description("페이지의 총 개수"),
                    fieldWithPath("comments.[].createdDate").type(JsonFieldType.STRING).description("댓글 생성 시점"),
                    fieldWithPath("comments.[].modifiedDate").type(JsonFieldType.STRING).description("댓글 수정 시점"),
                    fieldWithPath("comments.[].id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("comments.[].content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("comments.[].url").type(JsonFieldType.STRING).description("댓글이 있는 url"),
                    fieldWithPath("comments.[].secret").type(JsonFieldType.BOOLEAN).description("댓글의 공개/비공개 여부"),
                    fieldWithPath("comments.[].readable").type(JsonFieldType.BOOLEAN).description("댓글 조회 가능 여부"),
                    fieldWithPath("comments.[].likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
                    fieldWithPath("comments.[].user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                    fieldWithPath("comments.[].user.createdDate").type(JsonFieldType.STRING).description("유저 생성 시점"),
                    fieldWithPath("comments.[].user.modifiedDate").type(JsonFieldType.STRING).description("유저 수정 시점"),
                    fieldWithPath("comments.[].user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                    fieldWithPath("comments.[].user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                    fieldWithPath("comments.[].user.type").type(JsonFieldType.STRING).description("유저 타입"),
                    fieldWithPath("comments.[].user.profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지"),
                    fieldWithPath("comments.[].user.hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부"),
                    fieldWithPath("comments.[].subComments[]").type(JsonFieldType.ARRAY).description("대댓글 정보")
                )
            ));
    }

    @DisplayName("비로그인 유저가 특정 URL의 댓글과 그 댓글의 비밀 대댓글이 달린 상태를 조회한다.")
    @Test
    void readIncludingSubComment_guest_user() throws Exception {
        CommentResponse commentResponse = 비로그인_댓글_등록됨_Response_반환("content", "url");
        소셜_로그인_대댓글_등록됨("subContent", "url", commentResponse.getId(), true);

        mockMvc.perform(get("/api/v1/comments")
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .param("sortOption", "LATEST")
            .param("url", "url")
            .param("projectKey", secretKey))
            .andExpect(status().isOk())
            .andDo(document("api/v1/comments/get/sub-comment/guest-user/success",
                requestParameters(
                    parameterWithName("sortOption").description("정렬 방식"),
                    parameterWithName("url").description("조회 url"),
                    parameterWithName("projectKey").description("프로젝트 시크릿 키")
                ),
                responseFields(
                    fieldWithPath("totalComment").type(JsonFieldType.NUMBER).description("댓글의 총 개수"),
                    fieldWithPath("totalPage").type(JsonFieldType.NUMBER).description("페이지의 총 개수"),
                    fieldWithPath("comments.[].createdDate").type(JsonFieldType.STRING).description("댓글 생성 시점"),
                    fieldWithPath("comments.[].modifiedDate").type(JsonFieldType.STRING).description("댓글 수정 시점"),
                    fieldWithPath("comments.[].id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("comments.[].content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("comments.[].url").type(JsonFieldType.STRING).description("댓글이 있는 url"),
                    fieldWithPath("comments.[].secret").type(JsonFieldType.BOOLEAN).description("댓글 공개/비공개 여부"),
                    fieldWithPath("comments.[].readable").type(JsonFieldType.BOOLEAN).description("댓글 조회 가능 여부"),
                    fieldWithPath("comments.[].likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
                    fieldWithPath("comments.[].user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                    fieldWithPath("comments.[].user.createdDate").type(JsonFieldType.STRING).description("유저 생성 시점"),
                    fieldWithPath("comments.[].user.modifiedDate").type(JsonFieldType.STRING).description("유저 수정 시점"),
                    fieldWithPath("comments.[].user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                    fieldWithPath("comments.[].user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                    fieldWithPath("comments.[].user.type").type(JsonFieldType.STRING).description("유저 타입"),
                    fieldWithPath("comments.[].user.profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지"),
                    fieldWithPath("comments.[].user.hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부"),
                    fieldWithPath("comments.[].subComments[]").type(JsonFieldType.ARRAY).description("대댓글 정보"),
                    fieldWithPath("comments.[].subComments[].createdDate").type(JsonFieldType.STRING).description("대댓글 생성 시점"),
                    fieldWithPath("comments.[].subComments[].modifiedDate").type(JsonFieldType.STRING).description("대댓글 수정 시점"),
                    fieldWithPath("comments.[].subComments[].id").type(JsonFieldType.NUMBER).description("대댓글 id"),
                    fieldWithPath("comments.[].subComments[].content").type(JsonFieldType.STRING).description("대댓글 내용"),
                    fieldWithPath("comments.[].subComments[].url").type(JsonFieldType.STRING).description("대댓글이 있는 url"),
                    fieldWithPath("comments.[].subComments[].secret").type(JsonFieldType.BOOLEAN).description("대댓글 공개/비공개 여부"),
                    fieldWithPath("comments.[].subComments[].readable").type(JsonFieldType.BOOLEAN).description("대댓글 조회 가능 여부"),
                    fieldWithPath("comments.[].subComments[].likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
                    fieldWithPath("comments.[].subComments[].user").type(JsonFieldType.OBJECT).description("대댓글 작성 유저 정보"),
                    fieldWithPath("comments.[].subComments[].user.createdDate").type(JsonFieldType.STRING).description("유저 생성 시점"),
                    fieldWithPath("comments.[].subComments[].user.modifiedDate").type(JsonFieldType.STRING).description("유저 수정 시점"),
                    fieldWithPath("comments.[].subComments[].user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                    fieldWithPath("comments.[].subComments[].user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                    fieldWithPath("comments.[].subComments[].user.type").type(JsonFieldType.STRING).description("유저 타입"),
                    fieldWithPath("comments.[].subComments[].user.profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지"),
                    fieldWithPath("comments.[].subComments[].user.hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부"))
            ));
    }

    @DisplayName("로그인 유저가 특정 URL의 댓글과 그 댓글의 비밀 대댓글이 달린 상태를 조회한다.")
    @Test
    void readIncludingSubComment_login_user() throws Exception {
        CommentResponse commentResponse = 소셜_로그인_댓글_등록됨_Response_반환("content", "url");
        소셜_로그인_대댓글_등록됨("subContent", "url", commentResponse.getId(), true);

        mockMvc.perform(get("/api/v1/comments")
            .header("Authorization", "Bearer " + token)
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .param("sortOption", "LATEST")
            .param("url", "url")
            .param("projectKey", secretKey))
            .andExpect(status().isOk())
            .andDo(document("api/v1/comments/get/sub-comment/login-user/success",
                requestParameters(
                    parameterWithName("sortOption").description("정렬 방식"),
                    parameterWithName("url").description("조회 url"),
                    parameterWithName("projectKey").description("프로젝트 시크릿 키")
                ),
                responseFields(
                    fieldWithPath("totalComment").type(JsonFieldType.NUMBER).description("댓글의 총 개수"),
                    fieldWithPath("totalPage").type(JsonFieldType.NUMBER).description("페이지의 총 개수"),
                    fieldWithPath("comments.[].createdDate").type(JsonFieldType.STRING).description("댓글 생성 시점"),
                    fieldWithPath("comments.[].modifiedDate").type(JsonFieldType.STRING).description("댓글 수정 시점"),
                    fieldWithPath("comments.[].id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("comments.[].content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("comments.[].url").type(JsonFieldType.STRING).description("댓글이 있는 url"),
                    fieldWithPath("comments.[].secret").type(JsonFieldType.BOOLEAN).description("댓글 공개/비공개 여부"),
                    fieldWithPath("comments.[].readable").type(JsonFieldType.BOOLEAN).description("댓글 조회 가능 여부"),
                    fieldWithPath("comments.[].likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
                    fieldWithPath("comments.[].user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                    fieldWithPath("comments.[].user.createdDate").type(JsonFieldType.STRING).description("유저 생성 시점"),
                    fieldWithPath("comments.[].user.modifiedDate").type(JsonFieldType.STRING).description("유저 수정 시점"),
                    fieldWithPath("comments.[].user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                    fieldWithPath("comments.[].user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                    fieldWithPath("comments.[].user.type").type(JsonFieldType.STRING).description("유저 타입"),
                    fieldWithPath("comments.[].user.profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지"),
                    fieldWithPath("comments.[].user.hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부"),
                    fieldWithPath("comments.[].subComments[]").type(JsonFieldType.ARRAY).description("대댓글 정보"),
                    fieldWithPath("comments.[].subComments[].createdDate").type(JsonFieldType.STRING).description("대댓글 생성 시점"),
                    fieldWithPath("comments.[].subComments[].modifiedDate").type(JsonFieldType.STRING).description("대댓글 수정 시점"),
                    fieldWithPath("comments.[].subComments[].id").type(JsonFieldType.NUMBER).description("대댓글 id"),
                    fieldWithPath("comments.[].subComments[].content").type(JsonFieldType.STRING).description("대댓글 내용"),
                    fieldWithPath("comments.[].subComments[].url").type(JsonFieldType.STRING).description("대댓글이 있는 url"),
                    fieldWithPath("comments.[].subComments[].secret").type(JsonFieldType.BOOLEAN).description("대댓글 공개/비공개 여부"),
                    fieldWithPath("comments.[].subComments[].readable").type(JsonFieldType.BOOLEAN).description("대댓글 조회 가능 여부"),
                    fieldWithPath("comments.[].subComments[].likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
                    fieldWithPath("comments.[].subComments[].user").type(JsonFieldType.OBJECT).description("대댓글 작성 유저 정보"),
                    fieldWithPath("comments.[].subComments[].user.createdDate").type(JsonFieldType.STRING).description("유저 생성 시점"),
                    fieldWithPath("comments.[].subComments[].user.modifiedDate").type(JsonFieldType.STRING).description("유저 수정 시점"),
                    fieldWithPath("comments.[].subComments[].user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                    fieldWithPath("comments.[].subComments[].user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                    fieldWithPath("comments.[].subComments[].user.type").type(JsonFieldType.STRING).description("유저 타입"),
                    fieldWithPath("comments.[].subComments[].user.profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지"),
                    fieldWithPath("comments.[].subComments[].user.hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부"))
            ));
    }

    @DisplayName("특정 URL의 댓글을 좋아요순으로 조회한다.")
    @Test
    void readOrderByLike() throws Exception {
        소셜_로그인_댓글_등록됨("content1", "url");

        CommentResponse commentResponse1 = 소셜_로그인_댓글_등록됨_Response_반환("content2", "url");
        소셜_로그인_댓글_좋아요_누름("content2", "url", commentResponse1.getId());

        소셜_로그인_댓글_등록됨("content3", "url");
        소셜_로그인_댓글_등록됨("content4", "url");

        CommentResponse commentResponse5 = 소셜_로그인_댓글_등록됨_Response_반환("content5", "url");
        소셜_로그인_댓글_좋아요_누름("content5", "url", commentResponse5.getId());

        소셜_로그인_댓글_등록됨("content6", "url");
        소셜_로그인_댓글_등록됨("content7", "url");

        CommentResponse commentResponse8 = 소셜_로그인_댓글_등록됨_Response_반환("content8", "url");
        소셜_로그인_댓글_좋아요_누름("content8", "url", commentResponse8.getId());

        CommentResponse commentResponse9 = 소셜_로그인_댓글_등록됨_Response_반환("content9", "url");
        소셜_로그인_댓글_좋아요_누름("content9", "url", commentResponse9.getId());

        CommentResponse commentResponse10 = 소셜_로그인_댓글_등록됨_Response_반환("content10", "url");
        소셜_로그인_댓글_좋아요_누름("content5", "url", commentResponse10.getId());

        mockMvc.perform(get("/api/v1/comments")
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .param("sortOption", "LIKE")
            .param("url", "url")
            .param("projectKey", secretKey))
            .andExpect(status().isOk())
            .andDo(document("api/v1/comments/get/like/success",
                requestParameters(
                    parameterWithName("sortOption").description("정렬 방식"),
                    parameterWithName("url").description("조회 url"),
                    parameterWithName("projectKey").description("프로젝트 시크릿 키")
                ),
                responseFields(
                    fieldWithPath("totalComment").type(JsonFieldType.NUMBER).description("댓글의 총 개수"),
                    fieldWithPath("totalPage").type(JsonFieldType.NUMBER).description("페이지의 총 개수"),
                    fieldWithPath("comments.[].createdDate").type(JsonFieldType.STRING).description("댓글 생성 시점"),
                    fieldWithPath("comments.[].modifiedDate").type(JsonFieldType.STRING).description("댓글 수정 시점"),
                    fieldWithPath("comments.[].id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("comments.[].content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("comments.[].url").type(JsonFieldType.STRING).description("댓글이 있는 url"),
                    fieldWithPath("comments.[].secret").type(JsonFieldType.BOOLEAN).description("댓글의 공개/비공개 여부"),
                    fieldWithPath("comments.[].readable").type(JsonFieldType.BOOLEAN).description("댓글 조회 가능 여부"),
                    fieldWithPath("comments.[].likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
                    fieldWithPath("comments.[].likingUsers[*].id").type(JsonFieldType.NUMBER).description("좋아요 누른 유저 ID"),
                    fieldWithPath("comments.[].likingUsers[*].nickName").type(JsonFieldType.STRING).description("좋아요 누른 유저 닉네임"),
                    fieldWithPath("comments.[].likingUsers[*].type").type(JsonFieldType.STRING).description("좋아요 누른 유저 타입"),
                    fieldWithPath("comments.[].likingUsers[*].profileImageUrl").type(JsonFieldType.STRING).description("좋아요 누른 유저 이미지 링크"),
                    fieldWithPath("comments.[].likingUsers[*].createdDate").type(JsonFieldType.STRING).description("좋아요 누른 시간"),
                    fieldWithPath("comments.[].likingUsers[*].modifiedDate").type(JsonFieldType.STRING).description("좋아요 수정한 시간"),
                    fieldWithPath("comments.[].likingUsers[*].hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부"),
                    fieldWithPath("comments.[].user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                    fieldWithPath("comments.[].user.createdDate").type(JsonFieldType.STRING).description("유저 생성 시점"),
                    fieldWithPath("comments.[].user.modifiedDate").type(JsonFieldType.STRING).description("유저 수정 시점"),
                    fieldWithPath("comments.[].user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                    fieldWithPath("comments.[].user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                    fieldWithPath("comments.[].user.type").type(JsonFieldType.STRING).description("유저 타입"),
                    fieldWithPath("comments.[].user.profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지"),
                    fieldWithPath("comments.[].user.hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부"),
                    fieldWithPath("comments.[].subComments[]").type(JsonFieldType.ARRAY).description("대댓글 정보")
                )
            ));
    }

    @DisplayName("특정 페이지의 댓글을 과거순으로 조회한다.")
    @Test
    void readOrderByOldest() throws Exception {
        소셜_로그인_댓글_등록됨("content1", "url");
        소셜_로그인_댓글_등록됨("content2", "url");
        소셜_로그인_댓글_등록됨("content3", "url");
        소셜_로그인_댓글_등록됨("content4", "url");
        소셜_로그인_댓글_등록됨("content5", "url");
        소셜_로그인_댓글_등록됨("content6", "url");
        소셜_로그인_댓글_등록됨("content7", "url");
        소셜_로그인_댓글_등록됨("content8", "url");
        소셜_로그인_댓글_등록됨("content9", "url");
        소셜_로그인_댓글_등록됨("content10", "url");

        mockMvc.perform(get("/api/v1/comments")
            .header("Authorization", "Bearer " + token)
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .param("sortOption", "OLDEST")
            .param("url", "url")
            .param("projectKey", secretKey))
            .andExpect(status().isOk())
            .andDo(document("api/v1/comments/get/oldest/success",
                requestParameters(
                    parameterWithName("sortOption").description("정렬 방식"),
                    parameterWithName("url").description("조회 url"),
                    parameterWithName("projectKey").description("프로젝트 시크릿 키")
                ),
                responseFields(
                    fieldWithPath("totalComment").type(JsonFieldType.NUMBER).description("댓글의 총 개수"),
                    fieldWithPath("totalPage").type(JsonFieldType.NUMBER).description("페이지의 총 개수"),
                    fieldWithPath("comments.[].createdDate").type(JsonFieldType.STRING).description("댓글 생성 시점"),
                    fieldWithPath("comments.[].modifiedDate").type(JsonFieldType.STRING).description("댓글 수정 시점"),
                    fieldWithPath("comments.[].id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("comments.[].content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("comments.[].url").type(JsonFieldType.STRING).description("댓글이 있는 url"),
                    fieldWithPath("comments.[].secret").type(JsonFieldType.BOOLEAN).description("댓글의 공개/비공개 여부"),
                    fieldWithPath("comments.[].readable").type(JsonFieldType.BOOLEAN).description("댓글 조회 가능 여부"),
                    fieldWithPath("comments.[].likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
                    fieldWithPath("comments.[].user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                    fieldWithPath("comments.[].user.createdDate").type(JsonFieldType.STRING).description("유저 생성 시점"),
                    fieldWithPath("comments.[].user.modifiedDate").type(JsonFieldType.STRING).description("유저 수정 시점"),
                    fieldWithPath("comments.[].user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                    fieldWithPath("comments.[].user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                    fieldWithPath("comments.[].user.type").type(JsonFieldType.STRING).description("유저 타입"),
                    fieldWithPath("comments.[].user.profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지"),
                    fieldWithPath("comments.[].user.hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부"),
                    fieldWithPath("comments.[].subComments[]").type(JsonFieldType.ARRAY).description("대댓글 정보")
                )
            ));
    }

    @DisplayName("특정 페이지의 댓글을 최신순으로 조회한다.")
    @Test
    void readByPageRequestOrderByLatest() throws Exception {
        소셜_로그인_댓글_등록됨("content1", "url");
        소셜_로그인_댓글_등록됨("content2", "url");
        소셜_로그인_댓글_등록됨("content3", "url");
        소셜_로그인_댓글_등록됨("content4", "url");
        소셜_로그인_댓글_등록됨("content5", "url");
        소셜_로그인_댓글_등록됨("content6", "url");
        소셜_로그인_댓글_등록됨("content7", "url");
        소셜_로그인_댓글_등록됨("content8", "url");
        소셜_로그인_댓글_등록됨("content9", "url");
        소셜_로그인_댓글_등록됨("content10", "url");

        mockMvc.perform(get("/api/v1/comments/paging")
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .param("sortOption", "LATEST")
            .param("url", "url")
            .param("projectKey", secretKey)
            .param("page", "2")
            .param("size", "5"))
            .andExpect(status().isOk())
            .andDo(document("api/v1/comments/paging/get/latest/success",
                requestParameters(
                    parameterWithName("sortOption").description("정렬 방식"),
                    parameterWithName("url").description("조회 url"),
                    parameterWithName("projectKey").description("프로젝트 시크릿 키"),
                    parameterWithName("page").description("페이지"),
                    parameterWithName("size").description("페이지당 댓글의 개수")
                ),
                responseFields(
                    fieldWithPath("totalComment").type(JsonFieldType.NUMBER).description("댓글의 총 개수"),
                    fieldWithPath("totalPage").type(JsonFieldType.NUMBER).description("페이지의 총 개수"),
                    fieldWithPath("comments.[].createdDate").type(JsonFieldType.STRING).description("댓글 생성 시점"),
                    fieldWithPath("comments.[].modifiedDate").type(JsonFieldType.STRING).description("댓글 수정 시점"),
                    fieldWithPath("comments.[].id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("comments.[].content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("comments.[].url").type(JsonFieldType.STRING).description("댓글이 있는 url"),
                    fieldWithPath("comments.[].likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
                    fieldWithPath("comments.[].secret").type(JsonFieldType.BOOLEAN).description("댓글의 공개/비공개 여부"),
                    fieldWithPath("comments.[].readable").type(JsonFieldType.BOOLEAN).description("댓글 조회 가능 여부"),
                    fieldWithPath("comments.[].user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                    fieldWithPath("comments.[].user.createdDate").type(JsonFieldType.STRING).description("유저 생성 시점"),
                    fieldWithPath("comments.[].user.modifiedDate").type(JsonFieldType.STRING).description("유저 수정 시점"),
                    fieldWithPath("comments.[].user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                    fieldWithPath("comments.[].user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                    fieldWithPath("comments.[].user.type").type(JsonFieldType.STRING).description("유저 타입"),
                    fieldWithPath("comments.[].user.profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지"),
                    fieldWithPath("comments.[].user.hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부"),
                    fieldWithPath("comments.[].subComments[]").type(JsonFieldType.ARRAY).description("대댓글 정보")
                )
            ));
    }

    @DisplayName("특정 페이지의 댓글을 좋아요순으로 조회한다.")
    @Test
    void readByPageRequestOrderByLike() throws Exception {
        소셜_로그인_댓글_등록됨("content1", "url");

        CommentResponse commentResponse1 = 소셜_로그인_댓글_등록됨_Response_반환("content2", "url");
        소셜_로그인_댓글_좋아요_누름("content2", "url", commentResponse1.getId());

        소셜_로그인_댓글_등록됨("content3", "url");
        소셜_로그인_댓글_등록됨("content4", "url");

        CommentResponse commentResponse5 = 소셜_로그인_댓글_등록됨_Response_반환("content5", "url");
        소셜_로그인_댓글_좋아요_누름("content5", "url", commentResponse5.getId());

        소셜_로그인_댓글_등록됨("content6", "url");
        소셜_로그인_댓글_등록됨("content7", "url");

        CommentResponse commentResponse8 = 소셜_로그인_댓글_등록됨_Response_반환("content8", "url");
        소셜_로그인_댓글_좋아요_누름("content8", "url", commentResponse8.getId());

        CommentResponse commentResponse9 = 소셜_로그인_댓글_등록됨_Response_반환("content9", "url");
        소셜_로그인_댓글_좋아요_누름("content9", "url", commentResponse9.getId());

        CommentResponse commentResponse10 = 소셜_로그인_댓글_등록됨_Response_반환("content10", "url");
        소셜_로그인_댓글_좋아요_누름("content5", "url", commentResponse10.getId());

        mockMvc.perform(get("/api/v1/comments/paging")
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .param("sortOption", "LIKE")
            .param("url", "url")
            .param("projectKey", secretKey)
            .param("page", "1")
            .param("size", "5"))
            .andExpect(status().isOk())
            .andDo(document("api/v1/comments/paging/get/like/success",
                requestParameters(
                    parameterWithName("sortOption").description("정렬 방식"),
                    parameterWithName("url").description("조회 url"),
                    parameterWithName("projectKey").description("프로젝트 시크릿 키"),
                    parameterWithName("page").description("페이지"),
                    parameterWithName("size").description("페이지당 댓글의 개수")
                ),
                responseFields(
                    fieldWithPath("totalComment").type(JsonFieldType.NUMBER).description("댓글의 총 개수"),
                    fieldWithPath("totalPage").type(JsonFieldType.NUMBER).description("페이지의 총 개수"),
                    fieldWithPath("comments.[].createdDate").type(JsonFieldType.STRING).description("댓글 생성 시점"),
                    fieldWithPath("comments.[].modifiedDate").type(JsonFieldType.STRING).description("댓글 수정 시점"),
                    fieldWithPath("comments.[].id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("comments.[].content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("comments.[].url").type(JsonFieldType.STRING).description("댓글이 있는 url"),
                    fieldWithPath("comments.[].secret").type(JsonFieldType.BOOLEAN).description("댓글의 공개/비공개 여부"),
                    fieldWithPath("comments.[].readable").type(JsonFieldType.BOOLEAN).description("댓글 조회 가능 여부"),
                    fieldWithPath("comments.[].likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
                    fieldWithPath("comments.[].likingUsers[*].id").type(JsonFieldType.NUMBER).description("좋아요 누른 유저 ID"),
                    fieldWithPath("comments.[].likingUsers[*].nickName").type(JsonFieldType.STRING)
                        .description("좋아요 누른 유저 닉네임"),
                    fieldWithPath("comments.[].likingUsers[*].type").type(JsonFieldType.STRING).description("좋아요 누른 유저 타입"),
                    fieldWithPath("comments.[].likingUsers[*].profileImageUrl").type(JsonFieldType.STRING)
                        .description("좋아요 누른 유저 이미지 링크"),
                    fieldWithPath("comments.[].likingUsers[*].createdDate").type(JsonFieldType.STRING)
                        .description("좋아요 누른 시간"),
                    fieldWithPath("comments.[].likingUsers[*].modifiedDate").type(JsonFieldType.STRING)
                        .description("좋아요 수정한 시간"),
                    fieldWithPath("comments.[].likingUsers[*].hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부"),
                    fieldWithPath("comments.[].user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                    fieldWithPath("comments.[].user.createdDate").type(JsonFieldType.STRING).description("유저 생성 시점"),
                    fieldWithPath("comments.[].user.modifiedDate").type(JsonFieldType.STRING).description("유저 수정 시점"),
                    fieldWithPath("comments.[].user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                    fieldWithPath("comments.[].user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                    fieldWithPath("comments.[].user.type").type(JsonFieldType.STRING).description("유저 타입"),
                    fieldWithPath("comments.[].user.profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지"),
                    fieldWithPath("comments.[].user.hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부"),
                    fieldWithPath("comments.[].subComments[]").type(JsonFieldType.ARRAY).description("대댓글 정보")
                )
            ));
    }

    @DisplayName("특정 페이지의 댓글을 과거순으로 조회한다.")
    @Test
    void readByPageRequestOrderByOldest() throws Exception {
        소셜_로그인_댓글_등록됨("content1", "url");
        소셜_로그인_댓글_등록됨("content2", "url");
        소셜_로그인_댓글_등록됨("content3", "url");
        소셜_로그인_댓글_등록됨("content4", "url");
        소셜_로그인_댓글_등록됨("content5", "url");
        소셜_로그인_댓글_등록됨("content6", "url");
        소셜_로그인_댓글_등록됨("content7", "url");
        소셜_로그인_댓글_등록됨("content8", "url");
        소셜_로그인_댓글_등록됨("content9", "url");
        소셜_로그인_댓글_등록됨("content10", "url");

        mockMvc.perform(get("/api/v1/comments/paging")
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .param("sortOption", "OLDEST")
            .param("url", "url")
            .param("projectKey", secretKey)
            .param("page", "2")
            .param("size", "5"))
            .andExpect(status().isOk())
            .andDo(document("api/v1/comments/paging/get/oldest/success",
                requestParameters(
                    parameterWithName("sortOption").description("정렬 방식"),
                    parameterWithName("url").description("조회 url"),
                    parameterWithName("projectKey").description("프로젝트 시크릿 키"),
                    parameterWithName("page").description("페이지"),
                    parameterWithName("size").description("페이지당 댓글의 개수")
                ),
                responseFields(
                    fieldWithPath("totalComment").type(JsonFieldType.NUMBER).description("댓글의 총 개수"),
                    fieldWithPath("totalPage").type(JsonFieldType.NUMBER).description("페이지의 총 개수"),
                    fieldWithPath("comments.[].createdDate").type(JsonFieldType.STRING).description("댓글 생성 시점"),
                    fieldWithPath("comments.[].modifiedDate").type(JsonFieldType.STRING).description("댓글 수정 시점"),
                    fieldWithPath("comments.[].id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("comments.[].content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("comments.[].url").type(JsonFieldType.STRING).description("댓글이 있는 url"),
                    fieldWithPath("comments.[].secret").type(JsonFieldType.BOOLEAN).description("댓글의 공개/비공개 여부"),
                    fieldWithPath("comments.[].readable").type(JsonFieldType.BOOLEAN).description("댓글 조회 가능 여부"),
                    fieldWithPath("comments.[].likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
                    fieldWithPath("comments.[].user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                    fieldWithPath("comments.[].user.createdDate").type(JsonFieldType.STRING).description("유저 생성 시점"),
                    fieldWithPath("comments.[].user.modifiedDate").type(JsonFieldType.STRING).description("유저 수정 시점"),
                    fieldWithPath("comments.[].user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                    fieldWithPath("comments.[].user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                    fieldWithPath("comments.[].user.type").type(JsonFieldType.STRING).description("유저 타입"),
                    fieldWithPath("comments.[].user.profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지"),
                    fieldWithPath("comments.[].user.hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부"),
                    fieldWithPath("comments.[].subComments[]").type(JsonFieldType.ARRAY).description("대댓글 정보")
                )
            ));
    }

    @DisplayName("특정 프로젝트에 해당하고, 시작 날짜와 종료 날짜 사이에 있는 임의의 페이지의 댓글을 최신순으로 조회한다.")
    @Test
    void findAllCommentsByProjectKeyUsingPaginationAndDateBetween_latest() throws Exception {
        소셜_로그인_댓글_등록됨("content1", "url");
        소셜_로그인_댓글_등록됨("content2", "url");
        소셜_로그인_댓글_등록됨("content3", "url");
        소셜_로그인_댓글_등록됨("content4", "url");
        소셜_로그인_댓글_등록됨("content5", "url");
        소셜_로그인_댓글_등록됨("content6", "url");
        소셜_로그인_댓글_등록됨("content7", "url");
        소셜_로그인_댓글_등록됨("content8", "url");
        소셜_로그인_댓글_등록됨("content9", "url2");
        소셜_로그인_댓글_등록됨("content10", "url");

        mockMvc.perform(get("/api/v1/projects/comments/paging")
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .param("sortOption", "latest")
            .param("projectKey", secretKey)
            .param("startDate", "2000-01-01")
            .param("endDate", "2030-12-31")
            .param("page", "2")
            .param("size", "5"))
            .andExpect(status().isOk())
            .andDo(document("api/v1/projects/comments/paging/get/latest/success",
                requestParameters(
                    parameterWithName("sortOption").description("정렬 방식"),
                    parameterWithName("projectKey").description("프로젝트 시크릿 키"),
                    parameterWithName("startDate").description("시작 날짜"),
                    parameterWithName("endDate").description("종료 날짜"),
                    parameterWithName("page").description("페이지"),
                    parameterWithName("size").description("페이지당 댓글의 개수")
                ),
                responseFields(
                    fieldWithPath("totalComment").type(JsonFieldType.NUMBER).description("댓글의 총 개수"),
                    fieldWithPath("totalPage").type(JsonFieldType.NUMBER).description("페이지의 총 개수"),
                    fieldWithPath("comments.[].createdDate").type(JsonFieldType.STRING).description("댓글 생성 시점"),
                    fieldWithPath("comments.[].modifiedDate").type(JsonFieldType.STRING).description("댓글 수정 시점"),
                    fieldWithPath("comments.[].id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("comments.[].content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("comments.[].url").type(JsonFieldType.STRING).description("댓글이 있는 url"),
                    fieldWithPath("comments.[].secret").type(JsonFieldType.BOOLEAN).description("댓글의 공개/비공개 여부"),
                    fieldWithPath("comments.[].readable").type(JsonFieldType.BOOLEAN).description("댓글 조회 가능 여부"),
                    fieldWithPath("comments.[].likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
                    fieldWithPath("comments.[].user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                    fieldWithPath("comments.[].user.createdDate").type(JsonFieldType.STRING).description("유저 생성 시점"),
                    fieldWithPath("comments.[].user.modifiedDate").type(JsonFieldType.STRING).description("유저 수정 시점"),
                    fieldWithPath("comments.[].user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                    fieldWithPath("comments.[].user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                    fieldWithPath("comments.[].user.type").type(JsonFieldType.STRING).description("유저 타입"),
                    fieldWithPath("comments.[].user.profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지"),
                    fieldWithPath("comments.[].user.hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부"),
                    fieldWithPath("comments.[].subComments[]").type(JsonFieldType.ARRAY).description("대댓글 정보")
                )
            ));
    }

    @DisplayName("특정 프로젝트에 해당하고, 시작 날짜와 종료 날짜 사이에 있는 임의의 페이지의 댓글을 좋아요순으로 조회한다.")
    @Test
    void findAllCommentsByProjectKeyUsingPaginationAndDateBetween_like() throws Exception {
        소셜_로그인_댓글_등록됨("content1", "url2");

        CommentResponse commentResponse1 = 소셜_로그인_댓글_등록됨_Response_반환("content2", "url");
        소셜_로그인_댓글_좋아요_누름("content2", "url", commentResponse1.getId());

        소셜_로그인_댓글_등록됨("content3", "url");
        소셜_로그인_댓글_등록됨("content4", "url");

        CommentResponse commentResponse5 = 소셜_로그인_댓글_등록됨_Response_반환("content5", "url");
        소셜_로그인_댓글_좋아요_누름("content5", "url", commentResponse5.getId());

        소셜_로그인_댓글_등록됨("content6", "url3");
        소셜_로그인_댓글_등록됨("content7", "url4");

        CommentResponse commentResponse8 = 소셜_로그인_댓글_등록됨_Response_반환("content8", "url");
        소셜_로그인_댓글_좋아요_누름("content8", "url", commentResponse8.getId());

        CommentResponse commentResponse9 = 소셜_로그인_댓글_등록됨_Response_반환("content9", "url");
        소셜_로그인_댓글_좋아요_누름("content9", "url", commentResponse9.getId());

        CommentResponse commentResponse10 = 소셜_로그인_댓글_등록됨_Response_반환("content10", "url");
        소셜_로그인_댓글_좋아요_누름("content5", "url", commentResponse10.getId());

        mockMvc.perform(get("/api/v1/projects/comments/paging")
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .param("sortOption", "like")
            .param("projectKey", secretKey)
            .param("startDate", "2000-01-01")
            .param("endDate", "2030-12-31")
            .param("page", "1")
            .param("size", "5"))
            .andExpect(status().isOk())
            .andDo(document("api/v1/projects/comments/paging/get/like/success",
                requestParameters(
                    parameterWithName("sortOption").description("정렬 방식"),
                    parameterWithName("projectKey").description("프로젝트 시크릿 키"),
                    parameterWithName("startDate").description("시작 날짜"),
                    parameterWithName("endDate").description("종료 날짜"),
                    parameterWithName("page").description("페이지"),
                    parameterWithName("size").description("페이지당 댓글의 개수")
                ),
                responseFields(
                    fieldWithPath("totalComment").type(JsonFieldType.NUMBER).description("댓글의 총 개수"),
                    fieldWithPath("totalPage").type(JsonFieldType.NUMBER).description("페이지의 총 개수"),
                    fieldWithPath("comments.[].createdDate").type(JsonFieldType.STRING).description("댓글 생성 시점"),
                    fieldWithPath("comments.[].modifiedDate").type(JsonFieldType.STRING).description("댓글 수정 시점"),
                    fieldWithPath("comments.[].id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("comments.[].content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("comments.[].url").type(JsonFieldType.STRING).description("댓글이 있는 url"),
                    fieldWithPath("comments.[].secret").type(JsonFieldType.BOOLEAN).description("댓글의 공개/비공개 여부"),
                    fieldWithPath("comments.[].readable").type(JsonFieldType.BOOLEAN).description("댓글 조회 가능 여부"),
                    fieldWithPath("comments.[].likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
                    fieldWithPath("comments.[].likingUsers[*].id").type(JsonFieldType.NUMBER).description("좋아요 누른 유저 ID"),
                    fieldWithPath("comments.[].likingUsers[*].nickName").type(JsonFieldType.STRING)
                        .description("좋아요 누른 유저 닉네임"),
                    fieldWithPath("comments.[].likingUsers[*].type").type(JsonFieldType.STRING).description("좋아요 누른 유저 타입"),
                    fieldWithPath("comments.[].likingUsers[*].profileImageUrl").type(JsonFieldType.STRING)
                        .description("좋아요 누른 유저 이미지 링크"),
                    fieldWithPath("comments.[].likingUsers[*].createdDate").type(JsonFieldType.STRING)
                        .description("좋아요 누른 시간"),
                    fieldWithPath("comments.[].likingUsers[*].modifiedDate").type(JsonFieldType.STRING)
                        .description("좋아요 수정한 시간"),
                    fieldWithPath("comments.[].likingUsers[*].hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부"),
                    fieldWithPath("comments.[].user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                    fieldWithPath("comments.[].user.createdDate").type(JsonFieldType.STRING).description("유저 생성 시점"),
                    fieldWithPath("comments.[].user.modifiedDate").type(JsonFieldType.STRING).description("유저 수정 시점"),
                    fieldWithPath("comments.[].user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                    fieldWithPath("comments.[].user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                    fieldWithPath("comments.[].user.type").type(JsonFieldType.STRING).description("유저 타입"),
                    fieldWithPath("comments.[].user.profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지"),
                    fieldWithPath("comments.[].user.hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부"),
                    fieldWithPath("comments.[].subComments[]").type(JsonFieldType.ARRAY).description("대댓글 정보")
                )
            ));
    }

    @DisplayName("특정 프로젝트에 해당하고, 시작 날짜와 종료 날짜 사이에 있는 임의의 페이지의 댓글을 과거순으로 조회한다.")
    @Test
    void findAllCommentsByProjectKeyUsingPaginationAndDateBetween_oldest() throws Exception {
        소셜_로그인_댓글_등록됨("content1", "url");
        소셜_로그인_댓글_등록됨("content2", "url");
        소셜_로그인_댓글_등록됨("content3", "url");
        소셜_로그인_댓글_등록됨("content4", "url");
        소셜_로그인_댓글_등록됨("content5", "url");
        소셜_로그인_댓글_등록됨("content6", "url");
        소셜_로그인_댓글_등록됨("content7", "url");
        소셜_로그인_댓글_등록됨("content8", "url");
        소셜_로그인_댓글_등록됨("content9", "url2");
        소셜_로그인_댓글_등록됨("content10", "url");

        mockMvc.perform(get("/api/v1/projects/comments/paging")
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .param("sortOption", "oldest")
            .param("projectKey", secretKey)
            .param("startDate", "2000-01-01")
            .param("endDate", "2030-12-31")
            .param("page", "2")
            .param("size", "5"))
            .andExpect(status().isOk())
            .andDo(document("api/v1/projects/comments/paging/get/oldest/success",
                requestParameters(
                    parameterWithName("sortOption").description("정렬 방식"),
                    parameterWithName("projectKey").description("프로젝트 시크릿 키"),
                    parameterWithName("startDate").description("시작 날짜"),
                    parameterWithName("endDate").description("종료 날짜"),
                    parameterWithName("page").description("페이지"),
                    parameterWithName("size").description("페이지당 댓글의 개수")
                ),
                responseFields(
                    fieldWithPath("totalComment").type(JsonFieldType.NUMBER).description("댓글의 총 개수"),
                    fieldWithPath("totalPage").type(JsonFieldType.NUMBER).description("페이지의 총 개수"),
                    fieldWithPath("comments.[].createdDate").type(JsonFieldType.STRING).description("댓글 생성 시점"),
                    fieldWithPath("comments.[].modifiedDate").type(JsonFieldType.STRING).description("댓글 수정 시점"),
                    fieldWithPath("comments.[].id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("comments.[].content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("comments.[].url").type(JsonFieldType.STRING).description("댓글이 있는 url"),
                    fieldWithPath("comments.[].secret").type(JsonFieldType.BOOLEAN).description("댓글의 공개/비공개 여부"),
                    fieldWithPath("comments.[].readable").type(JsonFieldType.BOOLEAN).description("댓글 조회 가능 여부"),
                    fieldWithPath("comments.[].likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
                    fieldWithPath("comments.[].user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                    fieldWithPath("comments.[].user.createdDate").type(JsonFieldType.STRING).description("유저 생성 시점"),
                    fieldWithPath("comments.[].user.modifiedDate").type(JsonFieldType.STRING).description("유저 수정 시점"),
                    fieldWithPath("comments.[].user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                    fieldWithPath("comments.[].user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                    fieldWithPath("comments.[].user.type").type(JsonFieldType.STRING).description("유저 타입"),
                    fieldWithPath("comments.[].user.profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지"),
                    fieldWithPath("comments.[].user.hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부"),
                    fieldWithPath("comments.[].subComments[]").type(JsonFieldType.ARRAY).description("대댓글 정보")
                )
            ));
    }

    @DisplayName("특정 프로젝트에 해당하고, 특정 키워드의 내용이 있는 댓글을 최신순으로 조회한다.")
    @Test
    void findAllCommentsByProjectKeyUsingPaginationAndDateBetweenAndLike_latest() throws Exception {
        소셜_로그인_댓글_등록됨("content1", "url");
        소셜_로그인_댓글_등록됨("content2", "url");
        소셜_로그인_댓글_등록됨("content3", "url");
        소셜_로그인_댓글_등록됨("content4", "url");
        소셜_로그인_댓글_등록됨("content5", "url");
        소셜_로그인_댓글_등록됨("hello6", "url");
        소셜_로그인_댓글_등록됨("hello7", "url");
        소셜_로그인_댓글_등록됨("hello8", "url");
        소셜_로그인_댓글_등록됨("hello9", "url2");
        소셜_로그인_댓글_등록됨("hello10", "url");

        mockMvc.perform(get("/api/v1/projects/comments/search/paging")
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .param("sortOption", "latest")
            .param("projectKey", secretKey)
            .param("startDate", "2000-01-01")
            .param("endDate", "2030-12-31")
            .param("keyword", "content")
            .param("page", "1")
            .param("size", "5"))
            .andExpect(status().isOk())
            .andDo(document("api/v1/projects/comments/search/paging/get/latest/success",
                requestParameters(
                    parameterWithName("sortOption").description("정렬 방식"),
                    parameterWithName("projectKey").description("프로젝트 시크릿 키"),
                    parameterWithName("startDate").description("시작 날짜"),
                    parameterWithName("endDate").description("종료 날짜"),
                    parameterWithName("keyword").description("검색할 댓글의 내용"),
                    parameterWithName("page").description("페이지"),
                    parameterWithName("size").description("페이지당 댓글의 개수")
                ),
                responseFields(
                    fieldWithPath("totalComment").type(JsonFieldType.NUMBER).description("댓글의 총 개수"),
                    fieldWithPath("totalPage").type(JsonFieldType.NUMBER).description("페이지의 총 개수"),
                    fieldWithPath("comments.[].createdDate").type(JsonFieldType.STRING).description("댓글 생성 시점"),
                    fieldWithPath("comments.[].modifiedDate").type(JsonFieldType.STRING).description("댓글 수정 시점"),
                    fieldWithPath("comments.[].id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("comments.[].content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("comments.[].url").type(JsonFieldType.STRING).description("댓글이 있는 url"),
                    fieldWithPath("comments.[].secret").type(JsonFieldType.BOOLEAN).description("댓글의 공개/비공개 여부"),
                    fieldWithPath("comments.[].readable").type(JsonFieldType.BOOLEAN).description("댓글 조회 가능 여부"),
                    fieldWithPath("comments.[].likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
                    fieldWithPath("comments.[].user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                    fieldWithPath("comments.[].user.createdDate").type(JsonFieldType.STRING).description("유저 생성 시점"),
                    fieldWithPath("comments.[].user.modifiedDate").type(JsonFieldType.STRING).description("유저 수정 시점"),
                    fieldWithPath("comments.[].user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                    fieldWithPath("comments.[].user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                    fieldWithPath("comments.[].user.type").type(JsonFieldType.STRING).description("유저 타입"),
                    fieldWithPath("comments.[].user.profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지"),
                    fieldWithPath("comments.[].user.hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부"),
                    fieldWithPath("comments.[].subComments[]").type(JsonFieldType.ARRAY).description("대댓글 정보")
                )
            ));
    }

    @DisplayName("특정 프로젝트에 해당하고, 특정 키워드의 내용이 있는 댓글을 좋아요순으로 조회한다.")
    @Test
    void findAllCommentsByProjectKeyUsingPaginationAndDateBetweenAndLike_like() throws Exception {
        소셜_로그인_댓글_등록됨("hello1", "url2");

        CommentResponse commentResponse1 = 소셜_로그인_댓글_등록됨_Response_반환("content2", "url");
        소셜_로그인_댓글_좋아요_누름("content2", "url", commentResponse1.getId());

        소셜_로그인_댓글_등록됨("hello3", "url");
        소셜_로그인_댓글_등록됨("hello4", "url");

        CommentResponse commentResponse5 = 소셜_로그인_댓글_등록됨_Response_반환("content5", "url");
        소셜_로그인_댓글_좋아요_누름("content5", "url", commentResponse5.getId());

        소셜_로그인_댓글_등록됨("hello6", "url3");
        소셜_로그인_댓글_등록됨("hello7", "url4");

        CommentResponse commentResponse8 = 소셜_로그인_댓글_등록됨_Response_반환("content8", "url");
        소셜_로그인_댓글_좋아요_누름("content8", "url", commentResponse8.getId());

        CommentResponse commentResponse9 = 소셜_로그인_댓글_등록됨_Response_반환("content9", "url");
        소셜_로그인_댓글_좋아요_누름("content9", "url", commentResponse9.getId());

        CommentResponse commentResponse10 = 소셜_로그인_댓글_등록됨_Response_반환("content10", "url");
        소셜_로그인_댓글_좋아요_누름("content5", "url", commentResponse10.getId());

        mockMvc.perform(get("/api/v1/projects/comments/search/paging")
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .param("sortOption", "like")
            .param("projectKey", secretKey)
            .param("startDate", "2000-01-01")
            .param("endDate", "2030-12-31")
            .param("keyword", "content")
            .param("page", "1")
            .param("size", "5"))
            .andExpect(status().isOk())
            .andDo(document("api/v1/projects/comments/search/paging/get/like/success",
                requestParameters(
                    parameterWithName("sortOption").description("정렬 방식"),
                    parameterWithName("projectKey").description("프로젝트 시크릿 키"),
                    parameterWithName("startDate").description("시작 날짜"),
                    parameterWithName("endDate").description("종료 날짜"),
                    parameterWithName("keyword").description("검색할 댓글의 내용"),
                    parameterWithName("page").description("페이지"),
                    parameterWithName("size").description("페이지당 댓글의 개수")
                ),
                responseFields(
                    fieldWithPath("totalComment").type(JsonFieldType.NUMBER).description("댓글의 총 개수"),
                    fieldWithPath("totalPage").type(JsonFieldType.NUMBER).description("페이지의 총 개수"),
                    fieldWithPath("comments.[].createdDate").type(JsonFieldType.STRING).description("댓글 생성 시점"),
                    fieldWithPath("comments.[].modifiedDate").type(JsonFieldType.STRING).description("댓글 수정 시점"),
                    fieldWithPath("comments.[].id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("comments.[].content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("comments.[].url").type(JsonFieldType.STRING).description("댓글이 있는 url"),
                    fieldWithPath("comments.[].secret").type(JsonFieldType.BOOLEAN).description("댓글의 공개/비공개 여부"),
                    fieldWithPath("comments.[].readable").type(JsonFieldType.BOOLEAN).description("댓글 조회 가능 여부"),
                    fieldWithPath("comments.[].likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
                    fieldWithPath("comments.[].likingUsers[*].id").type(JsonFieldType.NUMBER).description("좋아요 누른 유저 ID"),
                    fieldWithPath("comments.[].likingUsers[*].nickName").type(JsonFieldType.STRING)
                        .description("좋아요 누른 유저 닉네임"),
                    fieldWithPath("comments.[].likingUsers[*].type").type(JsonFieldType.STRING).description("좋아요 누른 유저 타입"),
                    fieldWithPath("comments.[].likingUsers[*].profileImageUrl").type(JsonFieldType.STRING)
                        .description("좋아요 누른 유저 이미지 링크"),
                    fieldWithPath("comments.[].likingUsers[*].createdDate").type(JsonFieldType.STRING)
                        .description("좋아요 누른 시간"),
                    fieldWithPath("comments.[].likingUsers[*].modifiedDate").type(JsonFieldType.STRING)
                        .description("좋아요 수정한 시간"),
                    fieldWithPath("comments.[].likingUsers[*].hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부"),
                    fieldWithPath("comments.[].user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                    fieldWithPath("comments.[].user.createdDate").type(JsonFieldType.STRING).description("유저 생성 시점"),
                    fieldWithPath("comments.[].user.modifiedDate").type(JsonFieldType.STRING).description("유저 수정 시점"),
                    fieldWithPath("comments.[].user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                    fieldWithPath("comments.[].user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                    fieldWithPath("comments.[].user.type").type(JsonFieldType.STRING).description("유저 타입"),
                    fieldWithPath("comments.[].user.profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지"),
                    fieldWithPath("comments.[].user.hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부"),
                    fieldWithPath("comments.[].subComments[]").type(JsonFieldType.ARRAY).description("대댓글 정보")
                )
            ));
    }

    @DisplayName("특정 프로젝트에 해당하고, 특정 키워드의 내용이 있는 댓글을 과거순으로 조회한다.")
    @Test
    void findAllCommentsByProjectKeyUsingPaginationAndDateBetweenAndLike_oldest() throws Exception {
        소셜_로그인_댓글_등록됨("content1", "url");
        소셜_로그인_댓글_등록됨("content2", "url");
        소셜_로그인_댓글_등록됨("content3", "url");
        소셜_로그인_댓글_등록됨("content4", "url");
        소셜_로그인_댓글_등록됨("content5", "url");
        소셜_로그인_댓글_등록됨("hello6", "url");
        소셜_로그인_댓글_등록됨("hello7", "url");
        소셜_로그인_댓글_등록됨("hello8", "url");
        소셜_로그인_댓글_등록됨("hello9", "url2");
        소셜_로그인_댓글_등록됨("hello10", "url");

        mockMvc.perform(get("/api/v1/projects/comments/search/paging")
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .param("sortOption", "oldest")
            .param("projectKey", secretKey)
            .param("startDate", "2000-01-01")
            .param("endDate", "2030-12-31")
            .param("keyword", "content")
            .param("page", "1")
            .param("size", "5"))
            .andExpect(status().isOk())
            .andDo(document("api/v1/projects/comments/search/paging/get/oldest/success",
                requestParameters(
                    parameterWithName("sortOption").description("정렬 방식"),
                    parameterWithName("projectKey").description("프로젝트 시크릿 키"),
                    parameterWithName("startDate").description("시작 날짜"),
                    parameterWithName("endDate").description("종료 날짜"),
                    parameterWithName("keyword").description("검색할 댓글의 내용"),
                    parameterWithName("page").description("페이지"),
                    parameterWithName("size").description("페이지당 댓글의 개수")
                ),
                responseFields(
                    fieldWithPath("totalComment").type(JsonFieldType.NUMBER).description("댓글의 총 개수"),
                    fieldWithPath("totalPage").type(JsonFieldType.NUMBER).description("페이지의 총 개수"),
                    fieldWithPath("comments.[].createdDate").type(JsonFieldType.STRING).description("댓글 생성 시점"),
                    fieldWithPath("comments.[].modifiedDate").type(JsonFieldType.STRING).description("댓글 수정 시점"),
                    fieldWithPath("comments.[].id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("comments.[].content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("comments.[].url").type(JsonFieldType.STRING).description("댓글이 있는 url"),
                    fieldWithPath("comments.[].secret").type(JsonFieldType.BOOLEAN).description("댓글의 공개/비공개 여부"),
                    fieldWithPath("comments.[].readable").type(JsonFieldType.BOOLEAN).description("댓글 조회 가능 여부"),
                    fieldWithPath("comments.[].likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
                    fieldWithPath("comments.[].user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                    fieldWithPath("comments.[].user.createdDate").type(JsonFieldType.STRING).description("유저 생성 시점"),
                    fieldWithPath("comments.[].user.modifiedDate").type(JsonFieldType.STRING).description("유저 수정 시점"),
                    fieldWithPath("comments.[].user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                    fieldWithPath("comments.[].user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                    fieldWithPath("comments.[].user.type").type(JsonFieldType.STRING).description("유저 타입"),
                    fieldWithPath("comments.[].user.profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지"),
                    fieldWithPath("comments.[].user.hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부"),
                    fieldWithPath("comments.[].subComments[]").type(JsonFieldType.ARRAY).description("대댓글 정보")
                )
            ));
    }

    @DisplayName("특정 프로젝트의 시간별 댓글 통계를 구한다.")
    @Test
    void giveStat_hourly() throws Exception {
        소셜_로그인_댓글_등록됨("content1", "url");
        소셜_로그인_댓글_등록됨("content2", "url");
        소셜_로그인_댓글_등록됨("content3", "url");
        소셜_로그인_댓글_등록됨("content4", "url");
        소셜_로그인_댓글_등록됨("content5", "url");
        소셜_로그인_댓글_등록됨("hello6", "url");
        소셜_로그인_댓글_등록됨("hello7", "url");
        소셜_로그인_댓글_등록됨("hello8", "url");
        소셜_로그인_댓글_등록됨("hello9", "url2");
        소셜_로그인_댓글_등록됨("hello10", "url");

        mockMvc.perform(get("/api/v1/comments/stat")
            .contentType(MediaType.APPLICATION_JSON)
            .header("Cookie", "refreshToken=refreshToken")
            .param("periodicity", "hourly")
            .param("projectKey", secretKey)
            .param("startDate", LocalDate.now().minusYears(1L).toString())
            .param("endDate", LocalDate.now().toString()))
            .andExpect(status().isOk())
            .andDo(document("api/v1/comments/stat/get/hourly/success",
                requestParameters(
                    parameterWithName("periodicity").description("주기"),
                    parameterWithName("projectKey").description("프로젝트 시크릿 키"),
                    parameterWithName("startDate").description("시작 날짜"),
                    parameterWithName("endDate").description("종료 날짜")
                ),
                responseFields(
                    fieldWithPath("commentStats.[].date").type(JsonFieldType.STRING).description("시"),
                    fieldWithPath("commentStats.[].count").type(JsonFieldType.NUMBER).description("댓글의 총 개수")
                )
            ));
    }

    @DisplayName("특정 프로젝트의 일별 댓글 통계를 구한다.")
    @Test
    void giveStat_daily() throws Exception {
        소셜_로그인_댓글_등록됨("content1", "url");
        소셜_로그인_댓글_등록됨("content2", "url");
        소셜_로그인_댓글_등록됨("content3", "url");
        소셜_로그인_댓글_등록됨("content4", "url");
        소셜_로그인_댓글_등록됨("content5", "url");
        소셜_로그인_댓글_등록됨("hello6", "url");
        소셜_로그인_댓글_등록됨("hello7", "url");
        소셜_로그인_댓글_등록됨("hello8", "url");
        소셜_로그인_댓글_등록됨("hello9", "url2");
        소셜_로그인_댓글_등록됨("hello10", "url");

        mockMvc.perform(get("/api/v1/comments/stat")
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .param("periodicity", "daily")
            .param("projectKey", secretKey)
            .param("startDate", LocalDate.now().minusMonths(1L).toString())
            .param("endDate", LocalDate.now().toString()))
            .andExpect(status().isOk())
            .andDo(document("api/v1/comments/stat/get/daily/success",
                requestParameters(
                    parameterWithName("periodicity").description("주기"),
                    parameterWithName("projectKey").description("프로젝트 시크릿 키"),
                    parameterWithName("startDate").description("시작 날짜"),
                    parameterWithName("endDate").description("종료 날짜")
                ),
                responseFields(
                    fieldWithPath("commentStats.[].date").type(JsonFieldType.STRING).description("연월일"),
                    fieldWithPath("commentStats.[].count").type(JsonFieldType.NUMBER).description("댓글의 총 개수")
                )
            ));
    }

    @DisplayName("특정 프로젝트의 월별 댓글 통계를 구한다.")
    @Test
    void giveStat_monthly() throws Exception {
        소셜_로그인_댓글_등록됨("content1", "url");
        소셜_로그인_댓글_등록됨("content2", "url");
        소셜_로그인_댓글_등록됨("content3", "url");
        소셜_로그인_댓글_등록됨("content4", "url");
        소셜_로그인_댓글_등록됨("content5", "url");
        소셜_로그인_댓글_등록됨("hello6", "url");
        소셜_로그인_댓글_등록됨("hello7", "url");
        소셜_로그인_댓글_등록됨("hello8", "url");
        소셜_로그인_댓글_등록됨("hello9", "url2");
        소셜_로그인_댓글_등록됨("hello10", "url");

        mockMvc.perform(get("/api/v1/comments/stat")
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .param("periodicity", "monthly")
            .param("projectKey", secretKey)
            .param("startDate", LocalDate.now().minusYears(1L).toString())
            .param("endDate", LocalDate.now().toString()))
            .andExpect(status().isOk())
            .andDo(document("api/v1/comments/stat/get/monthly/success",
                requestParameters(
                    parameterWithName("periodicity").description("주기"),
                    parameterWithName("projectKey").description("프로젝트 시크릿 키"),
                    parameterWithName("startDate").description("시작 날짜"),
                    parameterWithName("endDate").description("종료 날짜")
                ),
                responseFields(
                    fieldWithPath("commentStats.[].date").type(JsonFieldType.STRING).description("연월"),
                    fieldWithPath("commentStats.[].count").type(JsonFieldType.NUMBER).description("댓글의 총 개수")
                )
            ));
    }

    @DisplayName("소셜 로그인 유저가 댓글을 수정한다.")
    @Test
    void updateByLoginUser() throws Exception {
        CommentResponse commentResponse = 소셜_로그인_댓글_등록됨_Response_반환("content1", "url");
        Long commentId = commentResponse.getId();

        mockMvc.perform(patch("/api/v1/comments/{id}", commentId)
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .header("Authorization", "Bearer " + token)
            .content(asJsonString(new CommentUpdateRequest("updateContent")))
        )
            .andExpect(status().isNoContent())
            .andDo(document("api/v1/comments/patch/success-login-user",
                requestHeaders(
                    headerWithName("Authorization").description("JWT - Bearer 토큰")
                ),
                pathParameters(
                    parameterWithName("id").description("수정할 댓글 id")
                ),
                relaxedRequestFields(
                    fieldWithPath("content").type(JsonFieldType.STRING).description("수정 내용"),
                    fieldWithPath("secret").type(JsonFieldType.BOOLEAN).description("댓글 공개/비공개 여부")
                )
            ));
    }

    @DisplayName("비로그인 유저가 댓글을 수정한다.")
    @Test
    void updateByGuestUser() throws Exception {
        CommentResponse commentResponse = 비로그인_댓글_등록됨_Response_반환("content1", "url");
        UserResponse userResponse = commentResponse.getUser();
        Long commentId = commentResponse.getId();

        mockMvc.perform(patch("/api/v1/comments/{id}", commentId)
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(
                new CommentUpdateRequest(userResponse.getId(), "password", "updateContent", false))))
            .andExpect(status().isNoContent())
            .andDo(document("api/v1/comments/patch/success-guest-user",
                pathParameters(
                    parameterWithName("id").description("수정할 댓글 id")
                ),
                requestFields(
                    fieldWithPath("guestUserId").type(JsonFieldType.NUMBER)
                        .description("비로그인 작성자 id"),
                    fieldWithPath("guestUserPassword").type(JsonFieldType.STRING)
                        .description("비로그인 작성자 비밀번호"),
                    fieldWithPath("content").type(JsonFieldType.STRING).description("수정 내용"),
                    fieldWithPath("secret").type(JsonFieldType.BOOLEAN).description("댓글 공개/비공개 여부")
                )
            ));
    }

    @DisplayName("비로그인 유저가 비밀 댓글을 조회한다.")
    @Test
    void readSecretComment_guest_user() throws Exception{
        CommentResponse commentResponse = 비로그인_댓글_등록됨_Response_반환("content1", "url", true);
        소셜_로그인_대댓글_등록됨("content2", "url", commentResponse.getId(), true);
        소셜_로그인_대댓글_등록됨("content3", "url", commentResponse.getId(), true);
        UserResponse userResponse = commentResponse.getUser();
        Long commentId = commentResponse.getId();

        mockMvc.perform(get("/api/v1/comments/" + commentId + "/secret-comment")
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .param("guestUserId", String.valueOf(userResponse.getId()))
            .param("guestUserPassword", "password"))
            .andExpect(status().isOk())
            .andDo(document("api/v1/comments/secret-comment/guest-user/get/success",
                requestParameters(
                    parameterWithName("guestUserId").description("비로그인 유저 ID"),
                    parameterWithName("guestUserPassword").description("비로그인 유저 비밀번호")
                ),
                responseFields(
                    fieldWithPath("createdDate").type(JsonFieldType.STRING).description("댓글 생성 시점"),
                    fieldWithPath("modifiedDate").type(JsonFieldType.STRING).description("댓글 수정 시점"),
                    fieldWithPath("id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("url").type(JsonFieldType.STRING).description("댓글이 있는 url"),
                    fieldWithPath("secret").type(JsonFieldType.BOOLEAN).description("댓글 공개/비공개 여부"),
                    fieldWithPath("readable").type(JsonFieldType.BOOLEAN).description("댓글 조회 가능 여부"),
                    fieldWithPath("likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
                    fieldWithPath("user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                    fieldWithPath("user.createdDate").type(JsonFieldType.STRING).description("유저 생성 시점"),
                    fieldWithPath("user.modifiedDate").type(JsonFieldType.STRING).description("유저 수정 시점"),
                    fieldWithPath("user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                    fieldWithPath("user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                    fieldWithPath("user.type").type(JsonFieldType.STRING).description("유저 타입"),
                    fieldWithPath("user.profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지"),
                    fieldWithPath("user.hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부"),
                    fieldWithPath("subComments[]").type(JsonFieldType.ARRAY).description("대댓글 정보"),
                    fieldWithPath("subComments[].createdDate").type(JsonFieldType.STRING).description("대댓글 생성 시점"),
                    fieldWithPath("subComments[].modifiedDate").type(JsonFieldType.STRING).description("대댓글 수정 시점"),
                    fieldWithPath("subComments[].id").type(JsonFieldType.NUMBER).description("대댓글 id"),
                    fieldWithPath("subComments[].content").type(JsonFieldType.STRING).description("대댓글 내용"),
                    fieldWithPath("subComments[].url").type(JsonFieldType.STRING).description("대댓글이 있는 url"),
                    fieldWithPath("subComments[].secret").type(JsonFieldType.BOOLEAN).description("대댓글 공개/비공개 여부"),
                    fieldWithPath("subComments[].readable").type(JsonFieldType.BOOLEAN).description("대댓글 조회 여부"),
                    fieldWithPath("subComments[].likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
                    fieldWithPath("subComments[].user").type(JsonFieldType.OBJECT).description("대댓글 작성 유저 정보"),
                    fieldWithPath("subComments[].user.createdDate").type(JsonFieldType.STRING).description("유저 생성 시점"),
                    fieldWithPath("subComments[].user.modifiedDate").type(JsonFieldType.STRING).description("유저 수정 시점"),
                    fieldWithPath("subComments[].user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                    fieldWithPath("subComments[].user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                    fieldWithPath("subComments[].user.type").type(JsonFieldType.STRING).description("유저 타입"),
                    fieldWithPath("subComments[].user.profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지"),
                    fieldWithPath("subComments[].user.hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("유저가 최근에 알람을 받았는지 여부")
                )
            ));
    }

    @DisplayName("소셜 로그인 유저는 남의 비밀 댓글을 조회할 수 없다.")
    @Test
    void readSecretComment_login_user() throws Exception{
        CommentResponse commentResponse1 = 소셜_로그인_댓글_등록됨_Response_반환("content1", "url");
        CommentResponse commentResponse2 = 비로그인_댓글_등록됨_Response_반환("content2", "url", true);
        Long commentId2 = commentResponse2.getId();

        mockMvc.perform(get("/api/v1/comments/" + commentId2 + "/secret-comment")
            .header("Cookie", "refreshToken=refreshToken")
            .header("Authorization", "Bearer " + token))
            .andExpect(status().isUnauthorized())
            .andExpect(jsonPath("$.code").value(903))
            .andDo(document("api/v1/comments/secret-comment/login-user/get/fail-not-mine",
                responseFields(
                    fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                    fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                )
            ));
    }

    @DisplayName("소셜 로그인 유저는 남의 댓글을 수정할 수 없다.")
    @Test
    void updateUnauthorized() throws Exception {
        CommentResponse commentResponse1 = 소셜_로그인_댓글_등록됨_Response_반환("content1", "url");
        CommentResponse commentResponse2 = 비로그인_댓글_등록됨_Response_반환("content2", "url");
        Long commentId2 = commentResponse2.getId();

        mockMvc.perform(patch("/api/v1/comments/{id}", commentId2)
            .contentType(MediaType.APPLICATION_JSON)
            .header("Cookie", "refreshToken=refreshToken")
            .header("Authorization", "Bearer " + token)
            .content(asJsonString(new CommentUpdateRequest("updateContent"))))
            .andExpect(status().isUnauthorized())
            .andExpect(jsonPath("$.code").value(903))
            .andDo(document("api/v1/comments/patch/fail-not-mine",
                responseFields(
                    fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                    fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                )
            ));
    }

    @DisplayName("비로그인 유저가 비밀번호를 틀리면 댓글을 수정할 수 없다.")
    @Test
    void updateInvalidGuestPassword() throws Exception {
        CommentResponse commentResponse = 비로그인_댓글_등록됨_Response_반환("content2", "url");
        Long commentId = commentResponse.getId();
        UserResponse user = commentResponse.getUser();

        mockMvc.perform(get("/api/v1/comments/" + commentId + "/secret-comment")
            .param("guestUserId", String.valueOf(user.getId()))
            .param("guestUserPassword", "Invalid"))
            .andExpect(status().isUnauthorized())
            .andExpect(jsonPath("$.code").value(901))
            .andDo(document("api/v1/comments/secret-comment/guest-user/get/fail-not-mine",
                responseFields(
                    fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                    fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                )
            ));
    }

    @DisplayName("비로그인 유저가 비밀번호를 틀리면 비밀 댓글을 조회할 수 없다.")
    @Test
    void readSecretComment_guest_user_exception() throws Exception{
        CommentResponse commentResponse = 비로그인_댓글_등록됨_Response_반환("content2", "url");
        Long commentId = commentResponse.getId();
        UserResponse user = commentResponse.getUser();

        mockMvc.perform(get("/api/v1/comments/" + commentId + "/secret-comment")
            .header("Authorization", "Bearer " + token)
            .content(asJsonString(new CommentReadSecretCommentRequest(null, null))))
            .andExpect(status().isUnauthorized())
            .andExpect(jsonPath("$.code").value(903))
            .andDo(document("api/v1/comments/secret-comment/get/fail-not-mine",
                responseFields(
                    fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                    fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                )
            ));
    }

    @DisplayName("소셜 로그인 유저가 댓글을 삭제한다.")
    @Test
    void deleteLoginUser() throws Exception {
        CommentResponse commentResponse = 소셜_로그인_댓글_등록됨_Response_반환("content1", "url");
        Long commentId = commentResponse.getId();

        mockMvc.perform(delete("/api/v1/comments/{id}", commentId)
            .header("Cookie", "refreshToken=refreshToken")
            .header("Authorization", "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent())
            .andDo(document("api/v1/comments/delete/success-login-user",
                requestHeaders(
                    headerWithName("Authorization").description("JWT - Bearer 토큰")
                ),
                pathParameters(
                    parameterWithName("id").description("삭제할 댓글 id")
                )
            ));
    }

    @DisplayName("비로그인 유저가 댓글을 삭제한다.")
    @Test
    void deleteGuestUser() throws Exception {
        CommentResponse commentResponse = 비로그인_댓글_등록됨_Response_반환("content1", "url");
        Long commentId = commentResponse.getId();
        UserResponse user = commentResponse.getUser();

        mockMvc.perform(delete("/api/v1/comments/{id}", commentId)
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .param("guestUserId", user.getId().toString())
            .param("guestUserPassword", "password"))
            .andExpect(status().isNoContent())
            .andDo(document("api/v1/comments/delete/success-guest-user",
                pathParameters(
                    parameterWithName("id").description("삭제할 댓글 id")
                ),
                requestParameters(
                    parameterWithName("guestUserId").description("비로그인 작성자 id"),
                    parameterWithName("guestUserPassword").description("비로그인 작성자 비밀번호")
                )
            ));
    }

    @DisplayName("관리자가 다른 유저의 댓글을 삭제한다.")
    @Test
    void deleteAdminUser() throws Exception {
        CommentResponse commentResponse = 비로그인_댓글_등록됨_Response_반환("content1", "url");
        Long commentId = commentResponse.getId();

        mockMvc.perform(delete("/api/v1/comments/{id}", commentId)
            .contentType(MediaType.APPLICATION_JSON)
            .header("Authorization", "Bearer " + adminToken)
            .header("Cookie", "refreshToken=refreshToken"))
            .andExpect(status().isNoContent())
            .andDo(document("api/v1/comments/delete/success-admin-user",
                requestHeaders(
                    headerWithName("Authorization").description("관리자의 JWT - Bearer 토큰")
                )
            ));
    }

    @DisplayName("관리자가 다른 유저의 대댓글을 삭제한다.")
    @Test
    void deleteAdminUser_subComment() throws Exception {
        CommentResponse commentResponse = 소셜_로그인_댓글_등록됨_Response_반환("content1", "url");
        Long commentId = commentResponse.getId();

        CommentResponse subCommentResponse = 소셜_로그인_대댓글_등록됨_Response_반환("sub1", "url", commentId);
        CommentResponse subCommentResponse2 = 소셜_로그인_대댓글_등록됨_Response_반환("sub2", "url", commentId);

        mockMvc.perform(delete("/api/v1/comments/{id}", subCommentResponse2.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .header("Authorization", "Bearer " + adminToken)
            .header("Cookie", "refreshToken=refreshToken"))
            .andExpect(status().isNoContent())
            .andDo(document("api/v1/comments/delete/success-admin-user",
                requestHeaders(
                    headerWithName("Authorization").description("관리자의 JWT - Bearer 토큰")
                )
            ));

        mockMvc.perform(get("/api/v1/comments")
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .param("sortOption", "LATEST")
            .param("url", "url")
            .param("projectKey", secretKey))
            .andExpect(status().isOk());
    }

    @DisplayName("비로그인 유저는 남의 댓글을 삭제할 수 없다.")
    @Test
    void deleteUnauthorized() throws Exception {
        CommentResponse commentResponse1 = 소셜_로그인_댓글_등록됨_Response_반환("content1", "url");
        CommentResponse commentResponse2 = 비로그인_댓글_등록됨_Response_반환("content2", "url");
        Long commentId1 = commentResponse1.getId();
        UserResponse unauthorizedUser = commentResponse2.getUser();

        mockMvc.perform(delete("/api/v1/comments/{id}", commentId1)
            .contentType(MediaType.APPLICATION_JSON)
            .header("Cookie", "refreshToken=refreshToken")
            .param("guestUserId", unauthorizedUser.getId().toString())
            .param("guestUserPassword", "password"))
            .andExpect(status().isUnauthorized())
            .andExpect(jsonPath("$.code").value(903))
            .andDo(document("api/v1/comments/delete/fail-not-mine",
                responseFields(
                    fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                    fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                )
            ));
    }

    @DisplayName("댓글 좋아요를 누른다.")
    @Test
    void likeComment() throws Exception {
        CommentResponse commentResponse = 소셜_로그인_댓글_등록됨_Response_반환("content", "url");

        mockMvc.perform(post("/api/v1/comments/{id}/like", commentResponse.getId())
            .header("Authorization", "Bearer " + token)
            .header("Cookie", "refreshToken=refreshToken"))
            .andExpect(status().isNoContent())
            .andDo(document("api/v1/comments/post/like-success",
                requestHeaders(
                    headerWithName("Authorization").description("JWT - Bearer 토큰")
                ),
                pathParameters(
                    parameterWithName("id").description("좋아요를 누를 댓글 id")
                )
            ));
    }

    @DisplayName("비로그인 사용자가 댓글 좋아요를 누르면 예외가 발생한다.")
    @Test
    void invalidCommentLikeByGuestUser() throws Exception {
        CommentResponse commentResponse = 소셜_로그인_댓글_등록됨_Response_반환("content", "url");

        mockMvc.perform(post("/api/v1/comments/{id}/like", commentResponse.getId())
        )
            .andExpect(status().isUnauthorized())
            .andDo(document("api/v1/comments/post/like-fail",
                responseFields(
                    fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                    fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                )
            ));
    }

    private ResultActions 소셜_로그인_댓글_등록됨(String content, String url) throws Exception {
        return mockMvc.perform(post("/api/v1/comments")
            .contentType(MediaType.APPLICATION_JSON)
            .header("Authorization", "Bearer " + token)
            .header("Cookie", "refreshToken=refreshToken")
            .content(asJsonString(new CommentCreateRequest(null, null, null, secretKey, content, url))))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.user..type").value("SocialLoginUser"));
    }

    private ResultActions 소셜_로그인_댓글_등록됨(String content, String url, boolean secret) throws Exception {
        return mockMvc.perform(post("/api/v1/comments")
            .contentType(MediaType.APPLICATION_JSON)
            .header("Authorization", "Bearer " + token)
            .header("Cookie", "refreshToken=refreshToken")
            .content(asJsonString(new CommentCreateRequest(null, null, null, secretKey, content, url, secret))))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.user..type").value("SocialLoginUser"));
    }

    private ResultActions 소셜_로그인_댓글_좋아요_누름(String content, String url, Long id) throws Exception {
        return mockMvc.perform(post("/api/v1/comments/{id}/like", id)
            .contentType(MediaType.APPLICATION_JSON)
            .header("Authorization", "Bearer " + token)
            .header("Cookie", "refreshToken=refreshToken")
            .content(asJsonString(new CommentCreateRequest(null, null, null, secretKey, content, url))))
            .andExpect(status().isNoContent());
    }

    private CommentResponse 소셜_로그인_댓글_등록됨_Response_반환(String content, String url) throws Exception {
        String responseJson = 소셜_로그인_댓글_등록됨(content, url).andReturn().getResponse()
            .getContentAsString();
        return new ObjectMapper().readValue(responseJson, CommentResponse.class);
    }

    private CommentResponse 소셜_로그인_댓글_등록됨_Response_반환(String content, String url, boolean secret) throws Exception {
        String responseJson = 소셜_로그인_댓글_등록됨(content, url, secret).andReturn().getResponse()
            .getContentAsString();
        return new ObjectMapper().readValue(responseJson, CommentResponse.class);
    }

    private ResultActions 비로그인_댓글_등록됨(String content, String url) throws Exception {
        return mockMvc.perform(post("/api/v1/comments")
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(
                new CommentCreateRequest("guest", "password", null, secretKey, content, url))))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.user..type").value("GuestUser"));
    }

    private ResultActions 비로그인_댓글_등록됨(String content, String url, boolean secret) throws Exception {
        return mockMvc.perform(post("/api/v1/comments")
            .header("Cookie", "refreshToken=refreshToken")
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(
                new CommentCreateRequest("guest", "password", null, secretKey, content, url, secret))))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.user..type").value("GuestUser"));
    }

    private CommentResponse 비로그인_댓글_등록됨_Response_반환(String content, String url) throws Exception {
        String responseJson = 비로그인_댓글_등록됨(content, url).andReturn().getResponse().getContentAsString();
        return new ObjectMapper().readValue(responseJson, CommentResponse.class);
    }

    private CommentResponse 비로그인_댓글_등록됨_Response_반환(String content, String url, boolean secret) throws Exception {
        String responseJson = 비로그인_댓글_등록됨(content, url, secret).andReturn().getResponse().getContentAsString();
        return new ObjectMapper().readValue(responseJson, CommentResponse.class);
    }

}
