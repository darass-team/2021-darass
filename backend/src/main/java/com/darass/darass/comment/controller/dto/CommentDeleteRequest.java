package com.darass.darass.comment.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
//@NoArgsConstructor
//@Setter
public class CommentDeleteRequest {
    private Long guestUserId;
    private String guestUserPassword;
}
