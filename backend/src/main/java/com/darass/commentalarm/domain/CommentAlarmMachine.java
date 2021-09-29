package com.darass.commentalarm.domain;

import com.darass.commentalarm.dto.CommentAlarmResponse;
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

    public void sendMessage(CommentAlarm commentAlarm) {
        User receiver = commentAlarm.getReceiver();
        receiver.changeHasRecentAlarm(true);
        CommentAlarmResponse commentAlarmResponse = CommentAlarmResponse.of(commentAlarm);

        simpMessageSendingOperations.convertAndSend(QUEUE_MAIN + receiver.getId(), commentAlarmResponse);
        simpMessageSendingOperations.convertAndSend(QUEUE_MODULE + receiver.getId(), commentAlarmResponse);
    }

}
