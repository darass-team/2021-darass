package com.darass.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class CommentUpdateRequest {

    private Long guestUserId;

    private String guestUserPassword;

    @NonNull
    private String content;

    private boolean secret;
}
