package com.darass.darass.comment.controller.dto;

import com.darass.darass.user.domain.User;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Getter
@NoArgsConstructor
public class UserResponse {

    private Long id;

    private String nickName;

    private String type;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime createdDate;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime modifiedDate;

    public static UserResponse of(User user, String type) {
        return new UserResponse(user.getId(), user.getNickName(), type, user.getCreatedDate(), user.getModifiedDate());
    }
}
