package com.darass.comment.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.darass.auth.service.OAuthService;
import com.darass.comment.dto.CommentResponse;
import com.darass.comment.service.CommentService;
import com.darass.exception.httpbasicexception.UnauthorizedException;
import com.darass.slack.SlackMessageSender;
import com.darass.user.domain.GuestUser;
import com.darass.user.domain.SocialLoginUser;
import com.darass.user.dto.UserResponse;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(controllers = CommentController.class)
@DisplayName("Comment 컨트롤러 테스트")
public class CommentControllerTest {

    public static final String ACCESS_TOKEN = "social_login_user_accessToken";

    private static GuestUser guestUser;
    private static SocialLoginUser socialLoginUser;

    @Autowired
    private MockMvc mockMvc;

    static {
        guestUser = GuestUser.builder()
                .id(1L)
                .nickName("user")
                .password("password")
                .build();

        socialLoginUser = SocialLoginUser.builder()
                .id(1L)
                .nickName("우기")
                .profileImageUrl("http://프로필이미지-url")
                .userType("socialLoginUser")
                .email("bbwwpark@naver.com")
                .oauthProvider("kakao")
                .oauthId("1234")
                .build();
    }

    @MockBean
    private CommentService commentService;

    @MockBean
    private OAuthService oAuthService;

    @MockBean
    private SlackMessageSender slackMessageSender;

    @DisplayName("비로그인 유저가 비밀 댓글을 조회한다.")
    @Test
    void readSecretComment_guest_user() throws Exception {
        Long commentId = 1L;
        GuestUser user = new GuestUser();
        given(commentService.readSecretComment(eq(commentId), eq(user), any()))
                .willReturn(new CommentResponse(1L, "content", "url", true, true, LocalDateTime.now(), LocalDateTime.now(),
                        null, UserResponse.of(socialLoginUser), null));

        mockMvc.perform(get("/api/v1/comments/" + commentId + "/secret-comment")
                        .header("Cookie", "refreshToken=refreshToken")
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("guestUserId", String.valueOf(guestUser.getId()))
                        .param("guestUserPassword", guestUser.getPassword()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").value("content"))
                .andExpect(jsonPath("$.secret").value(true));
    }

    @DisplayName("비로그인 유저가 비밀번호를 틀리면 비밀 댓글을 조회할 수 없다.")
    @Test
    void readSecretComment_guest_user_exception() throws Exception {
        Long commentId = 1L;
        GuestUser user = new GuestUser();

        given(commentService.readSecretComment(eq(commentId), eq(user), any()))
                .willThrow(UnauthorizedException.class);

        mockMvc.perform(get("/api/v1/comments/" + commentId + "/secret-comment")
                        .header("Cookie", "refreshToken=refreshToken")
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("guestUserId", String.valueOf(guestUser.getId()))
                        .param("guestUserPassword", "Invalid"))
                .andExpect(status().isUnauthorized());
    }

    @DisplayName("소셜로그인 유저는 남의 비밀 댓글을 조회할 수 없다.")
    @Test
    void readSecretComment_login_user() throws Exception {
        Long commentId = 1L;

        given(oAuthService.findSocialLoginUserByAccessToken(ACCESS_TOKEN))
                .willReturn(socialLoginUser);

        given(commentService.readSecretComment(eq(commentId), eq(socialLoginUser), any()))
                .willThrow(UnauthorizedException.class);

        mockMvc.perform(get("/api/v1/comments/" + commentId + "/secret-comment")
                        .header("Authorization", "Bearer " + ACCESS_TOKEN)
                        .header("Cookie", "refreshToken=refreshToken")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }
}