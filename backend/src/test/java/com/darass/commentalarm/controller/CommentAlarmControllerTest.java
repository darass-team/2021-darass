package com.darass.commentalarm.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.darass.MockSpringContainerTest;
import com.darass.SpringContainerTest;
import com.darass.auth.service.OAuthService;
import com.darass.comment.domain.Comment;
import com.darass.commentalarm.domain.CommentAlarm;
import com.darass.commentalarm.domain.CommentAlarmType;
import com.darass.commentalarm.dto.CommentAlarmResponse;
import com.darass.commentalarm.service.CommentAlarmService;
import com.darass.user.domain.SocialLoginUser;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.Cookie;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

@DisplayName("CommentAlarm 인수 테스트")
class CommentAlarmControllerTest extends MockSpringContainerTest {

    public static final String ACCESS_TOKEN = "accessToken";
    public static final String REFRESH_TOKEN = "refreshToken";
    private static final SocialLoginUser SENDER;
    private static final SocialLoginUser RECEIVER;

    @MockBean
    CommentAlarmService mockCommentAlarmService;

    @MockBean
    OAuthService mockOAuthService;

    static {
        SENDER = SocialLoginUser
            .builder()
            .id(1L)
            .nickName("송신자")
            .oauthId("2312312312")
            .oauthProvider("kakao")
            .email("bbwwpark@naver.com")
            .profileImageUrl("https://imageUrl")
            .refreshToken(REFRESH_TOKEN)
            .userType("SocialLoginUser")
            .build();

        RECEIVER = SocialLoginUser
            .builder()
            .id(2L)
            .nickName("수신자")
            .oauthId("2312312312")
            .oauthProvider("kakao")
            .email("bbwwpark@naver.com")
            .profileImageUrl("https://imageUrl")
            .refreshToken(REFRESH_TOKEN)
            .userType("SocialLoginUser")
            .build();
    }

    @BeforeEach
    void setUp() {
        given(mockOAuthService.findSocialLoginUserByAccessToken(ACCESS_TOKEN)).willReturn(SENDER);
    }

