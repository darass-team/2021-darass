package com.darass.comment.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.darass.WebSocketTestConfig;
import com.darass.comment.dto.CommentCreateRequest;
import com.darass.comment.dto.CommentResponse;
import com.darass.commentalarm.domain.CommentAlarmType;
import com.darass.commentalarm.dto.CommentAlarmResponse;
import com.darass.project.domain.Project;
import com.darass.project.repository.ProjectRepository;
import com.darass.user.domain.GuestUser;
import com.darass.user.domain.SocialLoginUser;
import com.darass.user.domain.User;
import com.darass.user.repository.UserRepository;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.context.annotation.Import;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.Transport;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;


@Import(WebSocketTestConfig.class)
@Transactional
@ActiveProfiles("test")
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class CommentAlarmReceiveTest {

    private final BlockingQueue<CommentAlarmResponse> commentAlarmResponses = new LinkedBlockingDeque<>();
    @LocalServerPort
    protected int port;
    @Autowired
    private CommentService commentService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProjectRepository projectRepository;
    private Project project;

    @BeforeEach
    void setup() {
        SocialLoginUser receiver = userRepository.save(
            SocialLoginUser.builder()
                .id(7777L)
                .nickName("수신자(게시글 주인)")
                .build()
        );

        project = projectRepository.save(
            Project.builder()
                .name("name")
                .user(receiver)
                .description("프로젝트 설명")
                .build()
        );

    }

    @DisplayName("웹 소켓으로 댓글 작성 알람 메세지를 구독한다.")
    @Test
    void subscribe() throws ExecutionException, InterruptedException, TimeoutException {
        //given
        CommentCreateRequest commentCreateRequest = CommentCreateRequest.builder()
            .content("content")
            .guestNickName("송신자(댓글 작성자)")
            .projectSecretKey(project.getSecretKey())
            .url("게시글 url")
            .guestPassword("password")
            .build();

        User sender = GuestUser.builder()
            .nickName("dummy")
            .password("password")
            .build();

        List<Transport> transports = new ArrayList<>();
        transports.add(new WebSocketTransport(new StandardWebSocketClient()));
        SockJsClient sockJsClient = new SockJsClient(transports);
        WebSocketStompClient webSocketStompClient = new WebSocketStompClient(sockJsClient);
        webSocketStompClient.setMessageConverter(new MappingJackson2MessageConverter());

        //when
        StompSession stompSession = webSocketStompClient.connect(
            "ws://localhost:" + port + "/websocket", new StompSessionHandlerAdapter() {
            }
        ).get(60, TimeUnit.SECONDS);

        stompSession.subscribe("/queue/main1", new CommentAlarmResponseStompFrameHandler());
        CommentResponse commentResponse = commentService.save(sender, commentCreateRequest);
        commentService.save(sender, commentCreateRequest);

        //then
        CommentAlarmResponse commentAlarmResponse = commentAlarmResponses.poll(5, TimeUnit.SECONDS);

        assertThat(commentAlarmResponse.getCommentAlarmType()).isEqualTo(CommentAlarmType.CREATE_COMMENT);
        assertThat(commentAlarmResponse.getReceiver().getNickName()).isEqualTo("수신자(게시글 주인)");
        assertThat(commentAlarmResponse.getSender().getNickName()).isEqualTo("송신자(댓글 작성자)");
        assertThat(commentAlarmResponse.getComment().getContent()).isEqualTo(commentResponse.getContent());
    }

    private class CommentAlarmResponseStompFrameHandler implements StompFrameHandler {

        @Override
        public Type getPayloadType(StompHeaders stompHeaders) {
            return CommentAlarmResponse.class;
        }

        @Override
        public void handleFrame(StompHeaders stompHeaders, Object o) {
            System.out.println(o);
            commentAlarmResponses.offer((CommentAlarmResponse) o);

            System.out.println();
        }
    }

}
