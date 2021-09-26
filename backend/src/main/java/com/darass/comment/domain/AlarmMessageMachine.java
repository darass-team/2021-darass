package com.darass.comment.domain;

import com.darass.comment.domain.CommentAlarm;
import com.darass.user.domain.User;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class AlarmMessageMachine {

    public static final String QUEUE_MAIN = "/queue/main";
    public static final String QUEUE_MODULE = "/queue/module";

    private final SimpMessageSendingOperations simpMessageSendingOperations;

    public void sendMessage(User receiver, CommentAlarm commentAlarm) {
        simpMessageSendingOperations.convertAndSend(QUEUE_MAIN + receiver.getId(), commentAlarm);
        simpMessageSendingOperations.convertAndSend(QUEUE_MODULE + receiver.getId(), commentAlarm);
    }

}
