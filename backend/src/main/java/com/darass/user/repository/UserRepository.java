package com.darass.user.repository;

import com.darass.user.domain.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u.userType FROM User u WHERE u.id = :id")
    String findUserTypeById(@Param("id") Long id);

    Optional<User> findById(Long userId);

    @Query("SELECT u.profileImageUrl FROM User u WHERE u.id = :id")
    String findProfileImageUrlById(@Param("id") Long id);
}