package com.darass.darass.comment.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommentUpdateRequest {

    private Long guestUserId;
    private String guestUserPassword;
    private String content;

    public CommentUpdateRequest(String content) {
        this.content = content;
    }
}
