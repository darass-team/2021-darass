package com.darass.websocket.domain;

import com.darass.comment.dto.CommentCreateRequest;
import com.darass.user.domain.User;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class AlarmMessageMachine {

    public static final String QUEUE_MAIN = "/queue/main";
    public static final String QUEUE_MODULE = "/queue/module";

    private final SimpMessageSendingOperations simpMessageSendingOperations;

    public void sendCommentLikeMessage(User receiver, User sender, CommentCreateRequest commentCreateRequest) {
        CommentAlarmMessage commentAlarmMessage = makeCommentAlarmMessage(sender, commentCreateRequest,
            AlarmMessageType.CREATE_COMMENT_LIKE);
        sendMessage(receiver, commentAlarmMessage);
    }

    public void sendCommentCreateMessage(User receiver, User sender, CommentCreateRequest commentCreateRequest) {
        CommentAlarmMessage commentAlarmMessage = makeCommentAlarmMessage(sender, commentCreateRequest,
            AlarmMessageType.CREATE_COMMENT);
        sendMessage(receiver, commentAlarmMessage);
    }

    public void sendSubCommentCreateMessage(User receiver, User sender, CommentCreateRequest commentCreateRequest) {
        CommentAlarmMessage commentAlarmMessage = makeCommentAlarmMessage(sender, commentCreateRequest,
            AlarmMessageType.CREATE_SUB_COMMENT);
        sendMessage(receiver, commentAlarmMessage);
    }

    private void sendMessage(User receiver, CommentAlarmMessage commentAlarmMessage) {
        simpMessageSendingOperations.convertAndSend(QUEUE_MAIN + receiver.getId(), commentAlarmMessage);
        simpMessageSendingOperations.convertAndSend(QUEUE_MODULE + receiver.getId(), commentAlarmMessage);
    }

    private CommentAlarmMessage makeCommentAlarmMessage(User sender, CommentCreateRequest commentCreateRequest,
        AlarmMessageType alarmMessageType) {
        return CommentAlarmMessage.builder()
            .alarmMessageType(alarmMessageType)
            .sender(sender.getNickName())
            .url(commentCreateRequest.getUrl())
            .content(commentCreateRequest.getContent())
            .createDate(LocalDateTime.now())
            .build();
    }

}
