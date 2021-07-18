package com.darass.darass.exception.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.darass.darass.auth.oauth.controller.AuthenticationPrincipalArgumentResolver;
import com.darass.darass.auth.oauth.controller.OAuthController;
import com.darass.darass.auth.oauth.service.OAuthService;
import com.darass.darass.comment.controller.CommentController;
import com.darass.darass.comment.controller.dto.CommentCreateRequest;
import com.darass.darass.comment.controller.dto.CommentDeleteRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@DisplayName("ControllerAdvice 클래스")
@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
class ControllerAdviceTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private OAuthController oAuthController;

    @Autowired
    private CommentController commentController;

    @Autowired
    private OAuthService oAuthService;

    @DisplayName("handleMethodArgumentNotValidException 메서드는 MethodArgumentNotValidException 예외가 발생하면 http 응답코드 400을 반환한다.")
    @Test
    void handleMethodArgumentNotValidException() throws Exception {
        mockMvc = MockMvcBuilders
            .standaloneSetup(commentController)
            .setControllerAdvice(new ControllerAdvice())
            .setCustomArgumentResolvers(new AuthenticationPrincipalArgumentResolver(oAuthService))
            .build();

        mockMvc.perform(post("/api/v1/comments")
            .contentType(MediaType.APPLICATION_JSON)
            .header("Authorization", "")
            .content(new ObjectMapper().writeValueAsString(new CommentCreateRequest())))
            .andExpect(status().isBadRequest());
    }

    @DisplayName("handleUnauthorizedException 메서드는 UnauthorizedException 예외가 발생하면 http 응답코드 401를 반환한다.")
    @Test
    void handleUnauthorizedException() throws Exception {
        mockMvc = MockMvcBuilders
            .standaloneSetup(oAuthController)
            .setControllerAdvice(new ControllerAdvice())
            .build();

        mockMvc.perform(get("/api/v1/login/oauth?oauthAccessToken=invalidOauthAccessToken"))
            .andExpect(status().isUnauthorized());
    }

    @DisplayName("handleNotFoundException 메서드는 NotFoundException 예외가 발생하면 http 응답코드 404를 반환한다.")
    @Test
    void handleNotFoundException() throws Exception {
        mockMvc = MockMvcBuilders
            .standaloneSetup(commentController)
            .setControllerAdvice(new ControllerAdvice())
            .setCustomArgumentResolvers(new AuthenticationPrincipalArgumentResolver(oAuthService))
            .build();

        mockMvc.perform(delete("/api/v1/comments/1")
            .contentType(MediaType.APPLICATION_JSON)
            .header("Authorization", "")
            .content(new ObjectMapper().writeValueAsString(new CommentDeleteRequest(100L, "password"))))
            .andExpect(status().isNotFound());
    }

    @DisplayName("handleException 메서드는 Exception 예외가 발생하면 http 응답코드 500을 반환한다.")
    @Test
    void handleException() throws Exception {
        mockMvc = MockMvcBuilders
            .standaloneSetup(oAuthController)
            .setControllerAdvice(new ControllerAdvice())
            .build();

        mockMvc.perform(get("/api/v1/login/oauth"))
            .andExpect(status().isInternalServerError());
    }

}