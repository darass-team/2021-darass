package com.darass.darass.comment.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentCreateRequest {

    private String guestNickName;

    private String guestPassword;

    private String projectSecretKey;

    private String content;

    private String url;
}
