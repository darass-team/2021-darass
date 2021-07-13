package com.darass.darass.project.acceptance;

import com.darass.darass.AcceptanceTest;
import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.project.controller.dto.ProjectCreateRequest;
import com.darass.darass.project.controller.dto.ProjectResponse;
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
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("Project 인수 테스트")
public class ProjectAcceptanceTest extends AcceptanceTest {

    @Autowired
    private UserRepository users;
    @Autowired
    private JwtTokenProvider tokenProvider;
    private SocialLoginUser socialLoginUser;
    private String token;

    @BeforeEach
    public void setUser() {
        socialLoginUser = SocialLoginUser
                .builder()
                .nickName("nickname")
                .oauthId("abc13gag")
                .oauthPlatform(OAuthPlatform.KAKAO)
                .email("qkrwotjd1445@naver.com")
                .build();
        users.save(socialLoginUser);
        token = tokenProvider.createAccessToken(socialLoginUser.getId().toString());
    }

    @Test
    @DisplayName("/api/v1/projects POST - 성공")
    public void save() throws Exception {
        프로젝트_생성됨()
                .andDo(
                        document("api/v1/projects/post/1",
                                requestHeaders(
                                        headerWithName("Authorization").description("JWT - Bearer 토큰")
                                ),
                                requestFields(
                                        fieldWithPath("name").type(JsonFieldType.STRING).description("프로젝트 이름"),
                                        fieldWithPath("secretKey").type(JsonFieldType.STRING).description("프로젝트 시크릿 키"),
                                        fieldWithPath("userId").type(JsonFieldType.NUMBER).description("사용자 id")
                                ),
                                responseFields(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("프로젝트 id"),
                                        fieldWithPath("name").type(JsonFieldType.STRING).description("프로젝트 이름")
                                ))
                );
    }

    @Test
    @DisplayName("/api/v1/projects POST - JWT 토큰을 안 넣었을 경우")
    public void save_fail() throws Exception {
        this.mockMvc.perform(post("/api/v1/projects")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(new ProjectCreateRequest("프로젝트이름", "a1nc3K", socialLoginUser.getId())))
        )
                .andExpect(status().isUnauthorized())
                .andDo(
                        document("api/v1/projects/post/2",
                                responseFields(
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                                        fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                                ))
                );
    }

    private ResultActions 프로젝트_생성됨() throws Exception {
        return this.mockMvc.perform(post("/api/v1/projects")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content(asJsonString(new ProjectCreateRequest("프로젝트이름", "a1nc3K", socialLoginUser.getId())))
        )
                .andExpect(status().isCreated());
    }

    private ProjectResponse 프로젝트_생성됨_Response_반환() throws Exception {
        String responseJson = 프로젝트_생성됨().andReturn().getResponse().getContentAsString();
        return new ObjectMapper().readValue(responseJson, ProjectResponse.class);
    }

    @Test
    @DisplayName("/api/v1/projects GET - 성공")
    public void findAll() throws Exception {
        프로젝트_생성됨();

        this.mockMvc.perform(get("/api/v1/projects")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
        )
                .andExpect(status().isOk())
                .andDo(
                        document("api/v1/projects/get/1",
                                requestHeaders(
                                        headerWithName("Authorization").description("JWT - Bearer 토큰")
                                ),
                                responseFields(
                                        fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("프로젝트 id"),
                                        fieldWithPath("[].name").type(JsonFieldType.STRING).description("프로젝트 이름")
                                ))
                );
    }

    @Test
    @DisplayName("/api/v1/projects GET - JWT 토큰을 안 넣었을 경우")
    public void findAll_fail() throws Exception {
        프로젝트_생성됨();

        this.mockMvc.perform(get("/api/v1/projects")
                .contentType(MediaType.APPLICATION_JSON)
        )
                .andExpect(status().isUnauthorized())
                .andDo(
                        document("api/v1/projects/get/2",
                                responseFields(
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                                        fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                                ))
                );
    }

    @Test
    @DisplayName("/api/v1/projects/{id} GET - 성공")
    public void findOne() throws Exception {
        ProjectResponse projectResponse = 프로젝트_생성됨_Response_반환();
        Long projectId = projectResponse.getId();

        this.mockMvc.perform(get("/api/v1/projects/{projectId}", projectId)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .param("userId", socialLoginUser.getId().toString())
        )
                .andExpect(status().isOk())
                .andDo(
                        document("api/v1/projects/{id}/get/1",
                                requestHeaders(
                                        headerWithName("Authorization").description("JWT - Bearer 토큰")
                                ),
                                pathParameters(
                                        parameterWithName("projectId").description("프로젝트 id")
                                ),
                                responseFields(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("프로젝트 id"),
                                        fieldWithPath("name").type(JsonFieldType.STRING).description("프로젝트 이름")
                                ))
                );
    }

    @Test
    @DisplayName("/api/v1/projects/{id} GET - JWT 토큰을 안 넣었을 경우")
    public void findOne_fail() throws Exception {
        ProjectResponse projectResponse = 프로젝트_생성됨_Response_반환();
        Long projectId = projectResponse.getId();

        this.mockMvc.perform(get("/api/v1/projects/" + projectId)
                .contentType(MediaType.APPLICATION_JSON)
                .param("userId", socialLoginUser.getId().toString())
        )
                .andExpect(status().isUnauthorized())
                .andDo(
                        document("api/v1/projects/{id}/get/2",
                                responseFields(
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                                        fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                                ))
                );
    }
}
