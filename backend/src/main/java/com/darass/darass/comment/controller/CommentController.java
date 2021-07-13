package com.darass.darass.comment.controller;

import com.darass.darass.auth.oauth.domain.AuthenticationPrincipal;
import com.darass.darass.comment.controller.dto.CommentCreateRequest;
import com.darass.darass.comment.controller.dto.CommentResponse;
import com.darass.darass.comment.controller.dto.CommentUpdateRequest;
import com.darass.darass.comment.service.CommentService;
import com.darass.darass.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<CommentResponse> save(@AuthenticationPrincipal User user, @RequestBody CommentCreateRequest commentRequest) {
        CommentResponse commentResponse = commentService.save(user, commentRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(commentResponse);
    }

    @GetMapping
    public ResponseEntity<List<CommentResponse>> read(@RequestParam("url") String url) {
        List<CommentResponse> commentResponses = commentService.findAllComments(url);
        return ResponseEntity.status(HttpStatus.OK).body(commentResponses);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable("id") Long id, @AuthenticationPrincipal User user,
                                              @RequestBody CommentUpdateRequest request) {
        commentService.updateContent(id, user, request);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        commentService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
