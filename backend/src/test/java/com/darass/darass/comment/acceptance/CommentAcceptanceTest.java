package com.darass.darass.comment.acceptance;

import com.darass.darass.AcceptanceTest;
import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.comment.controller.dto.CommentCreateRequest;
import com.darass.darass.comment.controller.dto.CommentResponse;
import com.darass.darass.comment.controller.dto.CommentUpdateRequest;
import com.darass.darass.comment.controller.dto.UserResponse;
import com.darass.darass.project.domain.Project;
import com.darass.darass.project.domain.RandomSecretKeyFactory;
import com.darass.darass.project.repository.ProjectRepository;
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

import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("Comment 인수 테스트")
public class CommentAcceptanceTest extends AcceptanceTest {

    @Autowired
    JwtTokenProvider jwtTokenProvider;
    @Autowired
    private UserRepository users;
    @Autowired
    private ProjectRepository projects;
    private SocialLoginUser socialLoginUser;
    private Project project;
    private String token;
    private String secretKey;

    private void setUpProject() {
        project = Project.builder()
                .name("project")
                .secretKeyFactory(new RandomSecretKeyFactory())
                .user(socialLoginUser)
                .build();
        projects.save(project);
        secretKey = project.getSecretKey();
    }

    private void setUpUser() {
        socialLoginUser = SocialLoginUser
                .builder()
                .nickName("nickname")
                .oauthId("abc13gag")
                .oauthPlatform(OAuthPlatform.KAKAO)
                .email("qkrwotjd1445@naver.com")
                .profileImageUrl("https://imageUrl")
                .build();
        users.save(socialLoginUser);
        token = jwtTokenProvider.createAccessToken(socialLoginUser.getId().toString());
    }

    @BeforeEach
    void setUp() {
        setUpUser();

        setUpProject();
    }

