package com.darass.darass.comment.repository;

import com.darass.darass.comment.domain.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    Page<Comment> findByUrlAndProjectSecretKey(String url, String projectSecretKey, Pageable pageable);

    Long countCommentByUrlAndProjectSecretKey(String url, String projectSecretKey);
}