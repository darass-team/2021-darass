package com.darass.darass.user.domain;

import javax.persistence.Entity;
import lombok.Builder;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
public class GuestUser extends User {

    private String password;

    @Builder
    private GuestUser(String nickName, String password) {
        super(nickName);
        this.password = password;
    }

    @Override
    public boolean isLoginUser() {
        return false;
    }
}
