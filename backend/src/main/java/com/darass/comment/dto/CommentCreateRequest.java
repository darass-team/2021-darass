package com.darass.comment.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentCreateRequest {

    private String guestNickName;

    private String guestPassword;

    private Long parentId;

    @NotBlank
    private String projectSecretKey;

    @NotNull
    private String content;

    @NotBlank
    private String url;
}