    @Test
    @DisplayName("/api/v1/comments POST - 성공 (소셜 로그인 유저)")
    void saveLoginUser() throws Exception {
        소셜_로그인_댓글_등록됨("content", "url").andDo(

            document("api/v1/comments/post/success-login-user",
                requestHeaders(
                    headerWithName("Authorization").description("JWT - Bearer 토큰")
                ),
                relaxedRequestFields(
                    fieldWithPath("projectSecretKey").type(JsonFieldType.STRING).description("프로젝트 시크릿 키"),
                    fieldWithPath("content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("url").type(JsonFieldType.STRING).description("url")
                ),
                responseFields(
                    fieldWithPath("id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("createdDate").type(JsonFieldType.STRING).description("댓글 생성 시점"),
                    fieldWithPath("modifiedDate").type(JsonFieldType.STRING).description("댓글 수정 시점"),
                    fieldWithPath("user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                    fieldWithPath("user.createdDate").type(JsonFieldType.STRING).description("유저 생성 시점"),
                    fieldWithPath("user.modifiedDate").type(JsonFieldType.STRING).description("유저 수정 시점"),
                    fieldWithPath("user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                    fieldWithPath("user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                    fieldWithPath("user.type").type(JsonFieldType.STRING).description("유저 유형"),
                    fieldWithPath("user.profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지")
                ))
        );
    }

    @Test
    @DisplayName("/api/v1/comments POST - 성공 (비로그인 유저)")
    void saveGuestUser() throws Exception {
        비로그인_댓글_등록됨("content", "url").andDo(
                document("api/v1/comments/post/success-guest-user",
                        requestFields(
                                fieldWithPath("guestNickName").type(JsonFieldType.STRING).description("비로그인 유저 닉네입"),
                                fieldWithPath("guestPassword").type(JsonFieldType.STRING).description("비로그인 유저 비밀번호"),
                                fieldWithPath("projectSecretKey").type(JsonFieldType.STRING).description("프로젝트 시크릿 키"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("댓글 내용"),
                                fieldWithPath("url").type(JsonFieldType.STRING).description("url")
                        ),
                        relaxedResponseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("댓글 id"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("댓글 내용"),
                                fieldWithPath("createdDate").type(JsonFieldType.STRING).description("댓글 생성 시점"),
                                fieldWithPath("modifiedDate").type(JsonFieldType.STRING).description("댓글 수정 시점"),
                                fieldWithPath("user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                                fieldWithPath("user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                                fieldWithPath("user.createdDate").type(JsonFieldType.STRING).description("유저 생성 시점"),
                                fieldWithPath("user.modifiedDate").type(JsonFieldType.STRING).description("유저 수정 시점"),
                                fieldWithPath("user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                                fieldWithPath("user.type").type(JsonFieldType.STRING).description("유저 유형")
                        ))
        );
    }

    @Test
    @DisplayName("/api/v1/comments POST - 프로젝트 시크릿 키 존재하지 않는 경우")
    void saveWithInvalidSecretKey() throws Exception {
        mockMvc.perform(post("/api/v1/comments")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(new CommentCreateRequest("guest", "password", "invalidKey", "content", "url"))))
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

    @Test
    @DisplayName("/api/v1/comments GET - 성공")
    void read() throws Exception {
        소셜_로그인_댓글_등록됨("content1", "url");
        소셜_로그인_댓글_등록됨("content2", "url");

        mockMvc.perform(get("/api/v1/comments")
                .contentType(MediaType.APPLICATION_JSON)
                .param("url", "url")
                .param("projectKey", secretKey))
                .andExpect(status().isOk())
                .andDo(document("api/v1/comments/get/success",
                        requestParameters(
                                parameterWithName("url").description("조회 url"),
                                parameterWithName("projectKey").description("프로젝트 시크릿 키")
                        ),
                        responseFields(
                                fieldWithPath("[].createdDate").type(JsonFieldType.STRING).description("댓글 생성 시점"),
                                fieldWithPath("[].modifiedDate").type(JsonFieldType.STRING).description("댓글 수정 시점"),
                                fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("댓글 id"),
                                fieldWithPath("[].content").type(JsonFieldType.STRING).description("댓글 내용"),
                                fieldWithPath("[].user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                                fieldWithPath("[].user.createdDate").type(JsonFieldType.STRING).description("유저 생성 시점"),
                                fieldWithPath("[].user.modifiedDate").type(JsonFieldType.STRING).description("유저 수정 시점"),
                                fieldWithPath("[].user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                                fieldWithPath("[].user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                                fieldWithPath("[].user.type").type(JsonFieldType.STRING).description("유저 타입"),
                                fieldWithPath("[].user.profileImageUrl").type(JsonFieldType.STRING).description("유저 프로필 이미지")
                        )
                ));
    }

    @Test
    @DisplayName("/api/v1/comments/{id} PATCH - 성공 (소셜 로그인 유저)")
    void updateByLoginUser() throws Exception {
        CommentResponse commentResponse = 소셜_로그인_댓글_등록됨_Response_반환("content1", "url");
        Long commentId = commentResponse.getId();

        mockMvc.perform(patch("/api/v1/comments/{id}", commentId)
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
                                fieldWithPath("content").type(JsonFieldType.STRING).description("수정 내용")
                        )
                ));
    }

    @Test
    @DisplayName("/api/v1/comments/{id} PATCH - 성공 (비로그인 유저)")
    void updateByGuestUser() throws Exception {
        CommentResponse commentResponse = 비로그인_댓글_등록됨_Response_반환("content1", "url");
        UserResponse userResponse = commentResponse.getUser();
        Long commentId = commentResponse.getId();

        mockMvc.perform(patch("/api/v1/comments/{id}", commentId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(new CommentUpdateRequest(userResponse.getId(), "password", "updateContent"))))
                .andExpect(status().isNoContent())
                .andDo(document("api/v1/comments/patch/success-guest-user",
                        pathParameters(
                                parameterWithName("id").description("수정할 댓글 id")
                        ),
                        requestFields(
                                fieldWithPath("guestUserId").type(JsonFieldType.NUMBER).description("비로그인 작성자 id"),
                                fieldWithPath("guestUserPassword").type(JsonFieldType.STRING).description("비로그인 작성자 비밀번호"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("수정 내용")
                        )
                ));
    }

    @Test
    @DisplayName("/api/v1/comments/{id} PATCH - 남의 댓글을 수정하는 경우")
    void updateUnauthorized() throws Exception {
        CommentResponse commentResponse1 = 소셜_로그인_댓글_등록됨_Response_반환("content1", "url");
        CommentResponse commentResponse2 = 비로그인_댓글_등록됨_Response_반환("content2", "url");
        Long commentId2 = commentResponse2.getId();

        mockMvc.perform(patch("/api/v1/comments/{id}", commentId2)
                .contentType(MediaType.APPLICATION_JSON)
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

    @Test
    @DisplayName("/api/v1/comments/{id} PATCH - 비로그인 유저의 비밀번호 틀린 경우")
    void updateInvalidGuestPassword() throws Exception {
        CommentResponse commentResponse = 비로그인_댓글_등록됨_Response_반환("content2", "url");
        Long commentId = commentResponse.getId();
        UserResponse user = commentResponse.getUser();

        mockMvc.perform(patch("/api/v1/comments/{id}", commentId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(new CommentUpdateRequest(user.getId(), "invalid", "updateContent"))))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value(901))
                .andDo(document("api/v1/comments/patch/fail-guest-password-wrong",
                        responseFields(
                                fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                                fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                        )
                ));
    }

    @Test
    @DisplayName("/api/v1/comments/{id} DELETE - 성공 (소셜 로그인 유저)")
    void deleteLoginUser() throws Exception {
        CommentResponse commentResponse = 소셜_로그인_댓글_등록됨_Response_반환("content1", "url");
        Long commentId = commentResponse.getId();

        mockMvc.perform(delete("/api/v1/comments/{id}", commentId)
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

    @Test
    @DisplayName("/api/v1/comments/{id} DELETE - 성공 (비로그인 유저)")
    void deleteGuestUser() throws Exception {
        CommentResponse commentResponse = 비로그인_댓글_등록됨_Response_반환("content1", "url");
        Long commentId = commentResponse.getId();
        UserResponse user = commentResponse.getUser();

        mockMvc.perform(delete("/api/v1/comments/{id}", commentId)
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

    @Test
    @DisplayName("/api/v1/comments/{id} DELETE - 성공 (관리자가 남의 댓글을 삭제하는 경우)")
    void deleteAdminUser() throws Exception {
        CommentResponse commentResponse = 비로그인_댓글_등록됨_Response_반환("content1", "url");
        Long commentId = commentResponse.getId();

        mockMvc.perform(delete("/api/v1/comments/{id}", commentId)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token))
                .andExpect(status().isNoContent())
                .andDo(document("api/v1/comments/delete/success-admin-user",
                        requestHeaders(
                                headerWithName("Authorization").description("관리자의 JWT - Bearer 토큰")
                        )
                ));
    }

    @Test
    @DisplayName("/api/v1/comments/{id} DELETE - 남의 댓글을 삭제하는 경우")
    void deleteUnauthorized() throws Exception {
        CommentResponse commentResponse1 = 소셜_로그인_댓글_등록됨_Response_반환("content1", "url");
        CommentResponse commentResponse2 = 비로그인_댓글_등록됨_Response_반환("content2", "url");
        Long commentId1 = commentResponse1.getId();
        UserResponse unauthorizedUser = commentResponse2.getUser();

        mockMvc.perform(delete("/api/v1/comments/{id}", commentId1)
                .contentType(MediaType.APPLICATION_JSON)
                .param("guestUserId", unauthorizedUser.getId().toString())
                .param("guestUserPassword", "password")
        )
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value(903))
                .andDo(document("api/v1/comments/delete/fail-not-mine",
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
                .content(asJsonString(new CommentCreateRequest(null, null, secretKey, content, url))))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.user..type").value("SocialLoginUser"));
    }

    private CommentResponse 소셜_로그인_댓글_등록됨_Response_반환(String content, String url) throws Exception {
        String responseJson = 소셜_로그인_댓글_등록됨(content, url).andReturn().getResponse().getContentAsString();
        return new ObjectMapper().readValue(responseJson, CommentResponse.class);
    }

    private ResultActions 비로그인_댓글_등록됨(String content, String url) throws Exception {
        return mockMvc.perform(post("/api/v1/comments")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(new CommentCreateRequest("guest", "password", secretKey, content, url))))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.user..type").value("GuestUser"));
    }

    private CommentResponse 비로그인_댓글_등록됨_Response_반환(String content, String url) throws Exception {
        String responseJson = 비로그인_댓글_등록됨(content, url).andReturn().getResponse().getContentAsString();
        return new ObjectMapper().readValue(responseJson, CommentResponse.class);
    }

}
