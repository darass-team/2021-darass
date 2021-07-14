package com.darass.darass.user.domain;

import com.darass.darass.common.domain.BaseTimeEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "user_type")
@Getter
@NoArgsConstructor
public abstract class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nickName;

    @Column(name = "user_type", insertable = false, updatable = false)
    private String userType;

    public User(String nickName) {
        this.nickName = nickName;
    }

    public abstract boolean isLoginUser();

    public abstract boolean isValidGuestPassword(String guestUserPassword);

    public boolean isSameUser(User user) {
        return this.id.equals(user.id);
    }
}
