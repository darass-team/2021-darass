package com.darass.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommentReadRequestByPagination {

    private String sortOption;
    private String url;
    private String projectKey;
    private Integer page;
    private Integer size;
}
