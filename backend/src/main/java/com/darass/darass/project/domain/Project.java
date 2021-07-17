package com.darass.darass.project.domain;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.LAZY;

import com.darass.darass.comment.domain.Comment;
import com.darass.darass.common.domain.BaseTimeEntity;
import com.darass.darass.user.domain.User;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity
@NoArgsConstructor
@Getter
@Table(uniqueConstraints = {
    @UniqueConstraint(
        name = "SECRET_KEY_UNIQUE",
        columnNames = {"secretKey"}
    )})
public class Project extends BaseTimeEntity {

    private static final int ASCII_CODE_OF_0 = 48;
    private static final int ASCII_CODE_OF_z = 122;
    private static final int TARGET_STRING_LENGTH = 10;
    private static final int ASCII_CODE_OF_9 = 57;
    private static final int ASCII_CODE_OF_A = 65;
    private static final int ASCII_CODE_OF_Z = 90;
    private static final int ASCII_CODE_OF_a = 97;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private User user;


    private String name;

    private String secretKey;

    @Transient
    private SecretKeyFactory secretKeyFactory;

    @Builder
    public Project(User user, String name, SecretKeyFactory secretKeyFactory) {
        this.user = user;
        this.name = name;
        this.secretKeyFactory = secretKeyFactory;
        this.secretKey = secretKeyFactory.createSecretKey();
    }

    public boolean isSame(String secretKey) {
        return this.secretKey.equals(secretKey);
    }

}
