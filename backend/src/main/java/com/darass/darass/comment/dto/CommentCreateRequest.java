package com.darass.darass.comment.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentCreateRequest {

    private String guestNickName;

    private String guestPassword;

    @NotBlank
    private String projectSecretKey;

    @NotNull
    private String content;

    @NotBlank
    private String url;
}
