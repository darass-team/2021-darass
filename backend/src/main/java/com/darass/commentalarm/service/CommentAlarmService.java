package com.darass.commentalarm.service;

import com.darass.commentalarm.domain.CommentAlarm;
import com.darass.commentalarm.dto.CommentAlarmResponse;
import com.darass.commentalarm.repository.CommentAlarmRepository;
import com.darass.user.domain.SocialLoginUser;
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

    @Transactional(readOnly = true)
    public List<CommentAlarmResponse> findAllCreatedDateBetween(SocialLoginUser socialLoginUser,
        LocalDateTime start, LocalDateTime end) {
        List<CommentAlarm> commentAlarms = commentAlarmRepository
            .findAllByReceiverAndCreatedDateBetweenOrderByCreatedDateDesc(socialLoginUser, start, end);

        return makeCommentAlarmResponses(commentAlarms);
    }

    private List<CommentAlarmResponse> makeCommentAlarmResponses(List<CommentAlarm> commentAlarms) {
        return commentAlarms.stream().map(CommentAlarmResponse::of).collect(Collectors.toList());
    }

}
