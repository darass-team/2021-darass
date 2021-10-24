package com.darass.project.acceptance;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.darass.SpringContainerTest;
import com.darass.auth.infrastructure.JwtTokenProvider;
import com.darass.project.domain.Project;
import com.darass.project.dto.ProjectCreateRequest;
import com.darass.project.dto.ProjectResponse;
import com.darass.project.dto.ProjectUpdateRequest;
import com.darass.project.repository.ProjectRepository;
import com.darass.user.domain.SocialLoginUser;
import com.darass.user.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.stream.IntStream;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

@DisplayName("Project 인수 테스트")
class ProjectAcceptanceTest extends SpringContainerTest {

    private final static String JEKYLL_PROJECT_NAME = "지킬 블로그 프로젝트";

    private final static String JEKYLL_PROJECT_DESCRIPTION = "지킬 블로그 프로젝트 설명";

    private final static String TSTORY_PROJECT_NAME = "티스토리 블로그 프로젝트";

    private final static String TSTORY_PROJECT_DESCRIPTION = "티스토리 블로그 프로젝트 설명";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private JwtTokenProvider tokenProvider;

    private SocialLoginUser socialLoginUser;

    @BeforeEach
    public void setUser() {
        socialLoginUser = SocialLoginUser.builder()
            .nickName("우기")
            .profileImageUrl("http://프로필이미지-url")
            .userType("socialLoginUser")
            .email("bbwwpark@naver.com")
            .oauthProvider("kakao")
            .oauthId("1234")
            .refreshToken("refreshToken")
            .build();

        userRepository.save(socialLoginUser);
    }

    @Test
    @DisplayName("프로젝트를 생성한다.")
    void save_success() throws Exception {
        //given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser);
        ProjectCreateRequest projectCreateRequest = new ProjectCreateRequest(JEKYLL_PROJECT_NAME,
            JEKYLL_PROJECT_DESCRIPTION);

        //when
        ResultActions resultActions = 프로젝트_생성_요청(accessToken, projectCreateRequest);

        //then
        프로젝트_생성됨(resultActions, projectCreateRequest);
    }

    @Test
    @DisplayName("유효하지 않은 토큰을 보낸다면, 프로젝트를 생성을 실패한다.")
    void save_fail() throws Exception {
        //given
        ProjectCreateRequest projectCreateRequest = new ProjectCreateRequest(JEKYLL_PROJECT_NAME,
            JEKYLL_PROJECT_DESCRIPTION);

        //when
        ResultActions resultActions = 프로젝트_생성_요청("invalidAccessToken", projectCreateRequest);

        //then
        유효하지_않은_토큰으로_인해_프로젝트_생성_실패됨(resultActions);
    }

    @Test
    @DisplayName("프로젝트 이름이 중복되면, 프로젝트를 생성을 실패한다.")
    void save_duplicated_project_name_fail() throws Exception {
        //given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser);
        ProjectCreateRequest projectCreateRequest = new ProjectCreateRequest(JEKYLL_PROJECT_NAME,
            JEKYLL_PROJECT_DESCRIPTION);

        //when
        프로젝트_생성_요청(accessToken, projectCreateRequest);
        ResultActions resultActions = 프로젝트_생성_요청(accessToken, projectCreateRequest);

        //then
        중복되는_프로젝트_이름으로_인해_프로젝트_생성_실패됨(resultActions);
    }

    @Test
    @DisplayName("프로젝트 이름 또는 설명의 길이가 적절하지 않으면, 프로젝트를 생성을 실패한다.")
    void save_invalid_length_project_fail() throws Exception {
        //given
        StringBuilder stringBuilder = new StringBuilder();
        IntStream.rangeClosed(0, 100)
            .forEach(it -> stringBuilder.append("invalid"));

        String invalidInput = stringBuilder.toString();
        String accessToken = tokenProvider.createAccessToken(socialLoginUser);
        ProjectCreateRequest projectCreateRequest = new ProjectCreateRequest(invalidInput,
            invalidInput);

        //when
        ResultActions resultActions = 프로젝트_생성_요청(accessToken, projectCreateRequest);

        //then
        입력값_길이_위반으로_인해_프로젝트_생성_실패됨(resultActions);
    }

