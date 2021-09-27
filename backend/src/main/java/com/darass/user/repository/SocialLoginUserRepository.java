package com.darass.user.repository;

import com.darass.user.domain.SocialLoginUser;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SocialLoginUserRepository extends JpaRepository<SocialLoginUser, Long> {

    Optional<SocialLoginUser> findByOauthId(String oauthId);

    Optional<SocialLoginUser> findByRefreshToken(String refreshToken);
}
