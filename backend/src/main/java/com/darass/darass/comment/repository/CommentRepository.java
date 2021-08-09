package com.darass.darass.comment.repository;

import com.darass.darass.comment.domain.Comment;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByUrlAndProjectSecretKeyAndParentId(String url, String projectSecretKey, Long parentId, Sort sort);

    Page<Comment> findByUrlAndProjectSecretKey(String url, String projectSecretKey, Pageable pageable);

    Page<Comment> findByProjectSecretKeyAndCreatedDateBetween(String projectSecretKey, LocalDateTime startDate,
        LocalDateTime endDate, Pageable pageable);

    Page<Comment> findByProjectSecretKeyAndContentContainingAndCreatedDateBetween(String projectSecretKey,
        String keyword, LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);
}