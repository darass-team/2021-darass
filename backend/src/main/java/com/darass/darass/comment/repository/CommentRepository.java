package com.darass.darass.comment.repository;

import com.darass.darass.comment.domain.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByUrl(String url);
}
