package com.darass.darass.comment.controller.dto;

import com.darass.darass.comment.domain.Comment;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponse {

    private Long id;

    private String content;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime createdDate;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime modifiedDate;

    private UserResponse user;

    public static CommentResponse of(Comment comment, UserResponse userResponse) {
        return new CommentResponse(comment.getId(), comment.getContent(), comment.getCreatedDate(), comment.getModifiedDate(), userResponse);
    }
}
