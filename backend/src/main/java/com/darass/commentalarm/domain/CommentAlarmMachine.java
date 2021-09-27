package com.darass.commentalarm.domain;

import com.darass.user.domain.User;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class CommentAlarmMachine {

    public static final String QUEUE_MAIN = "/queue/main";
    public static final String QUEUE_MODULE = "/queue/module";

    private final SimpMessageSendingOperations simpMessageSendingOperations;

    public void sendMessage(User receiver, CommentAlarm commentAlarm) {
        receiver.changeHasRecentAlarm(true);

        simpMessageSendingOperations.convertAndSend(QUEUE_MAIN + receiver.getId(), commentAlarm);
        simpMessageSendingOperations.convertAndSend(QUEUE_MODULE + receiver.getId(), commentAlarm);
    }

}
