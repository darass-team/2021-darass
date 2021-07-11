package com.darass.darass.user.repository;

import com.darass.darass.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u.userType FROM User u WHERE u.id = :id")
    String findUserTypeById(@Param("id") Long id);
}