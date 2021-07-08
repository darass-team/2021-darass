package com.darass.darass.comment.controller;

import com.darass.darass.comment.controller.dto.CommentCreateRequest;
import com.darass.darass.comment.controller.dto.CommentResponse;
import com.darass.darass.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;

@RestController
@RequestMapping("/api/v1/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<CommentResponse> save(@RequestBody CommentCreateRequest commentRequest, HttpServletRequest httpRequest) {
        String authorization = httpRequest.getHeader("authorization");
        CommentResponse commentResponse = getCommentResponse(authorization, commentRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(commentResponse);
    }

    private CommentResponse getCommentResponse(String authorization, CommentCreateRequest commentRequest) {
        if (authorization == null) {
            return commentService.saveGuestComment(commentRequest);
        }
        return commentService.saveLoginComment(commentRequest);
    }
}
