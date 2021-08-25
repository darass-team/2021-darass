package com.darass.darass.auth.oauth.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import com.darass.darass.SpringContainerTest;
import com.darass.darass.auth.oauth.api.domain.KaKaoOAuthProvider;
import com.darass.darass.auth.oauth.api.domain.OAuthProviderFactory;
import com.darass.darass.auth.oauth.dto.TokenRequest;
import com.darass.darass.auth.oauth.dto.TokenResponse;
import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.repository.SocialLoginUserRepository;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;

@DisplayName("OAuthService 클래스")
class OAuthServiceTest extends SpringContainerTest {

    private static final String AUTHORIZATION_CODE = "LiCNQrImAFxi3LJAdt9ipGMSeOhmR4hw33Ao9cx6jkvW5w";

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

    private SocialLoginUser socialLoginUser;

    @BeforeEach
    void setUp() {
        socialLoginUser = SocialLoginUser
            .builder()
            .nickName("우기")
            .oauthId("6752453")
            .oauthProvider("kakao")
            .email("jujubebat@kakao.com")
            .profileImageUrl("http://kakao/profile_image.png")
            .build();

        given(oAuthProviderFactory.getOAuthProvider(any())).willReturn(kaKaoOAuthProvider);
        given(kaKaoOAuthProvider.requestSocialLoginUser(any())).willReturn(socialLoginUser);
    }

    @DisplayName("(회원가입) login 메서드는 oauth 토큰이 주어지면, 인증서버에서 사용자 정보를 받아와서 DB 저장을 하고 primary key를 payload 삼아 accessToken을 리턴한다.")
    @Test
    void oauthLogin_register() {
        //given
        TokenRequest tokenRequest = new TokenRequest(KaKaoOAuthProvider.NAME, AUTHORIZATION_CODE);

        //then
        TokenResponse tokenResponse = oAuthService.oauthLogin(tokenRequest);

        //when
        String accessTokenPayload = jwtTokenProvider.getAccessTokenPayload(tokenResponse.getAccessToken());
        assertThat(accessTokenPayload).isEqualTo("1");

        Optional<SocialLoginUser> possibleSocialLoginUser = socialLoginUserRepository
            .findById(Long.parseLong(accessTokenPayload));
        assertThat(possibleSocialLoginUser.isPresent()).isTrue();

        SocialLoginUser socialLoginUser = possibleSocialLoginUser.get();
        assertThat(socialLoginUser.getRefreshToken()).isEqualTo(tokenResponse.getRefreshToken());
    }

    @DisplayName("(로그인 - 이미 DB에 회원정보가 있는경우) login 메서드는 oauth 토큰이 주어지면, 인증서버에서 사용자 정보를 받아와서 DB 저장을 하고 primary key를 payload 삼아 accessToken을 리턴한다.")
    @Test
    void oauthLogin_login() {
        //given
        TokenRequest tokenRequest = new TokenRequest(KaKaoOAuthProvider.NAME, AUTHORIZATION_CODE);

        //then
        oAuthService.oauthLogin(tokenRequest);
        TokenResponse tokenResponse = oAuthService.oauthLogin(tokenRequest);

        //when
        String accessTokenPayload = jwtTokenProvider.getAccessTokenPayload(tokenResponse.getAccessToken());
        Optional<SocialLoginUser> possibleSocialLoginUser = socialLoginUserRepository
            .findById(Long.parseLong(accessTokenPayload));
        assertThat(possibleSocialLoginUser.isPresent()).isTrue();

        SocialLoginUser socialLoginUser = possibleSocialLoginUser.get();
        assertThat(socialLoginUser.getRefreshToken()).isEqualTo(tokenResponse.getRefreshToken());
    }

    @DisplayName("findSocialLoginUserByAccessToken 메서드는 accessToken이 주어지면 SocialLoginUser를 리턴한다.")
    @Test
    void findSocialLoginUserByAccessToken() {
        //given
        TokenRequest tokenRequest = new TokenRequest(KaKaoOAuthProvider.NAME, AUTHORIZATION_CODE);
        TokenResponse tokenResponse = oAuthService.oauthLogin(tokenRequest);

        //then
        SocialLoginUser result = oAuthService.findSocialLoginUserByAccessToken(tokenResponse.getAccessToken());

        //when
        assertThat(result.getId()).isEqualTo(socialLoginUser.getId());
        assertThat(result.getNickName()).isEqualTo(socialLoginUser.getNickName());
        assertThat(result.getProfileImageUrl()).isEqualTo(socialLoginUser.getProfileImageUrl());
        assertThat(result.getOauthProvider()).isEqualTo(socialLoginUser.getOauthProvider());
        assertThat(result.getEmail()).isEqualTo(socialLoginUser.getEmail());
    }

}