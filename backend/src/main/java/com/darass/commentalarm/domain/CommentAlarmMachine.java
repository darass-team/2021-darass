package com.darass.commentalarm.domain;

import com.darass.commentalarm.dto.CommentAlarmResponse;
import com.darass.user.domain.User;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class CommentAlarmMachine {

    public static final String QUEUE_MAIN = "/queue/main";
    public static final String QUEUE_MODULE = "/queue/module";

    private SimpMessagingTemplate simpMessagingTemplate;

    public void sendMessage(CommentAlarm commentAlarm) {
        User receiver = commentAlarm.getReceiver();
        receiver.changeHasRecentAlarm(true);
        CommentAlarmResponse commentAlarmResponse = CommentAlarmResponse.of(commentAlarm);

        simpMessagingTemplate.convertAndSend(QUEUE_MAIN + receiver.getId(), commentAlarmResponse);
        simpMessagingTemplate.convertAndSend(QUEUE_MODULE + receiver.getId(), commentAlarmResponse);
    }

}
