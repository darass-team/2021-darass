package com.darass.commentalarm.service;

import com.darass.commentalarm.domain.CommentAlarm;
import com.darass.commentalarm.repository.CommentAlarmRepository;
import com.darass.user.domain.User;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class CommentAlarmService {

    private final CommentAlarmRepository commentAlarmRepository;

    public List<CommentAlarm> findAllBySenderAndCreatedDateBetween(User sender, LocalDateTime start, LocalDateTime end) {
        return commentAlarmRepository.findAllBySenderAndCreatedDateBetween(sender, start,end);
    }

}
