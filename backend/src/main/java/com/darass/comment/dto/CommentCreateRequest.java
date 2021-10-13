package com.darass.comment.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@EqualsAndHashCode
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

    private boolean secret;

    public CommentCreateRequest(String guestNickName, String guestPassword, Long parentId,
        @NotBlank String projectSecretKey, @NotNull String content, @NotBlank String url) {
        this.guestNickName = guestNickName;
        this.guestPassword = guestPassword;
        this.parentId = parentId;
        this.projectSecretKey = projectSecretKey;
        this.content = content;
        this.url = url;
    }
}
