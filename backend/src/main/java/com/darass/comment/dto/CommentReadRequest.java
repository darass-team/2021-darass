package com.darass.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommentReadRequest {

    private String sortOption;
    private String url;
    private String projectKey;
}
