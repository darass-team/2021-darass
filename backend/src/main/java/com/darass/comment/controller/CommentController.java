package com.darass.comment.controller;

import com.darass.auth.domain.AuthenticationPrincipal;
import com.darass.auth.domain.RequiredLogin;
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
import com.darass.comment.service.CommentService;
import com.darass.user.domain.User;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/v1")
@RestController
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/comments")
    public ResponseEntity<CommentResponses> read(@AuthenticationPrincipal User user, @ModelAttribute CommentReadRequest commentReadRequest) {
        CommentResponses commentResponses = commentService
            .findAllCommentsByUrlAndProjectKey(user, commentReadRequest);
        return ResponseEntity.status(HttpStatus.OK).body(commentResponses);
    }

    @GetMapping("/comments/paging")
    public ResponseEntity<CommentResponses> readByPageRequest(
        @ModelAttribute CommentReadRequestByPagination commentReadRequestByPagination) {
        CommentResponses commentResponses = commentService
            .findAllCommentsByUrlAndProjectKeyUsingPagination(commentReadRequestByPagination);
        return ResponseEntity.status(HttpStatus.OK).body(commentResponses);
    }

    @GetMapping("/projects/comments/search/paging")
    public ResponseEntity<CommentResponses> readByPageRequestUsingSearch(
        @ModelAttribute CommentReadRequestBySearch CommentReadRequestBySearch) {
        CommentResponses commentResponses = commentService
            .findAllCommentsInProjectUsingSearch(CommentReadRequestBySearch);
        return ResponseEntity.status(HttpStatus.OK).body(commentResponses);
    }

    @GetMapping("/projects/comments/paging")
    public ResponseEntity<CommentResponses> readByPageRequestInProject(
        @ModelAttribute CommentReadRequestInProject commentReadRequestInProject) {
        CommentResponses commentResponses = commentService
            .findAllCommentsInProject(commentReadRequestInProject);
        return ResponseEntity.status(HttpStatus.OK).body(commentResponses);
    }

    @GetMapping("/comments/stat")
    public ResponseEntity<CommentStatResponse> giveStat(@ModelAttribute CommentStatRequest commentStatRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(commentService.giveStat(commentStatRequest));
    }

    @PostMapping("/comments")
    public ResponseEntity<CommentResponse> save(@AuthenticationPrincipal User user,
        @Valid @RequestBody CommentCreateRequest commentRequest) {
        CommentResponse commentResponse = commentService.save(user, commentRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(commentResponse);
    }

    @GetMapping("/comments/{id}/secret-comment")
    public ResponseEntity<CommentResponse> readSecretComment(@PathVariable("id") Long id, @AuthenticationPrincipal User user,
        @ModelAttribute CommentReadSecretCommentRequest commentReadSecretCommentRequest) {
        return ResponseEntity.ok(commentService.readSecretComment(id, user, commentReadSecretCommentRequest));
    }

    @PatchMapping("/comments/{id}")
    public ResponseEntity<Void> update(@PathVariable("id") Long id, @AuthenticationPrincipal User user,
        @RequestBody CommentUpdateRequest request) {
        commentService.updateComment(id, user, request);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/comments/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id, @AuthenticationPrincipal User user,
        @ModelAttribute CommentDeleteRequest request) {
        commentService.delete(id, user, request);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("/comments/{id}/like")
    public ResponseEntity<Void> toggleLike(@PathVariable("id") Long id, @RequiredLogin User user) {
        commentService.toggleLike(id, user);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}