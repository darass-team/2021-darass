package com.darass.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommentReadSecretCommentRequest {

    private Long guestUserId;

    private String guestUserPassword;
}
