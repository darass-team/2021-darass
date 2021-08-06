package com.darass.darass.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommentReadRequestBySearch {

    private String sortOption;

    private String projectKey;

    private String keyword;

    private Integer page;

    private Integer size;

}
