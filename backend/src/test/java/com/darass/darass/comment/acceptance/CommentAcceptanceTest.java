package com.darass.darass.comment.acceptance;

import com.darass.darass.AcceptanceTest;
import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.comment.controller.dto.CommentCreateRequest;
import com.darass.darass.project.domain.Project;
import com.darass.darass.project.repository.ProjectRepository;
import com.darass.darass.user.domain.OAuthPlatform;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.repository.UserRepository;
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
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("Comment 인수 테스트")
public class CommentAcceptanceTest extends AcceptanceTest {

    @Autowired
    private UserRepository users;

    @Autowired
    private ProjectRepository projects;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    private SocialLoginUser socialLoginUser;
    private Project project;
    private String token;
    private String secretKey;

    @BeforeEach
    void setUp() {
        setUpUser();

        setUpProject();
    }

    @Test
    @DisplayName("/api/v1/comments POST - 성공 (소셜 로그인 유저)")
    void saveLoginUser() throws Exception {
        소셜_로그인_댓글_등록됨().andDo(
                document("api/v1/comments/post/1",
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
                                fieldWithPath("user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                                fieldWithPath("user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                                fieldWithPath("user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                                fieldWithPath("user.userType").type(JsonFieldType.STRING).description("유저 유형")
                        ))
        );
    }

    @Test
    @DisplayName("/api/v1/comments POST - 성공 (비로그인 유저)")
    void saveGuestUser() throws Exception {
        비로그인_댓글_등록됨().andDo(
                document("api/v1/comments/post/2",
                        requestFields(
                                fieldWithPath("guestNickName").type(JsonFieldType.STRING).description("비로그인 유저 닉네입"),
                                fieldWithPath("guestPassword").type(JsonFieldType.STRING).description("비로그인 유저 비밀번호"),
                                fieldWithPath("projectSecretKey").type(JsonFieldType.STRING).description("프로젝트 시크릿 키"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("댓글 내용"),
                                fieldWithPath("url").type(JsonFieldType.STRING).description("url")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("댓글 id"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("댓글 내용"),
                                fieldWithPath("user").type(JsonFieldType.OBJECT).description("댓글 작성 유저 정보"),
                                fieldWithPath("user.id").type(JsonFieldType.NUMBER).description("유저 id"),
                                fieldWithPath("user.nickName").type(JsonFieldType.STRING).description("유저 닉네임"),
                                fieldWithPath("user.userType").type(JsonFieldType.STRING).description("유저 유형")
                        ))
        );
    }

    @Test
    @DisplayName("/api/v1/comments POST - 프로젝트 시크릿 키 존재하지 않는 경우")
    void saveWithInvalidSecretKey() throws Exception {
        mockMvc.perform(post("/api/v1/comments")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(new CommentCreateRequest("guest", "password", "invalidKey", "content", "url")))
        )
                .andExpect(status().isNotFound())
                .andDo(
                        document("api/v1/comments/post/3",
                                responseFields(
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                                        fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                                ))
                );
    }

    private ResultActions 소셜_로그인_댓글_등록됨() throws Exception {
        return mockMvc.perform(post("/api/v1/comments")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content(asJsonString(new CommentCreateRequest(null, null, secretKey, "content", "url")))
        )
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.user..userType").value("SocialLoginUser"));
    }

    private ResultActions 비로그인_댓글_등록됨() throws Exception {
        return mockMvc.perform(post("/api/v1/comments")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(new CommentCreateRequest("guest", "password", secretKey, "content", "url")))
        )
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.user..userType").value("GuestUser"));
    }

    private void setUpProject() {
        project = Project.builder()
                .name("project")
                .secretKey("secretKey")
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
                .build();
        users.save(socialLoginUser);
        token = jwtTokenProvider.createAccessToken(socialLoginUser.getId().toString());
    }
}