    @DisplayName("엑세스 토큰으로 프로젝트 다건 조회")
    @Test
    void findByUser() throws Exception {
        // given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser);
        ProjectCreateRequest projectCreateRequest = new ProjectCreateRequest(JEKYLL_PROJECT_NAME,
            JEKYLL_PROJECT_DESCRIPTION);

        ResultActions projectCreateResultActions = 프로젝트_생성_요청(accessToken, projectCreateRequest);
        프로젝트_생성됨(projectCreateResultActions, projectCreateRequest);

        projectCreateRequest = new ProjectCreateRequest(TSTORY_PROJECT_NAME, TSTORY_PROJECT_DESCRIPTION);
        projectCreateResultActions = 프로젝트_생성_요청(accessToken, projectCreateRequest);
        프로젝트_생성됨(projectCreateResultActions, projectCreateRequest);

        //when
        ResultActions resultActions = 엑세스_토큰으로_프로젝트_다건_조회_요청(accessToken);

        //then
        엑세스_토큰으로_프로젝트_다건_조회됨(resultActions);
    }

    @Test
    @DisplayName("유효하지 않은 엑세스 토큰으로 프로젝트 다건 조회를 실패한다.")
    public void findAll_fail() throws Exception {
        // given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser);
        ProjectCreateRequest projectCreateRequest = new ProjectCreateRequest(JEKYLL_PROJECT_NAME,
            JEKYLL_PROJECT_DESCRIPTION);

        ResultActions projectCreateResultActions = 프로젝트_생성_요청(accessToken, projectCreateRequest);
        프로젝트_생성됨(projectCreateResultActions, projectCreateRequest);

        projectCreateRequest = new ProjectCreateRequest(TSTORY_PROJECT_NAME, TSTORY_PROJECT_DESCRIPTION);
        projectCreateResultActions = 프로젝트_생성_요청(accessToken, projectCreateRequest);
        프로젝트_생성됨(projectCreateResultActions, projectCreateRequest);

        //when
        ResultActions resultActions = 엑세스_토큰_미포함_프로젝트_다건_조회_요청();

        //then
        엑세스_토큰으로_프로젝트_다건_조회_실패됨(resultActions);
    }

