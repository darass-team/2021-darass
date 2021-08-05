package com.darass.darass.project.domain;

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
import javax.persistence.UniqueConstraint;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@NoArgsConstructor
@Getter
@Table(uniqueConstraints = {
    @UniqueConstraint(
        name = "SECRET_KEY_UNIQUE",
        columnNames = {"secretKey"}
    )})
@Entity
public class Project extends BaseTimeEntity {

    @OneToMany(mappedBy = "project", fetch = LAZY)
    private final List<Comment> comments = new ArrayList<>();
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OnDelete(action = OnDeleteAction.CASCADE)
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

    public Long getAdminUserId() {
        return this.user.getId();
    }

    public void update(String name, String description) {
        this.name = name;
        this.description = description;
    }

}
