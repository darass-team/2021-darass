package com.darass.darass.user.domain;

import javax.persistence.Entity;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
public class GuestUser extends User {

    private String password;

    private GuestUser(String nickName, String password) {
        super(nickName);
        this.password = password;
    }

}
