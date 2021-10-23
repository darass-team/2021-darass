package com.darass.comment.service;

import com.darass.comment.domain.Comment;
import com.darass.comment.domain.CommentLike;
import com.darass.comment.domain.CommentStat;
import com.darass.comment.domain.Comments;
import com.darass.comment.domain.SortOption;
import com.darass.comment.dto.CommentCreateRequest;
import com.darass.comment.dto.CommentDeleteRequest;
import com.darass.comment.dto.CommentReadRequest;
import com.darass.comment.dto.CommentReadRequestByPagination;
import com.darass.comment.dto.CommentReadRequestBySearch;
import com.darass.comment.dto.CommentReadRequestInProject;
import com.darass.comment.dto.CommentReadSecretCommentRequest;
import com.darass.comment.dto.CommentResponse;
import com.darass.comment.dto.CommentResponses;
import com.darass.comment.dto.CommentStatRequest;
import com.darass.comment.dto.CommentStatResponse;
import com.darass.comment.dto.CommentUpdateRequest;
import com.darass.comment.repository.CommentCountStrategyFactory;
import com.darass.comment.repository.CommentRepository;
import com.darass.commentalarm.domain.CommentAlarm;
import com.darass.commentalarm.domain.CommentAlarmMachine;
import com.darass.commentalarm.domain.CommentAlarmType;
import com.darass.commentalarm.repository.CommentAlarmRepository;
import com.darass.exception.ExceptionWithMessageAndCode;
import com.darass.project.domain.Project;
import com.darass.project.repository.ProjectRepository;
import com.darass.user.domain.GuestUser;
import com.darass.user.domain.User;
import com.darass.user.dto.UserResponse;
import com.darass.user.repository.UserRepository;
import java.time.LocalTime;
import java.util.List;
import java.util.Objects;
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
    private final CommentAlarmRepository commentAlarmRepository;
    private final CommentCountStrategyFactory commentCountStrategyFactory;
    private final CommentAlarmMachine commentAlarmMachine;

    public CommentResponse save(User user, CommentCreateRequest commentRequest) {
        if (!user.isLoginUser()) {
            user = saveGuestUser(commentRequest);
            user.setUserType("GuestUser");
        }
        Project project = findProjectBySecretKey(commentRequest);
        if (Objects.isNull(commentRequest.getParentId())) {
            return saveComment(user, commentRequest, project);
        }
        return saveSubComment(user, commentRequest, project);
    }

    @Transactional(readOnly = true)
    public CommentResponses findAllCommentsByUrlAndProjectKey(User user, CommentReadRequest request) {
        Comments comments = new Comments(commentRepository
            .findByUrlAndProjectSecretKeyAndParentId(request.getUrl(), request.getProjectKey(), null,
                SortOption.getMatchedSort(request.getSortOption())));

        Project project = projectRepository.findBySecretKey(request.getProjectKey())
            .orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_PROJECT::getException);

        comments.handleSecretComments(user, project.getAdminUserId());

        return new CommentResponses(comments.totalCommentWithSubComment(), 1, comments.getComments().stream()
            .map(comment -> CommentResponse.of(comment, UserResponse.of(comment.getUser())))
            .collect(Collectors.toList()));
    }

    @Transactional(readOnly = true)
    public CommentResponses findAllCommentsByUrlAndProjectKeyUsingPagination(CommentReadRequestByPagination request) {
        int pageBasedIndex = request.getPage() - 1;
        try {
            Page<Comment> comments = commentRepository
                .findByUrlAndProjectSecretKeyAndParentId(request.getUrl(), request.getProjectKey(), null,
                    PageRequest.of(pageBasedIndex, request.getSize(), SortOption.getMatchedSort(request.getSortOption())));

            return new CommentResponses(new Comments(comments.toList()).totalCommentWithSubComment(),
                comments.getTotalPages(), comments.stream()
                .map(comment -> CommentResponse.of(comment, UserResponse.of(comment.getUser())))
                .collect(Collectors.toList()));
        } catch (IllegalArgumentException e) {
            throw ExceptionWithMessageAndCode.PAGE_NOT_POSITIVE_EXCEPTION.getException();
        }
    }

    @Transactional(readOnly = true)
    public CommentResponses findAllCommentsInProject(
        CommentReadRequestInProject request) {
        int pageBasedIndex = request.getPage() - 1;
        try {
            Page<Comment> comments = commentRepository
                .findByProjectSecretKeyAndCreatedDateBetween(
                    request.getProjectKey(),
                    request.getStartDate().atTime(LocalTime.MIN),
                    request.getEndDate().atTime(LocalTime.MAX),
                    PageRequest.of(pageBasedIndex, request.getSize(), SortOption.getMatchedSort(request.getSortOption()))
                );

            return new CommentResponses(comments.getTotalElements(),
                comments.getTotalPages(), comments.stream()
                .map(comment -> CommentResponse.of(comment, UserResponse.of(comment.getUser())))
                .collect(Collectors.toList()));
        } catch (IllegalArgumentException e) {
            throw ExceptionWithMessageAndCode.PAGE_NOT_POSITIVE_EXCEPTION.getException();
        }
    }

    @Transactional(readOnly = true)
    public CommentResponses findAllCommentsInProjectUsingSearch(
        CommentReadRequestBySearch request) {
        int pageBasedIndex = request.getPage() - 1;
        try {
            Page<Comment> comments = commentRepository
                .findByProjectSecretKeyAndContentContainingAndCreatedDateBetween(
                    request.getProjectKey(),
                    request.getKeyword(),
                    request.getStartDate().atTime(LocalTime.MIN),
                    request.getEndDate().atTime(LocalTime.MAX),
                    PageRequest.of(pageBasedIndex, request.getSize(), SortOption.getMatchedSort(request.getSortOption()))
                );

            return new CommentResponses(comments.getTotalElements(),
                comments.getTotalPages(), comments.stream()
                .map(comment -> CommentResponse.of(comment, UserResponse.of(comment.getUser())))
                .collect(Collectors.toList()));
        } catch (IllegalArgumentException e) {
            throw ExceptionWithMessageAndCode.PAGE_NOT_POSITIVE_EXCEPTION.getException();
        }
    }

    public void updateComment(Long id, User user, CommentUpdateRequest request) {
        user = findRegisteredUser(user, request.getGuestUserId(), request.getGuestUserPassword());
        Comment comment = findCommentById(id);

        validateCommentUpdatableOrReadableByUser(user, comment);

        comment.changeContent(request.getContent());
        comment.changeSecretStatus(request.isSecret());
        commentRepository.save(comment);
    }

    public void delete(Long id, User user, CommentDeleteRequest request) {
        user = findRegisteredUser(user, request.getGuestUserId(), request.getGuestUserPassword());
        Comment comment = findCommentById(id);
        User adminUser = comment.getProject().getUser();

        validateCommentDeletableByUser(user, adminUser, comment);

        commentRepository.deleteById(id);
        if (comment.isSubComment()) {
            Comment parent = comment.getParent();
            parent.deleteSubComment(id);
        }
    }

    public void toggleLike(Long id, User user) {
        Comment comment = commentRepository.findById(id)
            .orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_COMMENT::getException);

        if (comment.isLikedByUser(user)) {
            comment.deleteCommentLikeByUser(user);
            return;
        }

        sendCommentLikeAlarm(comment, CommentAlarmType.CREATE_COMMENT_LIKE, user);

        comment.addCommentLike(CommentLike.builder()
            .comment(comment)
            .user(user)
            .build());
    }

    public CommentStatResponse giveStat(CommentStatRequest request) {
        List<CommentStat> commentStats = commentCountStrategyFactory.findStrategy(request.getPeriodicity())
            .calculateCount(request.getProjectKey(), request.getStartDate().atTime(LocalTime.MIN),
                request.getEndDate().atTime(LocalTime.MAX));
        return new CommentStatResponse(commentStats);
    }

    public CommentResponse readSecretComment(Long id, User user, CommentReadSecretCommentRequest request) {
        user = findRegisteredUser(user, request.getGuestUserId(), request.getGuestUserPassword());
        Comment comment = findCommentById(id);

        validateCommentUpdatableOrReadableByUser(user, comment);
        return CommentResponse.of(comment, UserResponse.of(user));
    }

    private void validateCommentUpdatableOrReadableByUser(User user, Comment comment) {
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

    private User saveGuestUser(CommentCreateRequest commentRequest) {
        User user = GuestUser.builder()
            .nickName(commentRequest.getGuestNickName())
            .password(commentRequest.getGuestPassword())
            .build();
        return userRepository.saveAndFlush(user);
    }

    private Project findProjectBySecretKey(CommentCreateRequest commentRequest) {
        return projectRepository.findBySecretKey(commentRequest.getProjectSecretKey())
            .orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_PROJECT::getException);
    }

    private CommentResponse saveComment(User user, CommentCreateRequest commentRequest, Project project) {
        Comment comment = Comment.builder()
            .user(user)
            .content(commentRequest.getContent())
            .project(project)
            .url(commentRequest.getUrl())
            .secret(commentRequest.isSecret())
            .build();

        sendCommentAlarm(comment, CommentAlarmType.CREATE_COMMENT, project.getUser());

        return CommentResponse.of(commentRepository.save(comment), UserResponse.of(comment.getUser()));
    }

    private CommentResponse saveSubComment(User user, CommentCreateRequest commentRequest, Project project) {
        Comment parentComment = commentRepository.findById(commentRequest.getParentId())
            .orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_COMMENT::getException);
        validateSubCommentable(parentComment);

        Comment comment = Comment.builder()
            .user(user)
            .content(commentRequest.getContent())
            .project(project)
            .url(commentRequest.getUrl())
            .parent(parentComment)
            .secret(commentRequest.isSecret())
            .build();

        sendCommentAlarm(comment, CommentAlarmType.CREATE_SUB_COMMENT, parentComment.getUser());

        return CommentResponse.of(commentRepository.save(comment), UserResponse.of(comment.getUser()));
    }

    private void sendCommentAlarm(Comment comment, CommentAlarmType commentAlarmType, User receiver) {
        if (comment.isCommentWriter(receiver)) {
            return;
        }

        CommentAlarm commentAlarm = comment.createCommentAlarm(commentAlarmType, receiver);
        commentAlarmRepository.save(commentAlarm);
        commentAlarmMachine.sendMessage(commentAlarm);
    }

    private void sendCommentLikeAlarm(Comment comment, CommentAlarmType commentAlarmType, User sender) {
        if (comment.isCommentWriter(sender)) {
            return;
        }

        CommentAlarm commentAlarm = comment.createCommentLikeAlarm(commentAlarmType, sender);
        commentAlarmRepository.save(commentAlarm);
        commentAlarmMachine.sendMessage(commentAlarm);
    }

    private void validateSubCommentable(Comment parentComment) {
        if (parentComment.isSubComment()) {
            throw ExceptionWithMessageAndCode.INVALID_SUB_COMMENT_INDEX.getException();
        }
    }
}