package com.darass.darass.comment.repository;

import com.darass.darass.comment.domain.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    Page<Comment> findByUrlAndProjectSecretKeyAndParentId(String url, String projectSecretKey, Long parentId, Pageable pageable);

    Page<Comment> findByParentId(Long parentId, Pageable pageable);

    Long countCommentByUrlAndProjectSecretKey(String url, String projectSecretKey);
}