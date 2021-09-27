package com.darass.commentalarm.service;

import com.darass.comment.dto.CommentResponse;
import com.darass.commentalarm.domain.CommentAlarm;
import com.darass.commentalarm.domain.CommentAlarmType;
import com.darass.commentalarm.dto.CommentAlarmResponse;
import com.darass.commentalarm.repository.CommentAlarmRepository;
import com.darass.user.domain.SocialLoginUser;
import com.darass.user.dto.UserResponse;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class CommentAlarmService {

    private final CommentAlarmRepository commentAlarmRepository;

    public List<CommentAlarmResponse> findAllBySenderAndCreatedDateBetween(SocialLoginUser socialLoginUser, LocalDateTime start,
        LocalDateTime end) {
        List<CommentAlarm> commentAlarms = commentAlarmRepository.findAllBySenderAndCreatedDateBetween(socialLoginUser, start, end);

        return makeCommentAlarmResponses(commentAlarms);
    }

    private List<CommentAlarmResponse> makeCommentAlarmResponses(List<CommentAlarm> commentAlarms) {
        return commentAlarms.stream().map(commentAlarm -> {
            CommentAlarmType commentAlarmType = commentAlarm.getCommentAlarmType();
            UserResponse userResponse = UserResponse.of(commentAlarm.getSender());
            CommentResponse commentResponse = CommentResponse.of(commentAlarm.getComment(), userResponse);
            return CommentAlarmResponse.of(commentAlarmType, userResponse, commentResponse);
        }).collect(Collectors.toList());
    }

}
