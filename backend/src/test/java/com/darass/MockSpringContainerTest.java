package com.darass;

import com.darass.auth.domain.KaKaoOAuthProvider;
import com.darass.auth.domain.OAuthProviderFactory;
import com.darass.auth.infrastructure.JwtTokenProvider;
import com.darass.auth.service.OAuthService;
import com.darass.commentalarm.domain.CommentAlarmMachine;
import com.darass.commentalarm.service.CommentAlarmService;
import com.darass.user.infrastructure.S3Uploader;
import com.darass.user.repository.SocialLoginUserRepository;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import software.amazon.awssdk.services.s3.S3Client;

public class MockSpringContainerTest extends SpringContainerTest {

    @SpyBean(name = "jwtTokenProvider")
    protected JwtTokenProvider jwtTokenProvider;

    @MockBean
    protected OAuthProviderFactory oAuthProviderFactory;

    @MockBean
    protected KaKaoOAuthProvider kaKaoOAuthProvider;

    @SpyBean
    protected SocialLoginUserRepository socialLoginUserRepository;

    @MockBean
    protected CommentAlarmMachine commentAlarmMachine;

    @SpyBean
    protected CommentAlarmService commentAlarmService;

    @SpyBean
    protected OAuthService oAuthService;

    @SpyBean
    protected S3Uploader s3Uploader;

    @MockBean
    protected S3Client s3Client;

}
