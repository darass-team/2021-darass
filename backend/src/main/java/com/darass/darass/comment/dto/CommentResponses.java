package com.darass.darass.comment.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommentResponses {

    private Long totalComment;
    private Integer totalPage;
    private List<CommentResponse> comments;
}
