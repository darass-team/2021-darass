package com.darass.darass.comment.service;

import com.darass.darass.comment.controller.dto.*;
import com.darass.darass.comment.domain.Comment;
import com.darass.darass.comment.repository.CommentRepository;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.project.domain.Project;
import com.darass.darass.project.repository.ProjectRepository;
import com.darass.darass.user.domain.GuestUser;
import com.darass.darass.user.domain.User;
import com.darass.darass.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository comments;
    private final ProjectRepository projects;
    private final UserRepository users;

    public CommentResponse save(User user, CommentCreateRequest commentRequest) {
        if (!user.isLoginUser()) {
            user = savedGuestUser(commentRequest);
        }
        Project project = getBySecretKey(commentRequest);
        Comment comment = savedComment(user, commentRequest, project);
        String userType = users.findUserTypeById(user.getId());
        return CommentResponse.of(comment, UserResponse.of(comment.getUser(), userType));
    }

    private Project getBySecretKey(CommentCreateRequest commentRequest) {
        return projects.findBySecretKey(commentRequest.getProjectSecretKey())
                .orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_PROJECT::getException);
    }

    private Comment savedComment(User user, CommentCreateRequest commentRequest, Project project) {
        Comment comment = Comment.builder()
                .user(user)
                .content(commentRequest.getContent())
                .project(project)
                .url(commentRequest.getUrl())
                .build();
        return comments.save(comment);
    }

    private User savedGuestUser(CommentCreateRequest commentRequest) {
        User user = GuestUser.builder()
                .nickName(commentRequest.getGuestNickName())
                .password(commentRequest.getGuestPassword())
                .build();
        return users.save(user);
    }

    public List<CommentResponse> findAllComments(String url) {
        List<Comment> foundComments = comments.findByUrl(url);
        return foundComments.stream()
                .map(comment -> CommentResponse.of(
                        comment, UserResponse.of(
                                comment.getUser(), users.findUserTypeById(comment.getUser().getId()))))
                .collect(Collectors.toList());
    }

    public void updateContent(Long id, User user, CommentUpdateRequest request) {
        user = findRegisteredUser(user, request.getGuestUserId(), request.getGuestUserPassword());
        modifiableComment(id, user);
        Comment comment = modifiableComment(id, user);
        comment.changeContent(request.getContent());
        comments.save(comment);
    }

    public void delete(Long id, User user, CommentDeleteRequest request) {
        user = findRegisteredUser(user, request.getGuestUserId(), request.getGuestUserPassword());
        modifiableComment(id, user);
        comments.deleteById(id);
    }

    private Comment modifiableComment(Long id, User user) {
        Comment comment = comments.findById(id)
                .orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_COMMENT::getException);
        matchUserWithComment(user, comment);
        return comment;
    }

    private User findRegisteredUser(User user, Long guestUserId, String guestUserPassword) {
        if (!user.isLoginUser()) {
            user = users.findById(guestUserId)
                    .orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_USER::getException);
            validateGuestUser(user, guestUserPassword);
        }
        return user;
    }

    private void matchUserWithComment(User user, Comment comment) {
        if (!comment.isCommentWriter(user)) {
            throw ExceptionWithMessageAndCode.UNAUTHORIZED_FOR_COMMENT.getException();
        }
    }

    private void validateGuestUser(User user, String password) {
        if (!user.isValidGuestPassword(password)) {
            throw ExceptionWithMessageAndCode.INVALID_GUEST_PASSWORD.getException();
        }
    }
}
