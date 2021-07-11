package com.darass.darass.user.domain;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "user_type")
@Getter
@NoArgsConstructor
public abstract class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nickName;

    @Column(name="user_type", insertable = false, updatable = false)
    private String userType;

    public abstract boolean isLoginUser();

    public User(String nickName) {
        this.nickName = nickName;
    }
}
