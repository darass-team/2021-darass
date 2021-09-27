package com.darass.comment.repository;

import com.darass.comment.domain.Comment;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByUrlAndProjectSecretKeyAndParentId(String url, String projectSecretKey, Long parentId, Sort sort);

    Page<Comment> findByUrlAndProjectSecretKeyAndParentId(String url, String projectSecretKey, Long parentId, Pageable pageable);

    Page<Comment> findByProjectSecretKeyAndCreatedDateBetween(String projectSecretKey, LocalDateTime startDate,
        LocalDateTime endDate, Pageable pageable);

    Page<Comment> findByProjectSecretKeyAndContentContainingAndCreatedDateBetween(String projectSecretKey,
        String keyword, LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);

    @Query("select substring(c.createdDate, :beginIndex, :length) as date, count(c) as count from Comment c "
        + "where c.project.secretKey=:projectSecretKey and c.createdDate between :startDate and :endDate group by date")
    List<Object[]> findDateCount(@Param("projectSecretKey") String projectSecretKey,
        @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate,
        @Param("beginIndex") Integer beginIndex, @Param("length") Integer length);
}