package com.darass.darass.comment.controller.dto;

import com.darass.darass.comment.domain.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommentResponse {

    private String content;

    private UserResponse userResponse;

    public static CommentResponse of(Comment comment, UserResponse userResponse) {
        return new CommentResponse(comment.getContent(), userResponse);
    }
}
