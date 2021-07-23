package com.darass.darass.project.acceptance;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.darass.darass.AcceptanceTest;
import com.darass.darass.auth.oauth.api.domain.OAuthProviderType;
import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.project.domain.Project;
import com.darass.darass.project.dto.ProjectCreateRequest;
import com.darass.darass.project.dto.ProjectResponse;
import com.darass.darass.project.repository.ProjectRepository;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
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

    private Project project;

    private static final String PROJECT_NAME = "지킬 블로그 프로젝트";

    @BeforeEach
    public void setUser() {
        socialLoginUser = SocialLoginUser.builder()
            .nickName("우기")
            .profileImageUrl("http://프로필이미지-url")
            .userType("socialLoginUser")
            .email("bbwwpark@naver.com")
            .oauthProviderType(OAuthProviderType.KAKAO)
            .oauthId("1234")
            .build();

        userRepository.save(socialLoginUser);
    }

    @Test
    @DisplayName("프로젝트를 생성한다.")
    public void save_success() throws Exception {
        //given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser.getId().toString());
        ProjectCreateRequest projectCreateRequest = new ProjectCreateRequest(PROJECT_NAME);

        //when
        ResultActions resultActions = 프로젝트_생성_요청(accessToken, projectCreateRequest);

        //then
        프로젝트_생성됨(resultActions, PROJECT_NAME);
    }

    @Test
    @DisplayName("유효하지 않은 토큰을 보낸다면, 프로젝트를 생성을 실패한다.")
    public void save_fail() throws Exception {
        //given
        ProjectCreateRequest projectCreateRequest = new ProjectCreateRequest(PROJECT_NAME);

        //when
        ResultActions resultActions = 프로젝트_생성_요청("", projectCreateRequest);

        //then
        유효하지_않은_토큰으로_인해_프로젝트_생성_실패됨(resultActions);
    }

    @Test
    @DisplayName("프로젝트 이름이 중복되면, 프로젝트를 생성을 실패한다.")
    public void save_duplicated_project_name_fail() throws Exception {
        //given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser.getId().toString());
        ProjectCreateRequest projectCreateRequest = new ProjectCreateRequest(PROJECT_NAME);

        //when
        프로젝트_생성_요청(accessToken, projectCreateRequest);
        ResultActions resultActions = 프로젝트_생성_요청(accessToken, projectCreateRequest);

        //then
        중복되는_프로젝트_이름으로_인해_프로젝트_생성_실패됨(resultActions);
    }

    private ResultActions 프로젝트_생성_요청(String accessToken, ProjectCreateRequest projectCreateRequest) throws Exception {
        return this.mockMvc.perform(post("/api/v1/projects")
            .contentType(MediaType.APPLICATION_JSON)
            .header("Authorization", "Bearer " + accessToken)
            .content(asJsonString(projectCreateRequest)));
    }

    private void 프로젝트_생성됨(ResultActions resultActions, String projectName) throws Exception {
        resultActions.andExpect(status().isCreated());
        String jsonResponse = resultActions.andReturn().getResponse().getContentAsString();
        ProjectResponse projectResponse = new ObjectMapper().readValue(jsonResponse, ProjectResponse.class);

        assertThat(projectResponse.getName()).isEqualTo(projectName);

        프로젝트_생성_rest_doc_작성(resultActions);
    }

    private void 프로젝트_생성_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
            document("api/v1/projects/post/success-save",
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

    private void 유효하지_않은_토큰으로_인해_프로젝트_생성_실패됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isUnauthorized());
        유효하지_않은_토큰으로_인해_프로젝트_생성_실패_rest_doc_작성(resultActions);
    }


    private void 유효하지_않은_토큰으로_인해_프로젝트_생성_실패_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
            document("api/v1/projects/post/fail-jwt",
                responseFields(
                    fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                    fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                ))
        );
    }

    private void 중복되는_프로젝트_이름으로_인해_프로젝트_생성_실패됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isConflict());
        중복되는_프로젝트_이름으로_인해_프로젝트_생성_실패_rest_doc_작성(resultActions);
    }

    private void 중복되는_프로젝트_이름으로_인해_프로젝트_생성_실패_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
            document("api/v1/projects/post/fail-duplicate-name",
                responseFields(
                    fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                    fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                ))
        );
    }

    @DisplayName("엑세스 토큰으로 프로젝트 다건 조회")
    @Test
    public void findByUser() throws Exception {
        // given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser.getId().toString());
        ProjectCreateRequest projectCreateRequest = new ProjectCreateRequest(PROJECT_NAME);

        ResultActions projectCreateResultActions = 프로젝트_생성_요청(accessToken, projectCreateRequest);
        프로젝트_생성됨(projectCreateResultActions, PROJECT_NAME);

        projectCreateRequest = new ProjectCreateRequest("second " + PROJECT_NAME);
        projectCreateResultActions = 프로젝트_생성_요청(accessToken, projectCreateRequest);
        프로젝트_생성됨(projectCreateResultActions, "second " + PROJECT_NAME);

        //when
        ResultActions resultActions = 엑세스_토큰으로_프로젝트_다건_조회_요청(accessToken);

        //then
        엑세스_토큰으로_프로젝트_다건_조회됨(resultActions);
    }

    private ResultActions 엑세스_토큰으로_프로젝트_다건_조회_요청(String accessToken) throws Exception {
        return this.mockMvc.perform(get("/api/v1/projects")
            .contentType(MediaType.APPLICATION_JSON)
            .header("Authorization", "Bearer " + accessToken));
    }

    private void 엑세스_토큰으로_프로젝트_다건_조회됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk());
        String jsonResponse = resultActions.andReturn().getResponse().getContentAsString();
        List<ProjectResponse> projectResponses = new ObjectMapper().readValue(
            jsonResponse, new ObjectMapper().getTypeFactory().constructCollectionType(List.class, ProjectResponse.class)
        );

        assertThat(projectResponses.size()).isEqualTo(2);

        엑세스_토큰으로_프로젝트_다건_조회됨_rest_doc_작성(resultActions);
    }

    private void 엑세스_토큰으로_프로젝트_다건_조회됨_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
            document("api/v1/projects/get/success-findall",
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
    @DisplayName("유효하지 않은 엑세스 토큰으로 프로젝트 다건 조회를 실패한다.")
    public void findAll_fail() throws Exception {
        // given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser.getId().toString());
        ProjectCreateRequest projectCreateRequest = new ProjectCreateRequest(PROJECT_NAME);

        ResultActions projectCreateResultActions = 프로젝트_생성_요청(accessToken, projectCreateRequest);
        프로젝트_생성됨(projectCreateResultActions, PROJECT_NAME);

        projectCreateRequest = new ProjectCreateRequest("second " + PROJECT_NAME);
        projectCreateResultActions = 프로젝트_생성_요청(accessToken, projectCreateRequest);
        프로젝트_생성됨(projectCreateResultActions, "second " + PROJECT_NAME);

        //when
        ResultActions resultActions = 엑세스_토큰으로_프로젝트_다건_조회_요청("invalidAccessToken");

        //then
        엑세스_토큰으로_프로젝트_다건_조회_실패됨(resultActions);
    }

    private void 엑세스_토큰으로_프로젝트_다건_조회_실패됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isUnauthorized());
        엑세스_토큰으로_프로젝트_다건_조회_실패됨_rest_doc_작성(resultActions);
    }

    private void 엑세스_토큰으로_프로젝트_다건_조회_실패됨_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
            document("api/v1/projects/get/fail-jwt",
                responseFields(
                    fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                    fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                ))
        );
    }

    @Test
    @DisplayName("엑세스 토큰과 프로젝트 id로 프로젝트 단건 조회한다.")
    public void findOne() throws Exception {
        //given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser.getId().toString());
        ProjectCreateRequest projectCreateRequest = new ProjectCreateRequest(PROJECT_NAME);
        ResultActions projectCreateResultActions = 프로젝트_생성_요청(accessToken, projectCreateRequest);
        String jsonResponse = projectCreateResultActions.andReturn().getResponse().getContentAsString();
        ProjectResponse projectResponse = new ObjectMapper().readValue(jsonResponse, ProjectResponse.class);
        Long projectId = projectResponse.getId();

        //when
        ResultActions resultActions = 엑세스_토큰과_프로젝트_id로_프로젝트_단건_조회_요청(accessToken, projectId);

        //then
        엑세스_토큰과_프로젝트_id로_프로젝트_단건_조회됨(resultActions, projectId);
    }

    private ResultActions 엑세스_토큰과_프로젝트_id로_프로젝트_단건_조회_요청(String accessToken, Long projectId) throws Exception {
        return this.mockMvc.perform(get("/api/v1/projects/{projectId}", projectId)
            .contentType(MediaType.APPLICATION_JSON)
            .header("Authorization", "Bearer " + accessToken)
            .param("userId", socialLoginUser.getId().toString()));
    }

    private void 엑세스_토큰과_프로젝트_id로_프로젝트_단건_조회됨(ResultActions resultActions, Long projectId) throws Exception {
        resultActions.andExpect(status().isOk());
        String jsonResponse = resultActions.andReturn().getResponse().getContentAsString();
        ProjectResponse projectResponse = new ObjectMapper().readValue(jsonResponse, ProjectResponse.class);

        assertThat(projectResponse.getId()).isEqualTo(projectId);

        프로젝트_id로_프로젝트_단건_조회됨_rest_doc_작성(resultActions);
    }

    private void 프로젝트_id로_프로젝트_단건_조회됨_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
            document("api/v1/projects/{id}/get/success-findone",
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
    @DisplayName("유효하지 않은 엑세스 토큰으로 인해 프로젝트 id로 프로젝트 단건 조회를 실패한다.")
    public void findOne_invalid_accessToken_fail() throws Exception {
        //given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser.getId().toString());
        ProjectCreateRequest projectCreateRequest = new ProjectCreateRequest(PROJECT_NAME);
        ResultActions projectCreateResultActions = 프로젝트_생성_요청(accessToken, projectCreateRequest);
        String jsonResponse = projectCreateResultActions.andReturn().getResponse().getContentAsString();
        ProjectResponse projectResponse = new ObjectMapper().readValue(jsonResponse, ProjectResponse.class);
        Long projectId = projectResponse.getId();

        //when
        ResultActions resultActions = 엑세스_토큰과_프로젝트_id로_프로젝트_단건_조회_요청("Invalid " + accessToken, projectId);

        //then
        유효하지_않은_엑세스_토큰으로_인해_프로젝트_id로_프로젝트_단건_조회_실패됨(resultActions);
    }


    private void 유효하지_않은_엑세스_토큰으로_인해_프로젝트_id로_프로젝트_단건_조회_실패됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isUnauthorized());
        유효하지_않은_엑세스_토큰으로_인해_프로젝트_id로_프로젝트_단건_조회_실패됨_rest_docs_작성(resultActions);
    }

    private void 유효하지_않은_엑세스_토큰으로_인해_프로젝트_id로_프로젝트_단건_조회_실패됨_rest_docs_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
            document("api/v1/projects/{id}/get/fail-jwt",
                responseFields(
                    fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                    fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                ))
        );
    }

    @Test
    @DisplayName("유효하지 않은 프로젝트 id로 인해 프로젝트 단건 조회를 실패한다.")
    public void findOne_invalid_projectId_fail() throws Exception {
        //given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser.getId().toString());
        ProjectCreateRequest projectCreateRequest = new ProjectCreateRequest(PROJECT_NAME);
        ResultActions projectCreateResultActions = 프로젝트_생성_요청(accessToken, projectCreateRequest);
        String jsonResponse = projectCreateResultActions.andReturn().getResponse().getContentAsString();
        ProjectResponse projectResponse = new ObjectMapper().readValue(jsonResponse, ProjectResponse.class);
        Long projectId = projectResponse.getId();

        //when
        ResultActions resultActions = 엑세스_토큰과_프로젝트_id로_프로젝트_단건_조회_요청(accessToken, 100L);

        //then
        유효하지_않은_프로젝트_id로_인해_프로젝트_단건_조회_실패됨(resultActions);
    }

    private void 유효하지_않은_프로젝트_id로_인해_프로젝트_단건_조회_실패됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isNotFound());
        유효하지_않은_프로젝트_id로_인해_프로젝트_id로_프로젝트_단건_조회_실패됨_rest_docs_작성(resultActions);
    }

    private void 유효하지_않은_프로젝트_id로_인해_프로젝트_id로_프로젝트_단건_조회_실패됨_rest_docs_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
            document("api/v1/projects/{id}/get/fail-projectId",
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
        this.project = Project.builder()
            .user(socialLoginUser)
            .name("깃헙 블로그 프로젝트")
            .build();

        Project savedProject = projectRepository.save(project);

        //when
        ResultActions resultActions = 유저_아이디_조회_요청(savedProject.getSecretKey());

        //then
        유저_아이디_조회됨(resultActions);
    }

    @Test
    @DisplayName("존재하지 않는 프로젝트 시크릿 키로 유저 id를 조회하면 실패한다.")
    public void findByProjectKey_fail() throws Exception {
        // given
        this.project = Project.builder()
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

    @Test
    @DisplayName("프로젝트 id와 엑세스 토큰으로 프로젝트 단건 삭제한다.")
    public void deleteById_success() throws Exception {
        // given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser.getId().toString());

        this.project = Project.builder()
            .user(socialLoginUser)
            .name("깃헙 블로그 프로젝트")
            .build();

        Project savedProject = projectRepository.save(project);
        Long projectId = savedProject.getId();

        //when
        ResultActions resultActions = 프로젝트_단건_삭제_요청(projectId, accessToken);

        //then
        프로젝트_단건_삭제됨(resultActions);
    }

    private ResultActions 프로젝트_단건_삭제_요청(Long projectId, String accessToken) throws Exception {
        return this.mockMvc.perform(delete("/api/v1/projects/{projectId}", projectId)
            .contentType(MediaType.APPLICATION_JSON)
            .header("Authorization", "Bearer " + accessToken));
    }

    private void 프로젝트_단건_삭제됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isNoContent());
        프로젝트_단건_삭제됨_rest_doc_작성(resultActions);
    }

    private void 프로젝트_단건_삭제됨_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
            document("api/v1/projects/{projectId}/delete-success")
        );
    }

    @Test
    @DisplayName("존재하지 않는 프로젝트 id와 엑세스 토큰으로 프로젝트 단건 삭제를 실패한다.")
    public void deleteById_fail() throws Exception {
        // given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser.getId().toString());

        this.project = Project.builder()
            .user(socialLoginUser)
            .name("깃헙 블로그 프로젝트")
            .build();

        Project savedProject = projectRepository.save(project);
        Long projectId = savedProject.getId();

        //when
        ResultActions resultActions = 프로젝트_단건_삭제_요청(100L, accessToken);

        //then
        프로젝트_단건_삭제_실패됨(resultActions);
    }

    private void 프로젝트_단건_삭제_실패됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isNotFound());
        프로젝트_단건_삭제_실패됨_rest_doc_작성(resultActions);
    }

    private void 프로젝트_단건_삭제_실패됨_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
            document("api/v1/projects/{projectId}/delete-fail",
                responseFields(
                    fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                    fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                )
            )
        );
    }
}

