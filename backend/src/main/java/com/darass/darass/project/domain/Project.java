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

    private String description;

    private String secretKey;

    @Builder
    public Project(Long id, User user, String name, String description) {
        this.id = id;
        this.user = user;
        this.name = name;
        this.description = description;
        this.secretKey = generateSecretKey();
    }

    private String generateSecretKey() {
        SecretKeyFactory secretKeyFactory = new SecretKeyFactory();
        return secretKeyFactory.createSecretKey(String.valueOf(user.getId()));
    }

    public boolean isSame(String secretKey) {
        return this.secretKey.equals(secretKey);
    }

<<<<<<< HEAD
<<<<<<< HEAD
    public Long getAdminUserId() {
        return this.user.getId();
    }
=======
    public void update(String name, String content){
=======
    public void update(String name, String description) {
>>>>>>> 098b264 (feat: 프로젝트 설명 필드 변수명 수정)
        this.name = name;
        this.description = description;
    }

>>>>>>> 9c0d599 (feat: 프로젝트 이름, 설명(content) 수정 api 구현)
}
