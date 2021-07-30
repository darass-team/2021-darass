package com.darass.darass.comment.acceptance;

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

import com.darass.darass.AcceptanceTest;
import com.darass.darass.auth.oauth.api.domain.OAuthProviderType;
import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.comment.dto.CommentCreateRequest;
import com.darass.darass.comment.dto.CommentResponse;
import com.darass.darass.comment.dto.CommentUpdateRequest;
import com.darass.darass.project.domain.Project;
import com.darass.darass.project.repository.ProjectRepository;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.dto.UserResponse;
import com.darass.darass.user.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

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
            .oauthProviderType(OAuthProviderType.KAKAO)
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
                    fieldWithPath("url").type(JsonFieldType.STRING).description("url")
                ),
                responseFields(
                    fieldWithPath("id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("createdDate").type(JsonFieldType.STRING).description("댓글 생성 시점"),
                    fieldWithPath("modifiedDate").type(JsonFieldType.STRING)
                        .description("댓글 수정 시점"),
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
                        .description("유저 프로필 이미지")
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
                    fieldWithPath("projectSecretKey").type(JsonFieldType.STRING)
                        .description("프로젝트 시크릿 키"),
                    fieldWithPath("content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("url").type(JsonFieldType.STRING).description("url")
                ),
                relaxedResponseFields(
                    fieldWithPath("id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("createdDate").type(JsonFieldType.STRING).description("댓글 생성 시점"),
                    fieldWithPath("modifiedDate").type(JsonFieldType.STRING)
                        .description("댓글 수정 시점"),
                    fieldWithPath("likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
                    fieldWithPath("user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                    fieldWithPath("user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                    fieldWithPath("user.createdDate").type(JsonFieldType.STRING)
                        .description("유저 생성 시점"),
                    fieldWithPath("user.modifiedDate").type(JsonFieldType.STRING)
                        .description("유저 수정 시점"),
                    fieldWithPath("user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                    fieldWithPath("user.type").type(JsonFieldType.STRING).description("유저 유형")
                ))
        );
    }

    @DisplayName("프로젝트 시크릿 키 존재하지 않다면 댓글을 등록할 수 없다.")
    @Test
    void saveWithInvalidSecretKey() throws Exception {
        mockMvc.perform(post("/api/v1/comments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(
                new CommentCreateRequest("guest", "password", "invalidKey", "content", "url"))))
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

    @DisplayName("전체 댓글을 최신순으로 조회한다.")
    @Test
    void readOrderByLatest() throws Exception {
        소셜_로그인_댓글_등록됨("content1", "url");
        소셜_로그인_댓글_등록됨("content2", "url");
        소셜_로그인_댓글_등록됨("content3", "url");
        소셜_로그인_댓글_등록됨("content4", "url");
        소셜_로그인_댓글_등록됨("content5", "url");

        mockMvc.perform(get("/api/v1/comments")
            .contentType(MediaType.APPLICATION_JSON)
            .param("sorting", "LATEST")
            .param("url", "url")
            .param("projectKey", secretKey))
            .andExpect(status().isOk())
            .andDo(document("api/v1/comments/get/latest/success",
                requestParameters(
                    parameterWithName("sorting").description("정렬 방식"),
                    parameterWithName("url").description("조회 url"),
                    parameterWithName("projectKey").description("프로젝트 시크릿 키")
                ),
                responseFields(
                    fieldWithPath("[].createdDate").type(JsonFieldType.STRING)
                        .description("댓글 생성 시점"),
                    fieldWithPath("[].modifiedDate").type(JsonFieldType.STRING)
                        .description("댓글 수정 시점"),
                    fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("[].content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("[].likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
                    fieldWithPath("[].user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                    fieldWithPath("[].user.createdDate").type(JsonFieldType.STRING)
                        .description("유저 생성 시점"),
                    fieldWithPath("[].user.modifiedDate").type(JsonFieldType.STRING)
                        .description("유저 수정 시점"),
                    fieldWithPath("[].user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                    fieldWithPath("[].user.nickName").type(JsonFieldType.STRING)
                        .description("유저 닉네임"),
                    fieldWithPath("[].user.type").type(JsonFieldType.STRING).description("유저 타입"),
                    fieldWithPath("[].user.profileImageUrl").type(JsonFieldType.STRING)
                        .description("유저 프로필 이미지")
                )
            ));
    }

    @DisplayName("전체 댓글을 좋아요순으로 조회한다.")
    @Test
    void readOrderByLike() throws Exception {
        소셜_로그인_댓글_등록됨("content1", "url");
        소셜_로그인_댓글_등록됨("content2", "url");

        CommentResponse commentResponse3 = 소셜_로그인_댓글_등록됨_Response_반환("content3", "url");
        소셜_로그인_댓글_좋아요_누름("content3", "url", commentResponse3.getId());

        CommentResponse commentResponse4 = 소셜_로그인_댓글_등록됨_Response_반환("content4", "url");
        소셜_로그인_댓글_좋아요_누름("content4", "url", commentResponse4.getId());

        CommentResponse commentResponse5 = 소셜_로그인_댓글_등록됨_Response_반환("content5", "url");
        소셜_로그인_댓글_좋아요_누름("content5", "url", commentResponse5.getId());

        mockMvc.perform(get("/api/v1/comments")
            .contentType(MediaType.APPLICATION_JSON)
            .param("sorting", "LIKE")
            .param("url", "url")
            .param("projectKey", secretKey))
            .andExpect(status().isOk())
            .andDo(document("api/v1/comments/get/like/success",
                requestParameters(
                    parameterWithName("sorting").description("정렬 방식"),
                    parameterWithName("url").description("조회 url"),
                    parameterWithName("projectKey").description("프로젝트 시크릿 키")
                ),
                responseFields(
                    fieldWithPath("[].createdDate").type(JsonFieldType.STRING)
                        .description("댓글 생성 시점"),
                    fieldWithPath("[].modifiedDate").type(JsonFieldType.STRING)
                        .description("댓글 수정 시점"),
                    fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("[].content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("[].likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
                    fieldWithPath("[].user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                    fieldWithPath("[].user.createdDate").type(JsonFieldType.STRING)
                        .description("유저 생성 시점"),
                    fieldWithPath("[].user.modifiedDate").type(JsonFieldType.STRING)
                        .description("유저 수정 시점"),
                    fieldWithPath("[].user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                    fieldWithPath("[].user.nickName").type(JsonFieldType.STRING)
                        .description("유저 닉네임"),
                    fieldWithPath("[].user.type").type(JsonFieldType.STRING).description("유저 타입"),
                    fieldWithPath("[].user.profileImageUrl").type(JsonFieldType.STRING)
                        .description("유저 프로필 이미지")
                )
            ));
    }

    @DisplayName("전체 댓글을 과거순으로 조회한다.")
    @Test
    void readOrderByOldest() throws Exception {
        소셜_로그인_댓글_등록됨("content1", "url");
        소셜_로그인_댓글_등록됨("content2", "url");
        소셜_로그인_댓글_등록됨("content3", "url");
        소셜_로그인_댓글_등록됨("content4", "url");
        소셜_로그인_댓글_등록됨("content5", "url");

        mockMvc.perform(get("/api/v1/comments")
            .contentType(MediaType.APPLICATION_JSON)
            .param("sorting", "OLDEST")
            .param("url", "url")
            .param("projectKey", secretKey))
            .andExpect(status().isOk())
            .andDo(document("api/v1/comments/get/oldest/success",
                requestParameters(
                    parameterWithName("sorting").description("정렬 방식"),
                    parameterWithName("url").description("조회 url"),
                    parameterWithName("projectKey").description("프로젝트 시크릿 키")
                ),
                responseFields(
                    fieldWithPath("[].createdDate").type(JsonFieldType.STRING)
                        .description("댓글 생성 시점"),
                    fieldWithPath("[].modifiedDate").type(JsonFieldType.STRING)
                        .description("댓글 수정 시점"),
                    fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("[].content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("[].likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
                    fieldWithPath("[].user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                    fieldWithPath("[].user.createdDate").type(JsonFieldType.STRING)
                        .description("유저 생성 시점"),
                    fieldWithPath("[].user.modifiedDate").type(JsonFieldType.STRING)
                        .description("유저 수정 시점"),
                    fieldWithPath("[].user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                    fieldWithPath("[].user.nickName").type(JsonFieldType.STRING)
                        .description("유저 닉네임"),
                    fieldWithPath("[].user.type").type(JsonFieldType.STRING).description("유저 타입"),
                    fieldWithPath("[].user.profileImageUrl").type(JsonFieldType.STRING)
                        .description("유저 프로필 이미지")
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
            .contentType(MediaType.APPLICATION_JSON)
            .param("sorting", "LATEST")
            .param("url", "url")
            .param("projectKey", secretKey)
            .param("page", "2")
            .param("size", "5"))
            .andExpect(status().isOk())
            .andDo(document("api/v1/comments/paging/get/latest/success",
                requestParameters(
                    parameterWithName("sorting").description("정렬 방식"),
                    parameterWithName("url").description("조회 url"),
                    parameterWithName("projectKey").description("프로젝트 시크릿 키"),
                    parameterWithName("page").description("페이지"),
                    parameterWithName("size").description("페이지당 댓글의 개수")
                ),
                responseFields(
                    fieldWithPath("[].createdDate").type(JsonFieldType.STRING).description("댓글 생성 시점"),
                    fieldWithPath("[].modifiedDate").type(JsonFieldType.STRING).description("댓글 수정 시점"),
                    fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("[].content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("[].likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
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
            .contentType(MediaType.APPLICATION_JSON)
            .param("sorting", "LIKE")
            .param("url", "url")
            .param("projectKey", secretKey)
            .param("page", "1")
            .param("size", "5"))
            .andExpect(status().isOk())
            .andDo(document("api/v1/comments/paging/get/like/success",
                requestParameters(
                    parameterWithName("sorting").description("정렬 방식"),
                    parameterWithName("url").description("조회 url"),
                    parameterWithName("projectKey").description("프로젝트 시크릿 키"),
                    parameterWithName("page").description("페이지"),
                    parameterWithName("size").description("페이지당 댓글의 개수")
                ),
                responseFields(
                    fieldWithPath("[].createdDate").type(JsonFieldType.STRING).description("댓글 생성 시점"),
                    fieldWithPath("[].modifiedDate").type(JsonFieldType.STRING).description("댓글 수정 시점"),
                    fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("[].content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("[].likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
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
            .contentType(MediaType.APPLICATION_JSON)
            .param("sorting", "OLDEST")
            .param("url", "url")
            .param("projectKey", secretKey)
            .param("page", "2")
            .param("size", "5"))
            .andExpect(status().isOk())
            .andDo(document("api/v1/comments/paging/get/oldest/success",
                requestParameters(
                    parameterWithName("sorting").description("정렬 방식"),
                    parameterWithName("url").description("조회 url"),
                    parameterWithName("projectKey").description("프로젝트 시크릿 키"),
                    parameterWithName("page").description("페이지"),
                    parameterWithName("size").description("페이지당 댓글의 개수")
                ),
                responseFields(
                    fieldWithPath("[].createdDate").type(JsonFieldType.STRING).description("댓글 생성 시점"),
                    fieldWithPath("[].modifiedDate").type(JsonFieldType.STRING).description("댓글 수정 시점"),
                    fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("댓글 id"),
                    fieldWithPath("[].content").type(JsonFieldType.STRING).description("댓글 내용"),
                    fieldWithPath("[].likingUsers[*]").type(JsonFieldType.ARRAY).description("좋아요 누른 유저 정보"),
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

    @DisplayName("소셜 로그인 유저가 댓글을 수정한다.")
    @Test
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

    @DisplayName("비로그인 유저가 댓글을 수정한다.")
    @Test
    void updateByGuestUser() throws Exception {
        CommentResponse commentResponse = 비로그인_댓글_등록됨_Response_반환("content1", "url");
        UserResponse userResponse = commentResponse.getUser();
        Long commentId = commentResponse.getId();

        mockMvc.perform(patch("/api/v1/comments/{id}", commentId)
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(
                new CommentUpdateRequest(userResponse.getId(), "password", "updateContent"))))
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
                    fieldWithPath("content").type(JsonFieldType.STRING).description("수정 내용")
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

        mockMvc.perform(patch("/api/v1/comments/{id}", commentId)
            .contentType(MediaType.APPLICATION_JSON)
            .content(
                asJsonString(new CommentUpdateRequest(user.getId(), "invalid", "updateContent"))))
            .andExpect(status().isUnauthorized())
            .andExpect(jsonPath("$.code").value(901))
            .andDo(document("api/v1/comments/patch/fail-guest-password-wrong",
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
            .header("Authorization", "Bearer " + token))
            .andExpect(status().isNoContent())
            .andDo(document("api/v1/comments/delete/success-admin-user",
                requestHeaders(
                    headerWithName("Authorization").description("관리자의 JWT - Bearer 토큰")
                )
            ));
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

    @DisplayName("댓글 좋아요를 누른다.")
    @Test
    void likeComment() throws Exception {
        CommentResponse commentResponse = 소셜_로그인_댓글_등록됨_Response_반환("content", "url");

        mockMvc.perform(post("/api/v1/comments/{id}/like", commentResponse.getId())
            .header("Authorization", "Bearer " + token)
        )
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
            .content(asJsonString(new CommentCreateRequest(null, null, secretKey, content, url))))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.user..type").value("SocialLoginUser"));
    }

    private ResultActions 소셜_로그인_댓글_좋아요_누름(String content, String url, Long id) throws Exception {
        return mockMvc.perform(post("/api/v1/comments/{id}/like", id)
            .contentType(MediaType.APPLICATION_JSON)
            .header("Authorization", "Bearer " + token)
            .content(asJsonString(new CommentCreateRequest(null, null, secretKey, content, url))))
            .andExpect(status().isNoContent());
    }

    private CommentResponse 소셜_로그인_댓글_등록됨_Response_반환(String content, String url) throws Exception {
        String responseJson = 소셜_로그인_댓글_등록됨(content, url).andReturn().getResponse()
            .getContentAsString();
        return new ObjectMapper().readValue(responseJson, CommentResponse.class);
    }

    private ResultActions 비로그인_댓글_등록됨(String content, String url) throws Exception {
        return mockMvc.perform(post("/api/v1/comments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(
                new CommentCreateRequest("guest", "password", secretKey, content, url))))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.user..type").value("GuestUser"));
    }

    private CommentResponse 비로그인_댓글_등록됨_Response_반환(String content, String url) throws Exception {
        String responseJson = 비로그인_댓글_등록됨(content, url).andReturn().getResponse()
            .getContentAsString();
        return new ObjectMapper().readValue(responseJson, CommentResponse.class);
    }

}
