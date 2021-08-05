package com.darass.darass.comment.dto;

import com.darass.darass.comment.domain.Comment;
import com.darass.darass.comment.domain.CommentLike;
import com.darass.darass.user.dto.UserResponse;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommentReadResponseInProject {

    private Long id;

    private String content;

    private String url;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime createdDate;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime modifiedDate;

    private List<UserResponse> likingUsers;

    private UserResponse user;

    public static CommentReadResponseInProject of(Comment comment, UserResponse userResponse) {
        return new CommentReadResponseInProject(comment.getId(), comment.getContent(), comment.getUrl(),
            comment.getCreatedDate(), comment.getModifiedDate(), parseLikingUser(comment.getCommentLikes()), userResponse);
    }

    private static List<UserResponse> parseLikingUser(List<CommentLike> users) {
        return users.stream()
            .map(it -> UserResponse.of(it.getUser()))
            .collect(Collectors.toList());
    }
}
