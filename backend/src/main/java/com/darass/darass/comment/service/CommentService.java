package com.darass.darass.comment.service;

import com.darass.darass.comment.domain.Comment;
import com.darass.darass.comment.domain.CommentLike;
import com.darass.darass.comment.domain.CommentStat;
import com.darass.darass.comment.domain.Comments;
import com.darass.darass.comment.domain.SortOption;
import com.darass.darass.comment.dto.CommentCreateRequest;
import com.darass.darass.comment.dto.CommentDeleteRequest;
import com.darass.darass.comment.dto.CommentReadRequest;
import com.darass.darass.comment.dto.CommentReadRequestByPagination;
import com.darass.darass.comment.dto.CommentReadRequestBySearch;
import com.darass.darass.comment.dto.CommentReadRequestInProject;
import com.darass.darass.comment.dto.CommentResponse;
import com.darass.darass.comment.dto.CommentResponses;
import com.darass.darass.comment.dto.CommentStatRequest;
import com.darass.darass.comment.dto.CommentStatResponse;
import com.darass.darass.comment.dto.CommentUpdateRequest;
import com.darass.darass.comment.repository.CommentCountStrategyFactory;
import com.darass.darass.comment.repository.CommentRepository;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.project.domain.Project;
import com.darass.darass.project.repository.ProjectRepository;
import com.darass.darass.user.domain.GuestUser;
import com.darass.darass.user.domain.User;
import com.darass.darass.user.dto.UserResponse;
import com.darass.darass.user.repository.UserRepository;
import com.darass.darass.websocket.domain.AlarmMessageType;
import com.darass.darass.websocket.domain.CommentAlarmMessage;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final CommentCountStrategyFactory commentCountStrategyFactory;
    private final SimpMessageSendingOperations messagingTemplate;

    public CommentResponse save(User user, CommentCreateRequest commentRequest) {
        if (!user.isLoginUser()) {
            user = savedGuestUser(commentRequest);
        }
        Project project = getBySecretKey(commentRequest);
        String userType = userRepository.findUserTypeById(user.getId());

        if (Objects.isNull(commentRequest.getParentId())) {
            Comment comment = saveComment(user, commentRequest, project);
            return CommentResponse.of(comment, UserResponse.of(comment.getUser(), userType));
        }

        Comment subComment = saveSubComment(user, commentRequest, project);
        return CommentResponse.of(subComment, UserResponse.of(subComment.getUser(), userType));
    }

    private User savedGuestUser(CommentCreateRequest commentRequest) {
        User user = GuestUser.builder()
            .nickName(commentRequest.getGuestNickName())
            .password(commentRequest.getGuestPassword())
            .build();
        return userRepository.save(user);
    }

    private Project getBySecretKey(CommentCreateRequest commentRequest) {
        return projectRepository.findBySecretKey(commentRequest.getProjectSecretKey())
            .orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_PROJECT::getException);
    }

    private Comment saveComment(User user, CommentCreateRequest commentRequest, Project project) {
        User projectMaster = project.getUser();

        createCommentAlarmMessage(projectMaster, user, commentRequest, AlarmMessageType.CREATE_COMMENT);

        Comment comment = Comment.builder()
            .user(user)
            .content(commentRequest.getContent())
            .project(project)
            .url(commentRequest.getUrl())
            .build();

        return commentRepository.save(comment);
    }

    private Comment saveSubComment(User user, CommentCreateRequest commentRequest, Project project) {
        Comment parentComment = commentRepository.findById(commentRequest.getParentId())
            .orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_COMMENT::getException);
        validateSubCommentable(parentComment);

        createCommentAlarmMessage(parentComment.getUser(), user, commentRequest, AlarmMessageType.CREATE_SUB_COMMENT);

        Comment comment = Comment.builder()
            .user(user)
            .content(commentRequest.getContent())
            .project(project)
            .url(commentRequest.getUrl())
            .parent(parentComment)
            .build();

        return commentRepository.save(comment);
    }

    private void validateSubCommentable(Comment parentComment) {
        if (parentComment.isSubComment()) {
            throw ExceptionWithMessageAndCode.INVALID_SUB_COMMENT_INDEX.getException();
        }
    }

    @Cacheable(value = "comments", key = "#request.projectKey + #request.url")
    public CommentResponses findAllCommentsByUrlAndProjectKey(CommentReadRequest request) {
        List<Comment> comments = commentRepository
            .findByUrlAndProjectSecretKeyAndParentId(request.getUrl(), request.getProjectKey(), null,
                SortOption.getMatchedSort(request.getSortOption()));

        return new CommentResponses(new Comments(comments).totalCommentWithSubComment(), 1, comments.stream()
            .map(comment -> CommentResponse.of(comment, UserResponse.of(comment.getUser())))
            .collect(Collectors.toList()));
    }

    @Cacheable(value = "comments", key = "#request.projectKey + #request.url")
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

    @Cacheable(value = "comments", key = "#request.projectKey")
    public CommentResponses findAllCommentsInProject(CommentReadRequestInProject request) {
        int pageBasedIndex = request.getPage() - 1;
        try {
            Page<Comment> comments = commentRepository
                .findByProjectSecretKeyAndCreatedDateBetween(
                    request.getProjectKey(),
                    request.getStartDate().atTime(LocalTime.MIN),
                    request.getEndDate().atTime(LocalTime.MAX),
                    PageRequest.of(pageBasedIndex, request.getSize(), SortOption.getMatchedSort(request.getSortOption()))
                );

            return new CommentResponses(new Comments(comments.toList()).totalComment(),
                comments.getTotalPages(), comments.stream()
                .map(comment -> CommentResponse.of(comment, UserResponse.of(comment.getUser())))
                .collect(Collectors.toList()));
        } catch (IllegalArgumentException e) {
            throw ExceptionWithMessageAndCode.PAGE_NOT_POSITIVE_EXCEPTION.getException();
        }
    }

    @Cacheable(value = "comments", key = "#request.projectKey")
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

            return new CommentResponses(new Comments(comments.toList()).totalComment(),
                comments.getTotalPages(), comments.stream()
                .map(comment -> CommentResponse.of(comment, UserResponse.of(comment.getUser())))
                .collect(Collectors.toList()));
        } catch (IllegalArgumentException e) {
            throw ExceptionWithMessageAndCode.PAGE_NOT_POSITIVE_EXCEPTION.getException();
        }
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

    public void toggleLike(Long id, User user) {
        Comment comment = commentRepository.findById(id)
            .orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_COMMENT::getException);

        if (comment.isLikedByUser(user)) {
            comment.deleteCommentLikeByUser(user);
            return;
        }

        CommentCreateRequest commentCreateRequest = CommentCreateRequest.builder()
            .url(comment.getUrl())
            .content(comment.getContent())
            .build();

        createCommentAlarmMessage(comment.getUser(), user, commentCreateRequest, AlarmMessageType.CREATE_COMMENT_LIKE);

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

    private void createCommentAlarmMessage(User receiver, User sender, CommentCreateRequest commentCreateRequest,
        AlarmMessageType alarmMessageType) {
        CommentAlarmMessage commentAlarmMessage = CommentAlarmMessage.builder()
            .alarmMessageType(alarmMessageType)
            .sender(sender.getNickName())
            .url(commentCreateRequest.getUrl())
            .content(commentCreateRequest.getContent())
            .createDate(LocalDateTime.now())
            .build();

        messagingTemplate.convertAndSend("/queue/main" + receiver.getId(), commentAlarmMessage);
        messagingTemplate.convertAndSend("/queue/module" + receiver.getId(), commentAlarmMessage);
    }

}