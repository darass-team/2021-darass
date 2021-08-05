package com.darass.darass.comment.repository;

import com.darass.darass.comment.domain.Comment;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByUrlAndProjectSecretKeyAndParentId(String url, String project_secretKey, Long parentId, Sort sort);

    Page<Comment> findByUrlAndProjectSecretKeyAndParentId(String url, String projectSecretKey, Long parentId, Pageable pageable);

    Page<Comment> findByParentId(Long parentId, Pageable pageable);
}