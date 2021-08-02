package com.darass.darass.comment.repository;

import com.darass.darass.comment.domain.Comment;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByUrlAndProjectSecretKey(String url, String project_secretKey, Sort sort);

    Page<Comment> findByUrlAndProjectSecretKey(String url, String projectSecretKey, Pageable pageable);
}