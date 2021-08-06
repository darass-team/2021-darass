package com.darass.darass.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SubCommentReadRequestByPagination {

    private String url;

    private String projectKey;

    private Integer page;

    private Integer size;
}
