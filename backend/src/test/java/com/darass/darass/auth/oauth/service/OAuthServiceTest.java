package com.darass.darass.auth.oauth.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

import com.darass.darass.auth.oauth.api.domain.UserInfoProvider;
import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.user.domain.OAuthPlatform;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.repository.SocialLoginUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.AdditionalAnswers;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.util.ReflectionTestUtils;

@DisplayName("OAuthService 클래스")
@ActiveProfiles("test")
@SpringBootTest
class OAuthServiceTest {

    @Autowired
    private SocialLoginUserRepository socialLoginUserRepository;

    @InjectMocks
    private OAuthService oAuthService;

    @SpyBean(name = "jwtTokenProvider")
    private JwtTokenProvider jwtTokenProvider;

    @MockBean(name = "userInfoProvider")
    private UserInfoProvider userInfoProvider;

    private String oauthAccessToken;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        SocialLoginUserRepository socialLoginUserRepositoryMock =
            Mockito.mock(SocialLoginUserRepository.class, AdditionalAnswers.delegatesTo(socialLoginUserRepository));
        ReflectionTestUtils.setField(oAuthService, "socialLoginUserRepository", socialLoginUserRepositoryMock);

        oauthAccessToken = "LiCNQrImAFxi3LJAdt9ipGMSeOhmR4hw33Ao9cx6jkvW5w";
        SocialLoginUser socialLoginUser = SocialLoginUser
            .builder()
            .nickName("우기")
            .oauthId("6752453")
            .oauthPlatform(OAuthPlatform.KAKAO)
            .email("jujubebat@kakao.com")
            .build();
        given(userInfoProvider.findSocialLoginUser(oauthAccessToken)).willReturn(socialLoginUser);
    }

    @DisplayName("login 메서드는 oauth 토큰이 주어지면, 인증서버에서 사용자 정보를 받아와서 DB 저장을 하고 primary key를 payload 삼아 accessToken을 리턴한다.")
    @Test
    void oauthLogin() {
        // then
        String accessToken = oAuthService.oauthLogin(oauthAccessToken);

        // when
        String payload = jwtTokenProvider.getPayload(accessToken);
        assertThat(jwtTokenProvider.getPayload(accessToken)).isEqualTo("1");
        assertThat(socialLoginUserRepository.findById(Long.parseLong(payload)).isPresent()).isTrue();
    }

    @DisplayName("findSocialLoginUserByAccessToken 메서드는 accessToken이 주어지면 SocialLoginUser를 리턴한다.")
    @Test
    void findSocialLoginUserByAccessToken() {
        // given
        String accessToken = oAuthService.oauthLogin(oauthAccessToken);

        // then
        SocialLoginUser socialLoginUser = oAuthService.findSocialLoginUserByAccessToken(accessToken);

        // when
        assertThat(socialLoginUser.getId()).isEqualTo(1L);
    }

}