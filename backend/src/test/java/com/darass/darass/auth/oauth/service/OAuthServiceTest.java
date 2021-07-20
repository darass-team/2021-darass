package com.darass.darass.auth.oauth.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

import com.darass.darass.SpringContainerTest;
import com.darass.darass.auth.oauth.api.domain.UserInfoProvider;
import com.darass.darass.auth.oauth.controller.dto.TokenResponse;
import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.user.domain.OAuthPlatform;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.repository.SocialLoginUserRepository;
import javax.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.AdditionalAnswers;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.test.util.ReflectionTestUtils;

@DisplayName("OAuthService 클래스")
class OAuthServiceTest extends SpringContainerTest {

    @Autowired
    private SocialLoginUserRepository socialLoginUserRepository;

    @InjectMocks
    private OAuthService oAuthService;

    @SpyBean(name = "jwtTokenProvider")
    private JwtTokenProvider jwtTokenProvider;

    @MockBean(name = "userInfoProvider")
    private UserInfoProvider userInfoProvider;

    private String oauthAccessToken;

    private SocialLoginUser socialLoginUser;

    @BeforeEach
    public void setup() throws Exception {
        MockitoAnnotations.openMocks(this);
        SocialLoginUserRepository socialLoginUserRepositoryMock =
            Mockito.mock(SocialLoginUserRepository.class, AdditionalAnswers.delegatesTo(socialLoginUserRepository));
        ReflectionTestUtils.setField(oAuthService, "socialLoginUserRepository", socialLoginUserRepositoryMock);

        oauthAccessToken = "LiCNQrImAFxi3LJAdt9ipGMSeOhmR4hw33Ao9cx6jkvW5w";
        socialLoginUser = SocialLoginUser
            .builder()
            .nickName("우기")
            .oauthId("6752453")
            .oauthPlatform(OAuthPlatform.KAKAO)
            .email("jujubebat@kakao.com")
            .profileImageUrl("http://kakao/profile_image.png")
            .build();
    }

    @DisplayName("(회원가입) login 메서드는 oauth 토큰이 주어지면, 인증서버에서 사용자 정보를 받아와서 DB 저장을 하고 primary key를 payload 삼아 accessToken을 리턴한다.")
    @Test
    void oauthLogin_register() {
        //given
        given(userInfoProvider.findSocialLoginUser(oauthAccessToken)).willReturn(socialLoginUser);

        //then
        TokenResponse tokenResponse = oAuthService.oauthLogin(oauthAccessToken);

        //when
        String payload = jwtTokenProvider.getPayload(tokenResponse.getAccessToken());
        assertThat(payload).isEqualTo("1");
        assertThat(socialLoginUserRepository.findById(Long.parseLong(payload)).isPresent()).isTrue();
    }

    @Transactional
    @DisplayName("(로그인 - 이미 DB에 회원정보가 있는경우) login 메서드는 oauth 토큰이 주어지면, 인증서버에서 사용자 정보를 받아와서 DB 업데이트를 하고 primary key를 payload 삼아 accessToken을 리턴한다.")
    @Test
    void oauthLogin_login() {
        //given
        socialLoginUserRepository.save(socialLoginUser);

        SocialLoginUser updatedSocialLoginUser = SocialLoginUser
            .builder()
            .nickName("병욱")
            .oauthId(socialLoginUser.getOauthId())
            .oauthPlatform(OAuthPlatform.KAKAO)
            .email("bbwwpark@naver.com")
            .profileImageUrl("http://kakao/updated_profile_image.png")
            .build();

        given(userInfoProvider.findSocialLoginUser(oauthAccessToken)).willReturn(updatedSocialLoginUser);

        //then
        TokenResponse tokenResponse = oAuthService.oauthLogin(oauthAccessToken);

        //when
        String payload = jwtTokenProvider.getPayload(tokenResponse.getAccessToken());

        SocialLoginUser result = socialLoginUserRepository.findById(Long.parseLong(payload)).get();
        assertThat(result.getNickName()).isEqualTo(updatedSocialLoginUser.getNickName());
        assertThat(result.getProfileImageUrl()).isEqualTo(updatedSocialLoginUser.getProfileImageUrl());
        assertThat(result.getOauthId()).isEqualTo(updatedSocialLoginUser.getOauthId());
        assertThat(result.getOauthPlatform()).isEqualTo(updatedSocialLoginUser.getOauthPlatform());
        assertThat(result.getEmail()).isEqualTo(updatedSocialLoginUser.getEmail());
    }

    @DisplayName("findSocialLoginUserByAccessToken 메서드는 accessToken이 주어지면 SocialLoginUser를 리턴한다.")
    @Test
    void findSocialLoginUserByAccessToken() {
        //given
        given(userInfoProvider.findSocialLoginUser(oauthAccessToken)).willReturn(socialLoginUser);
        TokenResponse tokenResponse = oAuthService.oauthLogin(oauthAccessToken);

        //then
        SocialLoginUser socialLoginUser = oAuthService.findSocialLoginUserByAccessToken(tokenResponse.getAccessToken());

        //when
        assertThat(socialLoginUser.getId()).isEqualTo(this.socialLoginUser.getId());
        assertThat(socialLoginUser.getNickName()).isEqualTo(this.socialLoginUser.getNickName());
        assertThat(socialLoginUser.getProfileImageUrl()).isEqualTo(this.socialLoginUser.getProfileImageUrl());
        assertThat(socialLoginUser.getOauthPlatform()).isEqualTo(this.socialLoginUser.getOauthPlatform());
        assertThat(socialLoginUser.getEmail()).isEqualTo(this.socialLoginUser.getEmail());
    }

}