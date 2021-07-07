package com.darass.darass.user.domain;

import javax.persistence.Entity;

@Entity
public class GuestUser extends User {

    private String password;
}
