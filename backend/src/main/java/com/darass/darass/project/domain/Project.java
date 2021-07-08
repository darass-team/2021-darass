package com.darass.darass.project.domain;

import com.darass.darass.user.domain.User;
import lombok.AllArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


@Entity
@AllArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn
    private User user;

    private String name;

    private String secretKey;

    public Project(User user, String name, String secretKey) {
        this.user = user;
        this.name = name;
        this.secretKey = secretKey;
    }
}