    private ResultActions 엑세스_토큰_미포함_프로젝트_다건_조회_요청() throws Exception {
        return this.mockMvc.perform(get("/api/v1/projects").contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    @DisplayName("엑세스 토큰과 프로젝트 id로 프로젝트 단건 조회한다.")
    void findOne() throws Exception {
        //given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser);
        ProjectCreateRequest projectCreateRequest = new ProjectCreateRequest(JEKYLL_PROJECT_NAME,
            JEKYLL_PROJECT_DESCRIPTION);
        ResultActions projectCreateResultActions = 프로젝트_생성_요청(accessToken, projectCreateRequest);
        String jsonResponse = projectCreateResultActions.andReturn().getResponse().getContentAsString();
        ProjectResponse projectResponse = new ObjectMapper().readValue(jsonResponse, ProjectResponse.class);
        Long projectId = projectResponse.getId();

        //when
        ResultActions resultActions = 엑세스_토큰과_프로젝트_id로_프로젝트_단건_조회_요청(accessToken, projectId);

        //then
        엑세스_토큰과_프로젝트_id로_프로젝트_단건_조회됨(resultActions, projectId);
    }

    @Test
    @DisplayName("유효하지 않은 엑세스 토큰으로 인해 프로젝트 id로 프로젝트 단건 조회를 실패한다.")
    void findOne_invalid_accessToken_fail() throws Exception {
        //given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser);
        ProjectCreateRequest projectCreateRequest = new ProjectCreateRequest(JEKYLL_PROJECT_NAME,
            JEKYLL_PROJECT_DESCRIPTION);
        ResultActions projectCreateResultActions = 프로젝트_생성_요청(accessToken, projectCreateRequest);
        String jsonResponse = projectCreateResultActions.andReturn().getResponse().getContentAsString();
        ProjectResponse projectResponse = new ObjectMapper().readValue(jsonResponse, ProjectResponse.class);
        Long projectId = projectResponse.getId();

        //when
        ResultActions resultActions = 엑세스_토큰과_프로젝트_id로_프로젝트_단건_조회_요청("Invalid " + accessToken, projectId);

        //then
        유효하지_않은_엑세스_토큰으로_인해_프로젝트_id로_프로젝트_단건_조회_실패됨(resultActions);
    }

    @Test
    @DisplayName("유효하지 않은 프로젝트 id로 인해 프로젝트 단건 조회를 실패한다.")
    void findOne_invalid_projectId_fail() throws Exception {
        //given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser);
        ProjectCreateRequest projectCreateRequest = new ProjectCreateRequest(JEKYLL_PROJECT_NAME,
            JEKYLL_PROJECT_DESCRIPTION);
        프로젝트_생성_요청(accessToken, projectCreateRequest);

        //when
        ResultActions resultActions = 엑세스_토큰과_프로젝트_id로_프로젝트_단건_조회_요청(accessToken, 100L);

        //then
        유효하지_않은_프로젝트_id로_인해_프로젝트_단건_조회_실패됨(resultActions);
    }

    @Test
    @DisplayName("프로젝트 시크릿 키로 유저 id를 조회한다.(프로젝트 주인의 id를 조회한다.)")
    void findByProjectKey_success() throws Exception {
        // given
        Project project = makeProject(JEKYLL_PROJECT_NAME, JEKYLL_PROJECT_DESCRIPTION);
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
        Project project = makeProject(JEKYLL_PROJECT_NAME, JEKYLL_PROJECT_DESCRIPTION);
        projectRepository.save(project);

        //when
        ResultActions resultActions = 유저_아이디_조회_요청("invalidProjectSecretKey");

        //then
        유저_아이디_조회_실패됨(resultActions);
    }

    @Test
    @DisplayName("프로젝트 id와 엑세스 토큰으로 프로젝트 단건 삭제한다.")
    public void deleteById_success() throws Exception {
        // given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser);
        Project project = projectRepository.save(makeProject(JEKYLL_PROJECT_NAME, JEKYLL_PROJECT_DESCRIPTION));

        //when
        ResultActions resultActions = 프로젝트_단건_삭제_요청(project.getId(), accessToken);

        //then
        프로젝트_단건_삭제됨(resultActions);
    }

    @Test
    @DisplayName("존재하지 않는 프로젝트 id와 엑세스 토큰으로 프로젝트 단건 삭제를 실패한다.")
    void deleteById_fail() throws Exception {
        // given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser);
        Project project = makeProject(JEKYLL_PROJECT_NAME, JEKYLL_PROJECT_DESCRIPTION);
        projectRepository.save(project);

        //when
        ResultActions resultActions = 프로젝트_단건_삭제_요청(100L, accessToken);

        //then
        프로젝트_단건_삭제_실패됨(resultActions);
    }

    @Test
    @DisplayName("프로젝트 id와 엑세스 토큰으로 프로젝트를 단건 수정한다.")
    void updateById_success() throws Exception {
        // given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser);
        Project project = makeProject(JEKYLL_PROJECT_NAME, JEKYLL_PROJECT_DESCRIPTION);
        project = projectRepository.save(project);
        ProjectUpdateRequest projectUpdateRequest = new ProjectUpdateRequest(TSTORY_PROJECT_NAME,
            TSTORY_PROJECT_DESCRIPTION);

        //when
        ResultActions resultActions = 프로젝트_단건_수정_요청(project.getId(), accessToken, projectUpdateRequest);

        //then
        프로젝트_단건_수정됨(resultActions, projectUpdateRequest);
    }

    @Test
    @DisplayName("잘못된 프로젝트 id로인해 프로젝트를 단건 수정을 실패한다.")
    void updateById_fail() throws Exception {
        // given
        String accessToken = tokenProvider.createAccessToken(socialLoginUser);
        Project project = makeProject(JEKYLL_PROJECT_NAME, JEKYLL_PROJECT_DESCRIPTION);
        projectRepository.save(project);
        ProjectUpdateRequest projectUpdateRequest = new ProjectUpdateRequest(TSTORY_PROJECT_NAME,
            TSTORY_PROJECT_DESCRIPTION);

        //when
        ResultActions resultActions = 프로젝트_단건_수정_요청(100L, accessToken, projectUpdateRequest);

        //then
        프로젝트_단건_수정_실패됨(resultActions);
    }

    @Test
    @DisplayName("잘못된 프로젝트 입력값 길이로인해 프로젝트를 단건 수정을 실패한다.")
    void updateById_fail_invalid_length() throws Exception {
        // given
        StringBuilder stringBuilder = new StringBuilder();
        IntStream.rangeClosed(0, 100)
            .forEach(it -> stringBuilder.append("invalid"));

        String invalidInput = stringBuilder.toString();
        String accessToken = tokenProvider.createAccessToken(socialLoginUser);
        Project project = makeProject(JEKYLL_PROJECT_NAME, JEKYLL_PROJECT_DESCRIPTION);
        projectRepository.save(project);
        ProjectUpdateRequest projectUpdateRequest = new ProjectUpdateRequest(invalidInput,
            invalidInput);

        //when
        ResultActions resultActions = 프로젝트_단건_수정_요청(project.getId(), accessToken, projectUpdateRequest);

        //then
        잘못된_입력값_길이로_인해_프로젝트_단건_수정_실패됨(resultActions);
    }

    private ResultActions 프로젝트_단건_수정_요청(Long projectId, String accessToken, ProjectUpdateRequest projectUpdateRequest)
        throws Exception {
        return this.mockMvc.perform(patch("/api/v1/projects/{projectId}", projectId)
            .contentType(MediaType.APPLICATION_JSON)
            .header("Authorization", "Bearer " + accessToken)
            .header("Cookie", "refreshToken=refreshToken")
            .content(asJsonString(projectUpdateRequest)));
    }

    private void 프로젝트_단건_수정_실패됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isNotFound());
        예외_발생_rest_doc_작성(resultActions, "api/v1/projects/patch/fail");
    }

