package com.darass.commentalarm.dto;

import com.darass.comment.dto.CommentResponse;
import com.darass.commentalarm.domain.CommentAlarm;
import com.darass.commentalarm.domain.CommentAlarmType;
import com.darass.user.dto.UserResponse;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommentAlarmResponse {

    private Long id;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime createdDate;

    private CommentAlarmType commentAlarmType;

    private UserResponse sender;

    private UserResponse receiver;

    private CommentResponse comment;

    public static CommentAlarmResponse of(CommentAlarm commentAlarm) {
        UserResponse senderResponse = UserResponse.of(commentAlarm.getSender());
        UserResponse receiverResponse = UserResponse.of(commentAlarm.getReceiver());
        CommentResponse commentResponse = CommentResponse.of(commentAlarm.getComment(), senderResponse);

        return new CommentAlarmResponse(commentAlarm.getId(), commentAlarm.getCreatedDate(),
            commentAlarm.getCommentAlarmType(), senderResponse, receiverResponse, commentResponse);
    }

}
