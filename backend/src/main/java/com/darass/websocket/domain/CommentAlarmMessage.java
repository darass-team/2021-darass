package com.darass.websocket.domain;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentAlarmMessage {

    private AlarmMessageType alarmMessageType;
    private LocalDateTime createDate;
    private String sender;
    private String url;
    private String content;

}