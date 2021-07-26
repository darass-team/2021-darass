package com.darass.darass.user.domain;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.LAZY;

import com.darass.darass.comment.domain.Comment;
import com.darass.darass.common.domain.BaseTimeEntity;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "user_type")
@Entity
public abstract class User extends BaseTimeEntity {

    @OneToMany(mappedBy = "user", fetch = LAZY, cascade = ALL, orphanRemoval = true)
    private final List<Comment> comments = new ArrayList<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nickName;

    @Column
    private String profileImageUrl;

    @Column(name = "user_type", insertable = false, updatable = false)
    private String userType;

    public User(String nickName) {
        this.nickName = nickName;
    }

    public User(String nickName, String profileImageUrl) {
        this(nickName);
        this.profileImageUrl = profileImageUrl;
    }

    public User(Long id, String nickName, String profileImageUrl, String userType) {
        this(nickName, profileImageUrl);
        this.id = id;
        this.userType = userType;
    }

    public abstract boolean isLoginUser();

    public abstract boolean isValidGuestPassword(String guestUserPassword);

    public boolean isSameUser(User user) {
        return this.id.equals(user.id);
    }

    public void changeNickName(String nickName) {
        this.nickName = nickName;
    }

    public void changeProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

}
