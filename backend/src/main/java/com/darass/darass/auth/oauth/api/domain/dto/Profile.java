package com.darass.darass.auth.oauth.api.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Profile {

    private String nickname;

    @JsonProperty("thumbnail_image_url")
    private String thumbnailImageUrl;

}
