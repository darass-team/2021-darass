package com.darass.exception.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.darass.auth.controller.OAuthController;
import com.darass.auth.controller.argumentresolver.AuthenticationPrincipalArgumentResolver;
import com.darass.auth.dto.TokenRequest;
import com.darass.auth.service.OAuthService;
import com.darass.comment.controller.CommentController;
import com.darass.comment.dto.CommentCreateRequest;
import com.darass.SpringContainerTest;
import com.darass.exception.ExceptionWithMessageAndCode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@DisplayName("ControllerAdvice 클래스")
@AutoConfigureMockMvc
class ControllerAdviceTest extends SpringContainerTest {

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

    @DisplayName("handleBadRequestException 메서드는 BadRequestException 예외가 발생하면 http 응답코드 400을 반환한다.")
    @Test
    void handleBadRequestException() throws Exception {
        OAuthController oAuthController = mock(OAuthController.class);
        given(oAuthController.oauthLogin(any(), any())).willThrow(ExceptionWithMessageAndCode.IO_EXCEPTION.getException());

        mockMvc = MockMvcBuilders
            .standaloneSetup(oAuthController)
            .setControllerAdvice(new ControllerAdvice())
            .build();

        mockMvc.perform(post("/api/v1/login/oauth")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(new TokenRequest("oauthProviderName", "authorizationCode"))))
            .andExpect(status().isBadRequest());
    }

    @DisplayName("handleUnauthorizedException 메서드는 UnauthorizedException 예외가 발생하면 http 응답코드 401를 반환한다.")
    @Test
    void handleUnauthorizedException() throws Exception {
        mockMvc = MockMvcBuilders
            .standaloneSetup(oAuthController)
            .setControllerAdvice(new ControllerAdvice())
            .build();

        mockMvc.perform(post("/api/v1/login/oauth")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(new TokenRequest("oauthProviderName", "authorizationCode"))))
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
            .param("guestUserId", "100")
            .param("guestUserPassword", "password"))
            .andExpect(status().isNotFound());
    }
}