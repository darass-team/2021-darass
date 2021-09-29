package com.darass.commentalarm.repository;

import com.darass.commentalarm.domain.CommentAlarm;
import com.darass.user.domain.User;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentAlarmRepository extends JpaRepository<CommentAlarm, Long> {

    List<CommentAlarm> findAllByReceiverAndCreatedDateBetweenOrderByCreatedDateDesc(User receiver, LocalDateTime start, LocalDateTime end);

}