package com.darass.comment.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponses {

    private Long totalComment;
    private Integer totalPage;
    private List<CommentResponse> comments;
}
