package com.darass.darass.auth.oauth.api.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Profile {

    private String nickname;

    private String thumbnail_image_url;
}
