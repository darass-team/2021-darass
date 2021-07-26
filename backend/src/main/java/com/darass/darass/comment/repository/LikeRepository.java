package com.darass.darass.comment.repository;

import com.darass.darass.comment.domain.CommentLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<CommentLike, Long> {

}
