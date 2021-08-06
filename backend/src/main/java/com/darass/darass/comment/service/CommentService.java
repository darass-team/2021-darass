package com.darass.darass.comment.service;

import com.darass.darass.comment.domain.Comment;
import com.darass.darass.comment.domain.CommentLike;
import com.darass.darass.comment.domain.SortOption;
import com.darass.darass.comment.dto.CommentCountRequest;
import com.darass.darass.comment.dto.CommentCountResponse;
import com.darass.darass.comment.dto.CommentCreateRequest;
import com.darass.darass.comment.dto.CommentDeleteRequest;
import com.darass.darass.comment.dto.CommentReadRequestByPagination;
import com.darass.darass.comment.dto.CommentResponse;
import com.darass.darass.comment.dto.CommentUpdateRequest;
import com.darass.darass.comment.dto.SubCommentReadRequestByPagination;
import com.darass.darass.comment.repository.CommentRepository;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.project.domain.Project;
import com.darass.darass.project.repository.ProjectRepository;
import com.darass.darass.user.domain.GuestUser;
import com.darass.darass.user.domain.User;
import com.darass.darass.user.dto.UserResponse;
import com.darass.darass.user.repository.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public CommentResponse save(User user, CommentCreateRequest commentRequest) {
        if (!user.isLoginUser()) {
            user = savedGuestUser(commentRequest);
        }
        Project project = getBySecretKey(commentRequest);
        Comment comment = savedComment(user, commentRequest, project);
        String userType = userRepository.findUserTypeById(user.getId());
        String profileImageUrl = userRepository.findProfileImageUrlById(user.getId());
        return CommentResponse.of(comment, UserResponse.of(comment.getUser(), userType, profileImageUrl));
    }

    public CommentResponse saveSubComment(Long parentId, User user, CommentCreateRequest commentRequest) {
        if (!user.isLoginUser()) {
            user = savedGuestUser(commentRequest);
        }
        Project project = getBySecretKey(commentRequest);
        Comment parentComment = commentRepository.findById(parentId)
            .orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_COMMENT::getException);
        if (parentComment.hasParent()) {
            throw ExceptionWithMessageAndCode.INVALID_SUB_COMMENT_INDEX.getException();
        }
        Comment comment = savedSubComment(user, commentRequest, project, parentComment);
        String userType = userRepository.findUserTypeById(user.getId());
        String profileImageUrl = userRepository.findProfileImageUrlById(user.getId());
        return CommentResponse.of(comment, UserResponse.of(comment.getUser(), userType, profileImageUrl));
    }

    private Project getBySecretKey(CommentCreateRequest commentRequest) {
        return projectRepository.findBySecretKey(commentRequest.getProjectSecretKey())
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

    private Comment savedSubComment(User user, CommentCreateRequest commentRequest, Project project, Comment parentComment) {
        Comment comment = Comment.builder()
            .user(user)
            .content(commentRequest.getContent())
            .project(project)
            .url(commentRequest.getUrl())
            .parent(parentComment)
            .build();
        return commentRepository.save(comment);
    }

    private User savedGuestUser(CommentCreateRequest commentRequest) {
        User user = GuestUser.builder()
            .nickName(commentRequest.getGuestNickName())
            .password(commentRequest.getGuestPassword())
            .build();
        return userRepository.save(user);
    }

    public List<CommentResponse> findAllCommentsByUrlAndProjectKeyUsingPagination(CommentReadRequestByPagination request) {
        int pageBasedIndex = request.getPage() - 1;
        Page<Comment> comments = commentRepository
            .findByUrlAndProjectSecretKeyAndParentId(request.getUrl(), request.getProjectKey(), null,
                PageRequest.of(pageBasedIndex, request.getSize(), SortOption.getMatchedSort(request.getSortOption())));

        return comments.stream()
            .map(comment -> CommentResponse.of(comment, UserResponse.of(comment.getUser())))
            .collect(Collectors.toList());
    }

    public List<CommentResponse> findAllSubCommentsByUrlAndProjectKeyUsingPagination(Long parentId,
        SubCommentReadRequestByPagination request) {
        int pageBasedIndex = request.getPage() - 1;

        //TODO: 프로젝트 키 & URL에 해당하는 부모 id 유효하지 않는 경우 예외 처리

        Page<Comment> comments = commentRepository
            .findByParentId(parentId, PageRequest.of(pageBasedIndex, request.getSize(), SortOption.OTHER.getSort()));

        return comments.stream()
            .map(comment -> CommentResponse.of(comment, UserResponse.of(comment.getUser())))
            .collect(Collectors.toList());
    }

    public CommentCountResponse getCommentCount(CommentCountRequest request) {
        Long count = commentRepository.countCommentByUrlAndProjectSecretKey(request.getUrl(), request.getProjectKey());
        return new CommentCountResponse(count);
    }

    public void updateContent(Long id, User user, CommentUpdateRequest request) { //TODO: 리팩터링 고민
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
            user = userRepository.findById(guestUserId)
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

    public void toggleLikeStatus(Long id, User user) {
        Comment comment = commentRepository.findById(id)
            .orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_COMMENT::getException);

        if (comment.isLikedByUser(user)) {
            comment.deleteCommentLikeByUser(user);
            return;
        }

        comment.addCommentLike(CommentLike.builder()
            .comment(comment)
            .user(user)
            .build());
    }

}
