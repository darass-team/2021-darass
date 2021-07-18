package com.darass.darass.comment.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentDeleteRequest {

    private Long guestUserId;
    private String guestUserPassword;
}
