package com.darass.darass.comment.controller.dto;

import com.darass.darass.comment.domain.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponse {

    private Long id;

    private String content;

    private UserResponse user;

    public static CommentResponse of(Comment comment, UserResponse userResponse) {
        return new CommentResponse(comment.getId(), comment.getContent(), userResponse);
    }
}
