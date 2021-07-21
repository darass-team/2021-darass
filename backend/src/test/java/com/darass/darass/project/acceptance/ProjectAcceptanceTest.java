package com.darass.darass.project.acceptance;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.darass.darass.AcceptanceTest;
import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.project.dto.ProjectCreateRequest;
import com.darass.darass.project.dto.ProjectResponse;
import com.darass.darass.project.domain.Project;
import com.darass.darass.project.repository.ProjectRepository;
import com.darass.darass.project.service.CustomSecretKeyFactory;
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

@DisplayName("Project 인수 테스트")
public class ProjectAcceptanceTest extends AcceptanceTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private JwtTokenProvider tokenProvider;
    private SocialLoginUser socialLoginUser;
    private String token;
    private Project project;

    @BeforeEach
    public void setUser() {
        socialLoginUser = SocialLoginUser
            .builder()
            .nickName("nickname")
            .oauthId("abc13gag")
            .oauthPlatform(OAuthPlatform.KAKAO)
            .email("qkrwotjd1445@naver.com")
            .build();
        userRepository.save(socialLoginUser);
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
                        fieldWithPath("name").type(JsonFieldType.STRING).description("프로젝트 이름")
                    ),
                    responseFields(
                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("프로젝트 id"),
                        fieldWithPath("name").type(JsonFieldType.STRING).description("프로젝트 이름"),
                        fieldWithPath("secretKey").type(JsonFieldType.STRING).description("프로젝트 Secret Key"),
                        fieldWithPath("userId").type(JsonFieldType.NUMBER).optional().description("유저 아이디")
                    ))
            );
    }

    @Test
    @DisplayName("/api/v1/projects POST - JWT 토큰을 안 넣었을 경우")
    public void save_fail() throws Exception {
        this.mockMvc.perform(post("/api/v1/projects")
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(new ProjectCreateRequest("프로젝트이름"))))
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
            .content(asJsonString(new ProjectCreateRequest("프로젝트이름")))
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
                        fieldWithPath("[].name").type(JsonFieldType.STRING).description("프로젝트 이름"),
                        fieldWithPath("[].secretKey").type(JsonFieldType.STRING).description("프로젝트 Secret Key"),
                        fieldWithPath("[].userId").type(JsonFieldType.NUMBER).optional().description("유저 아이디")
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
                        fieldWithPath("name").type(JsonFieldType.STRING).description("프로젝트 이름"),
                        fieldWithPath("secretKey").type(JsonFieldType.STRING).description("프로젝트 Secret Key"),
                        fieldWithPath("userId").type(JsonFieldType.NUMBER).optional().description("유저 아이디")
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

    @Test
    @DisplayName("프로젝트 시크릿 키로 유저 id를 조회한다.(프로젝트 주인의 id를 조회한다.)")
    public void findByProjectKey_success() throws Exception {
        // given
        String customProjectSecretKey = "vmnjbajhveraurepiw";
        this.project = Project.builder()
            .secretKeyFactory(new CustomSecretKeyFactory(customProjectSecretKey))
            .user(socialLoginUser)
            .name("깃헙 블로그 프로젝트")
            .build();

        projectRepository.save(project);

        //when
        ResultActions resultActions = 유저_아이디_조회_요청(customProjectSecretKey);

        //then
         유저_아이디_조회됨(resultActions);
    }

    @Test
    @DisplayName("존재하지 않는 프로젝트 시크릿 키로 유저 id를 조회하면 실패한다.")
    public void findByProjectKey_fail() throws Exception {
        // given
        String customProjectSecretKey = "vmnjbajhveraurepiw";
        this.project = Project.builder()
            .secretKeyFactory(new CustomSecretKeyFactory(customProjectSecretKey))
            .user(socialLoginUser)
            .name("깃헙 블로그 프로젝트")
            .build();

        projectRepository.save(project);

        //when
        ResultActions resultActions = 유저_아이디_조회_요청("invalidProjectSecretKey");

        //then
        유저_아이디_조회_실패됨(resultActions);
    }

    private ResultActions 유저_아이디_조회_요청(String projectSecretKey) throws Exception {
        return this.mockMvc.perform(get("/api/v1/projects/user-id")
            .contentType(MediaType.APPLICATION_JSON)
            .param("secretKey", projectSecretKey));
    }


    private void 유저_아이디_조회_실패됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isNotFound());
        유저_아이디_조회_실패됨_rest_doc_작성(resultActions);
    }

    private void 유저_아이디_조회_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
            document("api/v1/projects/user-id/get/success",
                responseFields(
                    fieldWithPath("id").type(JsonFieldType.NUMBER).optional().description("프로젝트 아이디"),
                    fieldWithPath("name").type(JsonFieldType.STRING).optional().description("프로젝트 이름"),
                    fieldWithPath("secretKey").type(JsonFieldType.STRING).optional().description("프로젝트 시크릿 키"),
                    fieldWithPath("userId").type(JsonFieldType.NUMBER).description("유저 아이디")
                )
            )
        );
    }

    private void 유저_아이디_조회됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk());
        String jsonResponse = resultActions.andReturn().getResponse().getContentAsString();
        ProjectResponse projectResponse = new ObjectMapper().readValue(jsonResponse, ProjectResponse.class);

        assertThat(projectResponse.getUserId()).isEqualTo(socialLoginUser.getId());

       유저_아이디_조회_rest_doc_작성(resultActions);
    }

    private void 유저_아이디_조회_실패됨_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
            document("api/v1/projects/user-id/get/fail",
                responseFields(
                    fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                    fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                )
            )
        );
    }

}

