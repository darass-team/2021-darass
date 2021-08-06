package com.darass.darass.comment.repository;

import com.darass.darass.comment.domain.Comment;
import java.time.LocalDateTime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    Page<Comment> findByUrlAndProjectSecretKey(String url, String projectSecretKey, Pageable pageable);

    Page<Comment> findByProjectSecretKeyAndCreatedDateBetween(String projectSecretKey, LocalDateTime startDate,
        LocalDateTime endDate, Pageable pageable);

    Page<Comment> findByProjectSecretKeyAndContentContaining(String projectSecretKey, String keyword, Pageable pageable);

    Long countCommentByUrlAndProjectSecretKey(String url, String projectSecretKey);

    Long countCommentByProjectSecretKey(String projectSecretKey);
}