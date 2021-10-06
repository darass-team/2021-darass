package com.darass.comment.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.darass.commentalarm.domain.CommentAlarm;
import com.darass.commentalarm.domain.CommentAlarmMachine;
import com.darass.commentalarm.domain.CommentAlarmType;
import com.darass.user.domain.SocialLoginUser;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.support.MessageHeaderAccessor;

@DisplayName("CommentAlarmMachine 클래스")
class CommentAlarmMachineTest {

    private CommentAlarmMachine commentAlarmMachine;
    private StubMessageChannel stubMessageChannel;

    @BeforeEach
    public void setup() {
        stubMessageChannel = new StubMessageChannel();
        commentAlarmMachine = new CommentAlarmMachine(new SimpMessagingTemplate(stubMessageChannel));
    }

    @DisplayName("메세지 브로커에 메세지를 발행하고 구독한다.")
    @Test
    void sendMessage() {
        //given
        SocialLoginUser sender = SocialLoginUser.builder()
            .id(1L)
            .nickName("송신자")
            .build();

        SocialLoginUser receiver = SocialLoginUser.builder()
            .id(2L)
            .nickName("수신자")
            .build();

        Comment comment = Comment.builder()
            .content("content")
            .build();

        CommentAlarm commentAlarm = CommentAlarm.builder()
            .commentAlarmType(CommentAlarmType.CREATE_COMMENT)
            .sender(sender)
            .receiver(receiver)
            .comment(comment)
            .build();

        //when
        commentAlarmMachine.sendMessage(commentAlarm);

        //then
        List<Message<byte[]>> messages = stubMessageChannel.getMessages();
        assertThat(messages.size()).isEqualTo(2);

        SimpMessageHeaderAccessor headerAccessor = MessageHeaderAccessor.getAccessor(messages.get(0), SimpMessageHeaderAccessor.class);
        assertThat(headerAccessor).isNotNull();
        assertThat(headerAccessor.getDestination()).isEqualTo("/queue/main2");

        headerAccessor = MessageHeaderAccessor.getAccessor(messages.get(1), SimpMessageHeaderAccessor.class);
        assertThat(headerAccessor).isNotNull();
        assertThat(headerAccessor.getDestination()).isEqualTo("/queue/module2");
    }

}