    @DisplayName("유저의 알람 내역을 조회한다.")
    @Test
    void findUser_success() throws Exception {
        //given
        List<CommentAlarmResponse> commentAlarmResponses = new ArrayList<>();

        Comment comment = Comment.builder()
            .content("content")
            .url("url")
            .build();

        comment.updateCreateDate(LocalDateTime.now());
        comment.updateModifiedDate(LocalDateTime.now());

        CommentAlarm commentAlarm = CommentAlarm.builder()
            .commentAlarmType(CommentAlarmType.CREATE_COMMENT)
            .sender(SENDER)
            .receiver(RECEIVER)
            .comment(comment)
            .build();

        CommentAlarmResponse commentAlarmResponse = CommentAlarmResponse.of(commentAlarm);
        commentAlarmResponses.add(commentAlarmResponse);

        given(mockCommentAlarmService.findAllCreatedDateBetween(any(), any(), any())).willReturn(commentAlarmResponses);

        //when
        ResultActions resultActions = this.mockMvc.perform(
            get("/api/v1/comment-alarms")
                .contentType(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + ACCESS_TOKEN)
                .param("startDate", "2000-01-01")
                .param("endDate", "2030-12-31")
                .cookie(new Cookie(REFRESH_TOKEN, "refreshToken"))
        );

        //then
        resultActions
            .andExpect(status().isOk())
            .andDo(document("api/v1/comment-alarms-get",
                requestHeaders(
                    headerWithName("Authorization").description("JWT - Bearer 토큰")
                ),
                requestParameters(
                    parameterWithName("startDate").description("시작 날짜"),
                    parameterWithName("endDate").description("종료 날짜")
                ),
                responseFields(
                    fieldWithPath("[].id").optional().type(JsonFieldType.NUMBER).description("알람 아이디"),
                    fieldWithPath("[].createdDate").optional().type(JsonFieldType.STRING).description("알람 아이디"),
                    fieldWithPath("[].commentAlarmType").type(JsonFieldType.STRING).description("알람 타입"),
                    fieldWithPath("[].sender.id").type(JsonFieldType.NUMBER).description("알람 송신자 유저 아이디"),
                    fieldWithPath("[].sender.nickName").type(JsonFieldType.STRING).description("알람 송신자 유저 닉네임"),
                    fieldWithPath("[].sender.type").type(JsonFieldType.STRING).description("알람 송신자 유저 타입"),
                    fieldWithPath("[].sender.profileImageUrl").type(JsonFieldType.STRING).description("알람 송신자 유저 프로필 이미지 링크"),
                    fieldWithPath("[].sender.hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("알람 송신자 유저 최근 알람 수신 여부"),
                    fieldWithPath("[].sender.createdDate").optional().type(JsonFieldType.STRING).description("알람 송신자 유저 생성일"),
                    fieldWithPath("[].sender.modifiedDate").optional().type(JsonFieldType.STRING).description("알람 송신자 유저 수정일"),
                    fieldWithPath("[].receiver.id").type(JsonFieldType.NUMBER).description("알람 수신자 유저 아이디"),
                    fieldWithPath("[].receiver.nickName").type(JsonFieldType.STRING).description("알람 수신자 유저 닉네임"),
                    fieldWithPath("[].receiver.type").type(JsonFieldType.STRING).description("알람 수신자 유저 타입"),
                    fieldWithPath("[].receiver.profileImageUrl").type(JsonFieldType.STRING).description("알람 수신자 유저 프로필 이미지 링크"),
                    fieldWithPath("[].receiver.hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("알람 수신자 유저 최근 알람 수신 여부"),
                    fieldWithPath("[].receiver.createdDate").optional().type(JsonFieldType.STRING).description("알람 수신자 유저 생성일"),
                    fieldWithPath("[].receiver.modifiedDate").optional().type(JsonFieldType.STRING).description("알람 수신자 유저 수정일"),
                    fieldWithPath("[].comment.id").optional().type(JsonFieldType.NUMBER).description("알람에 해당하는 댓글 아이디"),
                    fieldWithPath("[].comment.content").type(JsonFieldType.STRING).description("알람에 해당하는 댓글 내용"),
                    fieldWithPath("[].comment.url").type(JsonFieldType.STRING).description("알람에 해당하는 댓글이 존재하는 url"),
                    fieldWithPath("[].comment.createdDate").optional().type(JsonFieldType.STRING).description("알람에 해당하는 댓글 생성 시점"),
                    fieldWithPath("[].comment.modifiedDate").optional().type(JsonFieldType.STRING).description("알람에 해당하는 댓글 수정 시점"),
                    fieldWithPath("[].comment.likingUsers").optional().type(JsonFieldType.ARRAY).description("알람에 해당하는 댓글 좋아요 누른 유저 정보"),
                    fieldWithPath("[].comment.user").type(JsonFieldType.OBJECT).description("알람에 해당하는 댓글 작성한 유저 정보"),
                    fieldWithPath("[].comment.user.id").optional().type(JsonFieldType.NUMBER).description("알람에 해당하는 댓글 작성한 유저 아이디"),
                    fieldWithPath("[].comment.user.nickName").type(JsonFieldType.STRING).description("알람에 해당하는 댓글 작성한 유저 닉네임"),
                    fieldWithPath("[].comment.user.type").type(JsonFieldType.STRING).description("알람에 해당하는 댓글 작성한 유저 타입"),
                    fieldWithPath("[].comment.user.profileImageUrl").type(JsonFieldType.STRING).description("알람에 해당하는 댓글 작성한 유저 프로필 이미지"),
                    fieldWithPath("[].comment.user.hasRecentAlarm").type(JsonFieldType.BOOLEAN).description("알람에 해당하는 댓글 작성한 유저 최근 알람 수신 여부"),
                    fieldWithPath("[].comment.user.createdDate").optional().type(JsonFieldType.STRING).description("알람에 해당하는 댓글 작성한 유저 생성 시점"),
                    fieldWithPath("[].comment.user.modifiedDate").optional().type(JsonFieldType.STRING).description("알람에 해당하는 댓글 작성한 유저 수정 시점"),
                    fieldWithPath("[].comment.subComments").optional().type(JsonFieldType.ARRAY).description("알람에 해당하는 댓글 대댓글 정보"),
                    fieldWithPath("[].comment.secret").type(JsonFieldType.BOOLEAN).description("댓글 공개/비공개 여부"),
                    fieldWithPath("[].comment.readable").type(JsonFieldType.BOOLEAN).description("댓글 조회 가능 여부")
                ))
            );
    }
}