package com.darass.commentalarm.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentAlarmRequest {

    LocalDateTime start;
    LocalDateTime end;

}
