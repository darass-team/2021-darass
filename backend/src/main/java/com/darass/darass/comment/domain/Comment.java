package com.darass.darass.comment.domain;

import com.darass.darass.project.domain.Project;
import com.darass.darass.user.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@NoArgsConstructor
@Getter
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn
    private User user;

    @ManyToOne
    @JoinColumn
    private Project project;

    private String url;
    private String content;

    @Builder
    public Comment(Long id, User user, Project project, String url, String content) {
        this.id = id;
        this.user = user;
        this.project = project;
        this.url = url;
        this.content = content;
    }

    public void changeContent(String content) {
        this.content = content;
    }
}