    private void 잘못된_입력값_길이로_인해_프로젝트_단건_수정_실패됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isBadRequest());
        예외_발생_rest_doc_작성(resultActions, "api/v1/projects/patch/fail-invalid-length");
    }

    private void 프로젝트_단건_수정됨(ResultActions resultActions, ProjectUpdateRequest projectUpdateRequest) throws Exception {
        resultActions.andExpect(status().isOk());
        String jsonResponse = resultActions.andReturn().getResponse().getContentAsString();
        ProjectResponse projectResponse = new ObjectMapper().readValue(jsonResponse, ProjectResponse.class);

        assertThat(projectResponse.getName()).isEqualTo(projectUpdateRequest.getName());
        assertThat(projectResponse.getDescription()).isEqualTo(projectUpdateRequest.getDescription());

        프로젝트_단건_수정됨_rest_doc_작성(resultActions);
    }

    private void 프로젝트_단건_수정됨_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
            document("api/v1/projects/patch/success",
                requestHeaders(
                    headerWithName("Authorization").description("JWT - Bearer 토큰")
                ),
                requestFields(
                    fieldWithPath("name").type(JsonFieldType.STRING).description("프로젝트 이름"),
                    fieldWithPath("description").type(JsonFieldType.STRING).description("프로젝트 설명")
                ),
                responseFields(
                    fieldWithPath("id").type(JsonFieldType.NUMBER).description("프로젝트 id"),
                    fieldWithPath("name").type(JsonFieldType.STRING).description("프로젝트 이름"),
                    fieldWithPath("secretKey").type(JsonFieldType.STRING).description("프로젝트 Secret Key"),
                    fieldWithPath("description").type(JsonFieldType.STRING).description("프로젝트 설명"),
                    fieldWithPath("userId").type(JsonFieldType.NUMBER).optional().description("유저 아이디")
                ))
        );
    }

    private Project makeProject(String name, String description) {
        return Project.builder()
            .user(socialLoginUser)
            .name(name)
            .description(description)
            .build();
    }

    private ResultActions 프로젝트_생성_요청(String accessToken, ProjectCreateRequest projectCreateRequest) throws Exception {
        return this.mockMvc.perform(post("/api/v1/projects")
            .contentType(MediaType.APPLICATION_JSON)
            .header("Authorization", "Bearer " + accessToken)
            .header("Cookie", "refreshToken=refreshToken")
            .content(asJsonString(projectCreateRequest)));
    }

    private void 프로젝트_생성됨(ResultActions resultActions, ProjectCreateRequest projectCreateRequest) throws Exception {
        resultActions.andExpect(status().isCreated());
        String jsonResponse = resultActions.andReturn().getResponse().getContentAsString();
        ProjectResponse projectResponse = new ObjectMapper().readValue(jsonResponse, ProjectResponse.class);

        assertThat(projectResponse.getName()).isEqualTo(projectCreateRequest.getName());
        assertThat(projectResponse.getDescription()).isEqualTo(projectCreateRequest.getDescription());

        프로젝트_생성_rest_doc_작성(resultActions);
    }

    private void 프로젝트_생성_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
            document("api/v1/projects/post/success-save",
                requestHeaders(
                    headerWithName("Authorization").description("JWT - Bearer 토큰")
                ),
                requestFields(
                    fieldWithPath("name").type(JsonFieldType.STRING).description("프로젝트 이름"),
                    fieldWithPath("description").type(JsonFieldType.STRING).description("프로젝트 설명")
                ),
                responseFields(
                    fieldWithPath("id").type(JsonFieldType.NUMBER).description("프로젝트 id"),
                    fieldWithPath("name").type(JsonFieldType.STRING).description("프로젝트 이름"),
                    fieldWithPath("secretKey").type(JsonFieldType.STRING).description("프로젝트 Secret Key"),
                    fieldWithPath("description").type(JsonFieldType.STRING).description("프로젝트 설명"),
                    fieldWithPath("userId").type(JsonFieldType.NUMBER).optional().description("유저 아이디")
                ))
        );
    }

    private void 유효하지_않은_토큰으로_인해_프로젝트_생성_실패됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isUnauthorized());
        예외_발생_rest_doc_작성(resultActions, "api/v1/projects/post/fail-jwt");
    }

    private void 중복되는_프로젝트_이름으로_인해_프로젝트_생성_실패됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isConflict());
        예외_발생_rest_doc_작성(resultActions, "api/v1/projects/post/fail-duplicate-name");
    }

    private void 입력값_길이_위반으로_인해_프로젝트_생성_실패됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isBadRequest());
        예외_발생_rest_doc_작성(resultActions, "api/v1/projects/post/fail-invalid-length");
    }

    private void 예외_발생_rest_doc_작성(ResultActions resultActions, String documentPath) throws Exception {
        resultActions.andDo(
            document(documentPath,
                responseFields(
                    fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                    fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                ))
        );
    }

    private ResultActions 엑세스_토큰으로_프로젝트_다건_조회_요청(String accessToken) throws Exception {
        return this.mockMvc.perform(get("/api/v1/projects")
            .contentType(MediaType.APPLICATION_JSON)
            .header("Authorization", "Bearer " + accessToken)
            .header("Cookie", "refreshToken=refreshToken"));
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
                    fieldWithPath("[].description").type(JsonFieldType.STRING).description("프로젝트 설명"),
                    fieldWithPath("[].userId").type(JsonFieldType.NUMBER).optional().description("유저 아이디")
                ))
        );
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

    private ResultActions 엑세스_토큰과_프로젝트_id로_프로젝트_단건_조회_요청(String accessToken, Long projectId) throws Exception {
        return this.mockMvc.perform(get("/api/v1/projects/{projectId}", projectId)
            .contentType(MediaType.APPLICATION_JSON)
            .header("Authorization", "Bearer " + accessToken)
            .header("Cookie", "refreshToken=refreshToken")
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
                    fieldWithPath("description").type(JsonFieldType.STRING).description("프로젝트 내용"),
                    fieldWithPath("userId").type(JsonFieldType.NUMBER).optional().description("유저 아이디")
                ))
        );
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
                    fieldWithPath("description").type(JsonFieldType.STRING).optional().description("프로젝트 내용"),
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

    private ResultActions 프로젝트_단건_삭제_요청(Long projectId, String accessToken) throws Exception {
        return this.mockMvc.perform(delete("/api/v1/projects/{projectId}", projectId)
            .contentType(MediaType.APPLICATION_JSON)
            .header("Authorization", "Bearer " + accessToken)
            .header("Cookie", "refreshToken=refreshToken"));
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

