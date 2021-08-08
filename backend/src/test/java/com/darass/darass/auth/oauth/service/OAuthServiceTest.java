package com.darass.darass.auth.oauth.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.darass.darass.SpringContainerTest;
import com.darass.darass.auth.oauth.api.domain.OAuthProvider;
import com.darass.darass.auth.oauth.api.domain.OAuthProviderType;
import com.darass.darass.auth.oauth.dto.TokenResponse;
import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.repository.SocialLoginUserRepository;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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

    @SpyBean
    private SocialLoginUserRepository socialLoginUserRepository;

    @MockBean
    private OAuthProvider oAuthProvider;

    @Autowired
    private OAuthService oAuthService;

    private String oauthAccessToken;

    private SocialLoginUser socialLoginUser;

    private String refreshToken;

    @BeforeEach
    public void setup() throws Exception {
        oauthAccessToken = "LiCNQrImAFxi3LJAdt9ipGMSeOhmR4hw33Ao9cx6jkvW5w";
        socialLoginUser = SocialLoginUser
            .builder()
            .nickName("우기")
            .oauthId("6752453")
            .oauthProviderType(OAuthProviderType.KAKAO)
            .email("jujubebat@kakao.com")
            .profileImageUrl("http://kakao/profile_image.png")
            .build();
        socialLoginUser.createRefreshToken(jwtTokenProvider);
        refreshToken = socialLoginUser.getRefreshToken();
        socialLoginUserRepository.save(socialLoginUser);
    }

    @DisplayName("(회원가입) login 메서드는 oauth 토큰이 주어지면, 인증서버에서 사용자 정보를 받아와서 DB 저장을 하고 primary key를 payload 삼아 accessToken을 리턴한다.")
    @Test
    void oauthLogin_register() {
        //given
        given(oAuthProvider.findSocialLoginUser(any(), any())).willReturn(socialLoginUser);
        HttpServletResponse response = mock(HttpServletResponse.class);

        //when
        TokenResponse tokenResponse = oAuthService.oauthLogin(OAuthProviderType.KAKAO.getName(), oauthAccessToken, response);

        //then
        String payload = jwtTokenProvider.getPayloadOfAccessToken(tokenResponse.getAccessToken());
        assertThat(socialLoginUserRepository.findById(Long.parseLong(payload)).isPresent()).isTrue();
    }

    @Transactional
    @DisplayName("(로그인 - 이미 DB에 회원정보가 있는경우) login 메서드는 oauth 토큰이 주어지면, primary key를 payload 삼아 accessToken을 리턴한다.")
    @Test
    void oauthLogin_login() {
        //given
        socialLoginUserRepository.save(socialLoginUser);
        HttpServletResponse response = mock(HttpServletResponse.class);
        given(oAuthProvider.findSocialLoginUser(any(), any())).willReturn(socialLoginUser);

        //when
        TokenResponse tokenResponse = oAuthService.oauthLogin(OAuthProviderType.KAKAO.getName(), oauthAccessToken, response);

        //then
        String payload = jwtTokenProvider.getPayloadOfAccessToken(tokenResponse.getAccessToken());
        assertThat(payload).isNotNull();
    }

    @DisplayName("findSocialLoginUserByAccessToken 메서드는 accessToken이 주어지면 SocialLoginUser를 리턴한다.")
    @Test
    void findSocialLoginUserByAccessToken() {
        //given
        given(oAuthProvider.findSocialLoginUser(any(), any())).willReturn(socialLoginUser);
        HttpServletResponse response = mock(HttpServletResponse.class);

        TokenResponse tokenResponse = oAuthService.oauthLogin(OAuthProviderType.KAKAO.getName(), oauthAccessToken, response);

        //when
        SocialLoginUser socialLoginUser = oAuthService.findSocialLoginUserByAccessToken(tokenResponse.getAccessToken());

        //then
        assertThat(socialLoginUser.getId()).isEqualTo(this.socialLoginUser.getId());
        assertThat(socialLoginUser.getNickName()).isEqualTo(this.socialLoginUser.getNickName());
        assertThat(socialLoginUser.getProfileImageUrl()).isEqualTo(this.socialLoginUser.getProfileImageUrl());
        assertThat(socialLoginUser.getOauthProviderType()).isEqualTo(this.socialLoginUser.getOauthProviderType());
        assertThat(socialLoginUser.getEmail()).isEqualTo(this.socialLoginUser.getEmail());
    }

    @DisplayName("createAccessTokenWithRefreshToken 메서드는 쿠키에 RefreshToken이 유효하면 AccessToken을 발급해준다.")
    @Test
    void createAccessTokenWithRefreshToken() {
        //given
        given(oAuthProvider.findSocialLoginUser(any(), any())).willReturn(socialLoginUser);
        HttpServletRequest request = mock(HttpServletRequest.class);
        Cookie cookie = new Cookie("refreshToken", refreshToken);
        when(request.getCookies()).thenReturn(new Cookie[]{cookie});
        HttpServletResponse response = mock(HttpServletResponse.class);

        //when
        TokenResponse tokenResponse = oAuthService.createAccessTokenWithRefreshToken(request, response);

        //then
        assertThat(tokenResponse.getAccessToken()).isNotNull();
    }

    @DisplayName("createAccessTokenWithRefreshToken 메서드는 쿠키에 아무 정보도 없을 경우에 SHOULD_LOGIN Exception을 발생시킨다.")
    @Test
    void createAccessTokenWithRefreshToken_exception_should_login() {
        //given
        given(oAuthProvider.findSocialLoginUser(any(), any())).willReturn(socialLoginUser);
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);

        //when, then
        assertThatThrownBy(() -> oAuthService.createAccessTokenWithRefreshToken(request, response))
            .isEqualTo(ExceptionWithMessageAndCode.SHOULD_LOGIN.getException());
    }

    @DisplayName("createAccessTokenWithRefreshToken 메서드는 쿠키에 담겨있는 RefreshToken이 DB에 일치하는 값이 존재하지 경우에 SHOULD_LOGIN Exception을 발생시킨다.")
    @Test
    void createAccessTokenWithRefreshToken_exception_should_login2() {
        //given
        given(oAuthProvider.findSocialLoginUser(any(), any())).willReturn(socialLoginUser);
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        SocialLoginUser socialLoginUser = SocialLoginUser
            .builder()
            .build();
        socialLoginUser.createRefreshToken(jwtTokenProvider);
        String refreshToken = socialLoginUser.getRefreshToken();
        Cookie cookie = new Cookie("refreshToken", refreshToken);
        when(request.getCookies()).thenReturn(new Cookie[]{cookie});

        //when, then
        assertThatThrownBy(() -> oAuthService.createAccessTokenWithRefreshToken(request, response))
            .isEqualTo(ExceptionWithMessageAndCode.SHOULD_LOGIN.getException());
    }

    @DisplayName("createAccessTokenWithRefreshToken 메서드는 쿠키에 담겨있는 RefreshToken이 담겨있지 않을 경우 SHOULD_LOGIN Exception을 발생시킨다.")
    @Test
    void createAccessTokenWithRefreshToken_exception_should_login3() {
        //given
        given(oAuthProvider.findSocialLoginUser(any(), any())).willReturn(socialLoginUser);
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        Cookie cookie = new Cookie("aa", "aa");
        when(request.getCookies()).thenReturn(new Cookie[]{cookie});

        //when, then
        assertThatThrownBy(() -> oAuthService.createAccessTokenWithRefreshToken(request, response))
            .isEqualTo(ExceptionWithMessageAndCode.SHOULD_LOGIN.getException());
    }
}