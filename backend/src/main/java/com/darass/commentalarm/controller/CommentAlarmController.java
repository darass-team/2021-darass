package com.darass.commentalarm.controller;

import com.darass.auth.domain.RequiredLogin;
import com.darass.commentalarm.dto.CommentAlarmRequest;
import com.darass.commentalarm.dto.CommentAlarmResponse;
import com.darass.commentalarm.service.CommentAlarmService;
import com.darass.user.domain.SocialLoginUser;
import java.time.LocalTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/v1")
@RestController
public class CommentAlarmController {

    private final CommentAlarmService commentAlarmService;

    @GetMapping("/comment-alarms")
    public ResponseEntity<List<CommentAlarmResponse>> findAllAlarmByCreatedDateBetween(
        @RequiredLogin SocialLoginUser socialLoginUser, @ModelAttribute CommentAlarmRequest commentAlarmRequest) {

        List<CommentAlarmResponse> commentAlarmResponses = commentAlarmService.findAllCreatedDateBetween(
            socialLoginUser,
            commentAlarmRequest.getStartDate().atTime(LocalTime.MIN),
            commentAlarmRequest.getEndDate().atTime(LocalTime.MAX)
        );

        return ResponseEntity.ok(commentAlarmResponses);
    }

}
