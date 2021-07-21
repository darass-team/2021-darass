package com.darass.darass.user.domain;

import javax.persistence.Entity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity
public class GuestUser extends User {

    private String password;

    @Builder
    private GuestUser(String nickName, String password) {
        super(nickName);
        this.password = password;
    }

    @Override
    public String getProfileImageUrl() {
        return "guestProfileImageUrl";
    }

    @Override
    public boolean isLoginUser() {
        return false;
    }

    @Override
    public boolean isValidGuestPassword(String guestUserPassword) {
        return this.password.equals(guestUserPassword);
    }

}
