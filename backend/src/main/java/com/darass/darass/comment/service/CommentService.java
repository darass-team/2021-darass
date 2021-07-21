package com.darass.darass.comment.service;

import com.darass.darass.comment.controller.dto.CommentCreateRequest;
import com.darass.darass.comment.controller.dto.CommentDeleteRequest;
import com.darass.darass.comment.controller.dto.CommentResponse;
import com.darass.darass.comment.controller.dto.CommentUpdateRequest;
import com.darass.darass.comment.controller.dto.UserResponse;
import com.darass.darass.comment.domain.Comment;
import com.darass.darass.comment.domain.Comments;
import com.darass.darass.comment.repository.CommentRepository;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.project.domain.Project;
import com.darass.darass.project.repository.ProjectRepository;
import com.darass.darass.user.domain.GuestUser;
import com.darass.darass.user.domain.User;
import com.darass.darass.user.repository.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final ProjectRepository projects;
    private final UserRepository users;

    public CommentResponse save(User user, CommentCreateRequest commentRequest) {
        if (!user.isLoginUser()) {
            user = savedGuestUser(commentRequest);
        }
        Project project = getBySecretKey(commentRequest);
        Comment comment = savedComment(user, commentRequest, project);
        String userType = users.findUserTypeById(user.getId());
        String profileImageUrl = users.findProfileImageUrlById(user.getId());
        return CommentResponse.of(comment, UserResponse.of(comment.getUser(), userType, profileImageUrl));
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
        return commentRepository.save(comment);
    }

    private User savedGuestUser(CommentCreateRequest commentRequest) {
        User user = GuestUser.builder()
            .nickName(commentRequest.getGuestNickName())
            .password(commentRequest.getGuestPassword())
            .build();
        return users.save(user);
    }


    public List<CommentResponse> findAllCommentsByUrlAndProjectKey(String url, String projectKey) {
        Comments comments = new Comments(commentRepository.findAll());
        List<Comment> matchedComments = comments.match(url, projectKey);

        return matchedComments.stream()
            .map(comment ->
                CommentResponse.of(
                    comment, UserResponse.of(
                        comment.getUser(),
                        users.findUserTypeById(comment.getUserId()),
                        users.findProfileImageUrlById(comment.getUserId())
                    )
                ))
            .collect(Collectors.toList());
    }

    public void updateContent(Long id, User user, CommentUpdateRequest request) {
        user = findRegisteredUser(user, request.getGuestUserId(), request.getGuestUserPassword());
        Comment comment = findCommentById(id);

        validateCommentUpdatableByUser(user, comment);

        comment.changeContent(request.getContent());
        commentRepository.save(comment);
    }

    public void delete(Long id, User user, CommentDeleteRequest request) {
        user = findRegisteredUser(user, request.getGuestUserId(), request.getGuestUserPassword());
        Comment comment = findCommentById(id);
        User adminUser = comment.getProject().getUser();

        validateCommentDeletableByUser(user, adminUser, comment);

        commentRepository.deleteById(id);
    }

    private void validateCommentUpdatableByUser(User user, Comment comment) {
        if (comment.isCommentWriter(user)) {
            return;
        }
        throw ExceptionWithMessageAndCode.UNAUTHORIZED_FOR_COMMENT.getException();
    }

    private void validateCommentDeletableByUser(User user, User adminUser, Comment comment) {
        if (user.isSameUser(adminUser) || comment.isCommentWriter(user)) {
            return;
        }
        throw ExceptionWithMessageAndCode.UNAUTHORIZED_FOR_COMMENT.getException();
    }

    private Comment findCommentById(Long id) {
        return commentRepository.findById(id)
            .orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_COMMENT::getException);
    }

    private User findRegisteredUser(User user, Long guestUserId, String guestUserPassword) {
        if (!user.isLoginUser()) {
            user = users.findById(guestUserId)
                .orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_USER::getException);
            validateGuestUser(user, guestUserPassword);
        }
        return user;
    }

    private void validateGuestUser(User user, String password) {
        if (!user.isValidGuestPassword(password)) {
            throw ExceptionWithMessageAndCode.INVALID_GUEST_PASSWORD.getException();
        }
    }
}
