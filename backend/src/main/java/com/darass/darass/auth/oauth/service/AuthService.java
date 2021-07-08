package com.darass.darass.auth.oauth.service;

import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.user.domain.GuestUser;
import com.darass.darass.user.domain.User;
import com.darass.darass.user.repository.SocialLoginUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {

    private final SocialLoginUserRepository socialLoginUserRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public User findUserByToken(String accessToken) {
        if (accessToken == null) {
            return new GuestUser();
        }

        jwtTokenProvider.validateToken(accessToken);

        String userId = jwtTokenProvider.getPayload(accessToken);
        return socialLoginUserRepository.findById(Long.parseLong(userId)).orElseThrow(IllegalAccessError::new);
    }
}
