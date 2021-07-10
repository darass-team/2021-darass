package com.darass.darass.project.acceptance;

import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.darass.darass.AcceptanceTest;
import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.project.controller.dto.ProjectRequest;
import com.darass.darass.user.domain.GuestUser;
import com.darass.darass.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

@DisplayName("Project 인수 테스트")
public class ProjectAcceptanceTest extends AcceptanceTest {

    @Autowired
    private UserRepository users;
    @Autowired
    private JwtTokenProvider tokenProvider;
    private GuestUser guestUser;
    private String token;

    @BeforeEach
    public void setUser() {
        guestUser = GuestUser.builder()
            .password("password")
            .nickName("익명123")
            .build();
        users.save(guestUser);
        token = tokenProvider.createAccessToken(guestUser.getId().toString());
    }

    @Test
    @DisplayName("/api/v1/projects POST - 성공")
    public void save() throws Exception {
        프로젝트_생성됨()
            .andDo(
                document("api/v1/projects/post",
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

    private ResultActions 프로젝트_생성됨() throws Exception {
        return this.mockMvc.perform(post("/api/v1/projects")
            .contentType(MediaType.APPLICATION_JSON)
            .header("Authorization", "Bearer " + token)
            .content(asJsonString(new ProjectRequest("프로젝트이름", "a1nc3K", guestUser.getId())))
        )
            .andDo(MockMvcResultHandlers.print()) // 로깅
            .andExpect(status().isCreated());

    }

    @Test
    @DisplayName("/api/v1/projects GET - 성공")
    public void findAll() throws Exception {
        프로젝트_생성됨();

        this.mockMvc.perform(get("/api/v1/projects")
            .contentType(MediaType.APPLICATION_JSON)
            .header("Authorization", "Bearer " + token)
        )
            .andDo(MockMvcResultHandlers.print()) // 로깅
            .andExpect(status().isOk())
            .andDo(
                document("api/v1/projects/get",
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
    @DisplayName("/api/v1/projects/{id} GET - 성공")
    public void findOne() throws Exception {
        프로젝트_생성됨();

        this.mockMvc.perform(get("/api/v1/projects/" + guestUser.getId().toString())
            .contentType(MediaType.APPLICATION_JSON)
            .header("Authorization", "Bearer " + token)
            .param("userId", guestUser.getId().toString())
        )
            .andDo(MockMvcResultHandlers.print()) // 로깅
            .andExpect(status().isOk())
            .andDo(
                document("api/v1/projects/{id}/get",
                    requestHeaders(
                        headerWithName("Authorization").description("JWT - Bearer 토큰")
                    ),
                    requestParameters(
                        parameterWithName("userId").description("사용자 id")
                    ),
                    responseFields(
                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("프로젝트 id"),
                        fieldWithPath("name").type(JsonFieldType.STRING).description("프로젝트 이름")
                    ))
            );
    }
}
