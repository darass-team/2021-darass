package com.darass.darass.user.repository;

import com.darass.darass.user.domain.SocialLoginUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SocialLoginUserRepository extends JpaRepository<SocialLoginUser, Long> {

    Optional<SocialLoginUser> findByOauthId(String oauthId);
}
