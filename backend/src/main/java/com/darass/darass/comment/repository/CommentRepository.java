package com.darass.darass.comment.repository;

import com.darass.darass.comment.domain.Comment;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface CommentRepository extends JpaRepository<Comment, Long>, PagingAndSortingRepository<Comment, Long> {

    List<Comment> findAllByUrlAndProjectSecretKey(String url, String projectSecretKey);

    Page<Comment> findAllByUrlAndProjectSecretKey(String url, String projectSecretKey, Pageable pageable);

}
