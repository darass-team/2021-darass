package com.darass.user.domain;

import com.darass.exception.ExceptionWithMessageAndCode;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.PrimaryKeyJoinColumn;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@PrimaryKeyJoinColumn(foreignKey = @ForeignKey(name = "guest_user_fk_user"))
@Entity
public class GuestUser extends User {

    private static final int PASSWORD_LENGTH_LIMIT = 20;

    private String password;

    @Builder
    private GuestUser(Long id, String nickName, String password) {
        super(id, nickName, null);
        validatePasswordLength(password);
        this.password = password;
    }

    private void validatePasswordLength(String password) {
        if (password.length() > PASSWORD_LENGTH_LIMIT) {
            throw ExceptionWithMessageAndCode.INVALID_INPUT_LENGTH.getException();
        }
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
    public boolean isAdminUser(Long id) {
        return false;
    }

    @Override
    public boolean isValidGuestPassword(String guestUserPassword) {
        return this.password.equals(guestUserPassword);
    }

}
