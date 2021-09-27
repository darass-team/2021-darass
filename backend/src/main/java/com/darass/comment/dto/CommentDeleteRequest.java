package com.darass.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommentDeleteRequest {

    private final Long guestUserId;

    private final String guestUserPassword;
}
