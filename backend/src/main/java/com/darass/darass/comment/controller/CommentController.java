package com.darass.darass.comment.controller;

import com.darass.darass.auth.oauth.domain.AuthenticationPrincipal;
import com.darass.darass.auth.oauth.domain.RequiredLogin;
import com.darass.darass.comment.dto.CommentCreateRequest;
import com.darass.darass.comment.dto.CommentDeleteRequest;
import com.darass.darass.comment.dto.CommentResponse;
import com.darass.darass.comment.dto.CommentUpdateRequest;
import com.darass.darass.comment.service.CommentService;
import com.darass.darass.user.domain.User;
import java.util.List;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/v1/comments")
@RestController
public class CommentController {

    private final CommentService commentService;

    @GetMapping
    public ResponseEntity<List<CommentResponse>> read2(@RequestParam("sorting") String sorting,
        @RequestParam("url") String url, @RequestParam("projectKey") String projectKey) {
        List<CommentResponse> commentResponses = commentService.findAllCommentsByUrlAndProjectKey(sorting, url, projectKey);
        return ResponseEntity.status(HttpStatus.OK).body(commentResponses);
    }

    @GetMapping("/paging")
    public ResponseEntity<List<CommentResponse>> readByPageRequest2(@RequestParam("sorting") String sorting,
        @RequestParam("url") String url, @RequestParam("projectKey") String projectKey, @RequestParam("page") Integer page,
        @RequestParam("size") Integer size) {
        List<CommentResponse> commentResponses = commentService
            .findAllCommentsByUrlAndProjectKeyUsingPagination(sorting, url, projectKey, page, size);
        return ResponseEntity.status(HttpStatus.OK).body(commentResponses);
    }

    @PostMapping
    public ResponseEntity<CommentResponse> save(@AuthenticationPrincipal User user,
        @Valid @RequestBody CommentCreateRequest commentRequest) {
        CommentResponse commentResponse = commentService.save(user, commentRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(commentResponse);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable("id") Long id, @AuthenticationPrincipal User user,
        @RequestBody CommentUpdateRequest request) {
        commentService.updateContent(id, user, request);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id, @AuthenticationPrincipal User user,
        @ModelAttribute CommentDeleteRequest request) {
        commentService.delete(id, user, request);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<Void> clickLikeButton(@PathVariable("id") Long id, @RequiredLogin User user) {
        commentService.toggleLikeStatus(id, user);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}