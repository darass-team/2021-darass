package com.darass.user.dto;

import com.darass.user.domain.User;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {

    private Long id;

    private String nickName;

    private String type;

    private String profileImageUrl;

    private Boolean hasRecentAlarm;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime createdDate;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime modifiedDate;

    public static UserResponse of(User user) {
        return new UserResponse(user.getId(), user.getNickName(), user.getUserType(), user.getProfileImageUrl(),
            user.getHasRecentAlarm(), user.getCreatedDate(), user.getModifiedDate());
    }
}
