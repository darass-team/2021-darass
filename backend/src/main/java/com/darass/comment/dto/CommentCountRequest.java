package com.darass.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommentCountRequest {

    private String url;
    private String projectKey;
}
