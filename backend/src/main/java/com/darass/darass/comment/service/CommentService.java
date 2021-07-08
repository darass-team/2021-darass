package com.darass.darass.comment.service;

import com.darass.darass.comment.controller.dto.CommentCreateRequest;
import com.darass.darass.comment.controller.dto.CommentResponse;
import com.darass.darass.comment.controller.dto.UserResponse;
import com.darass.darass.comment.domain.Comment;
import com.darass.darass.comment.repository.CommentRepository;
import com.darass.darass.project.domain.Project;
import com.darass.darass.project.repository.ProjectRepository;
import com.darass.darass.user.domain.GuestUser;
import com.darass.darass.user.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository comments;
    private final ProjectRepository projects;
    private final UserRepository users;

    public CommentResponse saveLoginComment(CommentCreateRequest commentRequest) {
        //TODO : 로그인 유저 저장 기능

        Project project = projects.findBySecretKey(commentRequest.getProjectSecretKey());
        Comment comment = Comment.builder()
                .content(commentRequest.getContent())
                .project(project)
                .url(commentRequest.getUrl())
                .build();
        comments.save(comment);
        String userType = users.findUserTypeById(comment.getUser().getId());
        return CommentResponse.of(comment, UserResponse.of(comment.getUser(), userType));
    }

    public CommentResponse saveGuestComment(CommentCreateRequest commentRequest) {

        GuestUser guestUser = GuestUser.builder()
                .nickName(commentRequest.getGuestNickName())
                .password(commentRequest.getGuestPassword())
                .build();

        users.save(guestUser);

        Project project = projects.findBySecretKey(commentRequest.getProjectSecretKey());
        Comment comment = Comment.builder()
                .user(guestUser)
                .content(commentRequest.getContent())
                .project(project)
                .url(commentRequest.getUrl())
                .build();
        comments.save(comment);

        String userType = users.findUserTypeById(comment.getUser().getId());

        return CommentResponse.of(comment, UserResponse.of(comment.getUser(), userType));
    }

    public List<CommentResponse> findAllComments(String url) {
        List<Comment> foundComments = comments.findByUrl(url);
        List<CommentResponse> commentResponses = new ArrayList<>();
        for (Comment comment : foundComments) {
            String userType = users.findUserTypeById(comment.getId());
            CommentResponse commentResponse = CommentResponse
                .of(comment, UserResponse.of(comment.getUser(), userType));
            commentResponses.add(commentResponse);
        }
        return commentResponses;
    }

    public void delete(Long id) {
        comments.deleteById(id);
    }

    public void updateContent(Long id, String content) {
        Comment comment = comments.findById(id).get();
        comment.changeContent(content);
        comments.save(comment);
    }
}
