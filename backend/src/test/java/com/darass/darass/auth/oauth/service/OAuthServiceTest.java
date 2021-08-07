package com.darass.darass.auth.oauth.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import com.darass.darass.SpringContainerTest;
import com.darass.darass.auth.oauth.api.domain.KaKaoOAuthProvider;
import com.darass.darass.auth.oauth.api.domain.OAuthProviderFactory;
import com.darass.darass.auth.oauth.dto.TokenResponse;
import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.repository.SocialLoginUserRepository;
import javax.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;

@DisplayName("OAuthService 클래스")
class OAuthServiceTest extends SpringContainerTest {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private OAuthService oAuthService;

    @SpyBean
    private SocialLoginUserRepository socialLoginUserRepository;

    @MockBean
    private OAuthProviderFactory oAuthProviderFactory;

    @MockBean
    private KaKaoOAuthProvider kaKaoOAuthProvider;

    private String authorizationCode;

    private SocialLoginUser socialLoginUser;

    @BeforeEach
    public void setup() throws Exception {
        authorizationCode = "LiCNQrImAFxi3LJAdt9ipGMSeOhmR4hw33Ao9cx6jkvW5w";
        socialLoginUser = SocialLoginUser
            .builder()
            .nickName("우기")
            .oauthId("6752453")
            .oAuthProvider("kakao")
            .email("jujubebat@kakao.com")
            .profileImageUrl("http://kakao/profile_image.png")
            .build();
    }

    @DisplayName("(회원가입) login 메서드는 oauth 토큰이 주어지면, 인증서버에서 사용자 정보를 받아와서 DB 저장을 하고 primary key를 payload 삼아 accessToken을 리턴한다.")
    @Test
    void oauthLogin_register() {
        //given
        given(oAuthProviderFactory.getOAuthProvider(any())).willReturn(kaKaoOAuthProvider);
        given(kaKaoOAuthProvider.findSocialLoginUser(any())).willReturn(socialLoginUser);

        //then
        TokenResponse tokenResponse = oAuthService.oauthLogin(KaKaoOAuthProvider.NAME, authorizationCode);

        //when
        String payload = jwtTokenProvider.getPayload(tokenResponse.getAccessToken());
//        assertThat(payload).isEqualTo("1");
        assertThat(socialLoginUserRepository.findById(Long.parseLong(payload)).isPresent()).isTrue();
    }

    @Transactional
    @DisplayName("(로그인 - 이미 DB에 회원정보가 있는경우) login 메서드는 oauth 토큰이 주어지면, 인증서버에서 사용자 정보를 받아와서 DB 저장을 하고 primary key를 payload 삼아 accessToken을 리턴한다.")
    @Test
    void oauthLogin_login() {
        //given
        socialLoginUserRepository.save(socialLoginUser);
        given(oAuthProviderFactory.getOAuthProvider(any())).willReturn(kaKaoOAuthProvider);
        given(kaKaoOAuthProvider.findSocialLoginUser(any())).willReturn(socialLoginUser);

        //then
        TokenResponse tokenResponse = oAuthService.oauthLogin(KaKaoOAuthProvider.NAME, authorizationCode);

        //when
        String payload = jwtTokenProvider.getPayload(tokenResponse.getAccessToken());
        assertThat(payload).isNotNull();
    }

    @DisplayName("findSocialLoginUserByAccessToken 메서드는 accessToken이 주어지면 SocialLoginUser를 리턴한다.")
    @Test
    void findSocialLoginUserByAccessToken() {
        //given
        given(oAuthProviderFactory.getOAuthProvider(any())).willReturn(kaKaoOAuthProvider);
        given(kaKaoOAuthProvider.findSocialLoginUser(any())).willReturn(socialLoginUser);

        TokenResponse tokenResponse = oAuthService.oauthLogin(KaKaoOAuthProvider.NAME, authorizationCode);

        //then
        SocialLoginUser socialLoginUser = oAuthService.findSocialLoginUserByAccessToken(tokenResponse.getAccessToken());

        //when
        assertThat(socialLoginUser.getId()).isEqualTo(this.socialLoginUser.getId());
        assertThat(socialLoginUser.getNickName()).isEqualTo(this.socialLoginUser.getNickName());
        assertThat(socialLoginUser.getProfileImageUrl()).isEqualTo(this.socialLoginUser.getProfileImageUrl());
        assertThat(socialLoginUser.getOAuthProvider()).isEqualTo(this.socialLoginUser.getOAuthProvider());
        assertThat(socialLoginUser.getEmail()).isEqualTo(this.socialLoginUser.getEmail());
    }

}