package com.darass.darass.comment.repository;

import com.darass.darass.comment.domain.Comment;
import com.darass.darass.comment.domain.Stat;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByUrlAndProjectSecretKey(String url, String projectSecretKey, Sort sort);

    Page<Comment> findByUrlAndProjectSecretKey(String url, String projectSecretKey, Pageable pageable);

    Page<Comment> findByProjectSecretKeyAndCreatedDateBetween(String projectSecretKey, LocalDateTime startDate,
        LocalDateTime endDate, Pageable pageable);

    Page<Comment> findByProjectSecretKeyAndContentContaining(String projectSecretKey, String keyword, Pageable pageable);

    @Query("select substring(c.createdDate, :beginIndex, :endIndex) as date, count(c) as count from Comment c "
        + "where c.project.secretKey=:projectSecretKey and c.createdDate between :startDate and :endDate group by date")
    List<Object[]> findDateCount(@Param("projectSecretKey") String projectSecretKey,
        @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate,
        @Param("beginIndex") Integer beginIndex, @Param("endIndex") Integer endIndex);
}