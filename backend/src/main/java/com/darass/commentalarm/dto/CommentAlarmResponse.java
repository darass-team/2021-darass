package com.darass.commentalarm.dto;

import com.darass.comment.dto.CommentResponse;
import com.darass.commentalarm.domain.CommentAlarmType;
import com.darass.user.dto.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommentAlarmResponse {

    private CommentAlarmType commentAlarmType;

    private UserResponse user;

    private CommentResponse comment;

    public static CommentAlarmResponse of(CommentAlarmType commentAlarmType, UserResponse user, CommentResponse comment) {
        return new CommentAlarmResponse(commentAlarmType, user, comment);
    }

}
