package com.darass.user.domain;

import com.darass.common.domain.BaseTimeEntity;
import com.darass.exception.ExceptionWithMessageAndCode;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@EqualsAndHashCode
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "user_type")
@Entity
public abstract class User extends BaseTimeEntity {

    private static final int NICKNAME_LENGTH_LIMIT = 20;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nickName;

    @Column
    private String profileImageUrl;

    @Column(name = "user_type", insertable = false, updatable = false)
    private String userType;

    @Column
    private Boolean hasRecentAlarm = false;

    public User(Long id, String nickName, String profileImageUrl) {
        this(id, nickName, profileImageUrl, null);
    }

    public User(Long id, String nickName, String profileImageUrl, String userType) {
        validateNickName(nickName);
        this.nickName = nickName;
        this.profileImageUrl = profileImageUrl;
        this.id = id;
        this.userType = userType;
    }

    private void validateNickName(String nickName) {
        if (nickName.isBlank() || nickName.length() > NICKNAME_LENGTH_LIMIT) {
            throw ExceptionWithMessageAndCode.INVALID_INPUT_LENGTH.getException();
        }
    }

    public abstract boolean isLoginUser();

    public abstract boolean isValidGuestPassword(String guestUserPassword);

    public abstract boolean isAdminUser(Long id);

    public boolean isSameUser(User user) {
        return this.id.equals(user.id);
    }

    public boolean isSameUser(Long id) {
        return this.id.equals(id);
    }

    public void changeNickName(String nickName) {
        validateNickName(nickName);
        this.nickName = nickName;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public void changeProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    public void changeHasRecentAlarm(boolean hasRecentAlarm) {
        this.hasRecentAlarm = hasRecentAlarm;
    }
}
