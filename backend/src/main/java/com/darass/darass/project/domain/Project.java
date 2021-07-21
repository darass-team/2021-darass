package com.darass.darass.project.domain;

import com.darass.darass.common.domain.BaseTimeEntity;
import com.darass.darass.user.domain.User;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@Getter
@Table(uniqueConstraints = {
    @UniqueConstraint(
        name = "SECRET_KEY_UNIQUE",
        columnNames = {"secretKey"}
    )})
@Entity
public class Project extends BaseTimeEntity {

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
