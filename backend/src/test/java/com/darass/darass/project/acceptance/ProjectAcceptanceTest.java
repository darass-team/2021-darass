package com.darass.darass.project.acceptance;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.darass.darass.AcceptanceTest;
import com.darass.darass.project.controller.dto.ProjectRequest;
import com.darass.darass.user.domain.GuestUser;
import com.darass.darass.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;

public class ProjectAcceptanceTest extends AcceptanceTest {

    @Autowired
    private UserRepository users;

    @Test
    public void test() throws Exception {
        GuestUser guestUser = GuestUser.builder()
            .password("abc")
            .nickName("aa")
            .build();
        GuestUser savedUser = users.save(guestUser);

        this.mockMvc.perform(post("/api/v1/projects")
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(new ProjectRequest("asdf", "aaaa", savedUser.getId())))
        )
            .andExpect(status().isCreated())
            .andDo(
                document("projects/test/test",
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
}
