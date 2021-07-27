package com.darass.darass.project.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.darass.darass.auth.oauth.api.domain.OAuthProviderType;
import com.darass.darass.user.domain.SocialLoginUser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("Project 클래스")
class ProjectTest {

    private Project project;

    @BeforeEach
    void setUp() {
        SocialLoginUser socialLoginUser = SocialLoginUser.builder()
            .id(1L)
            .nickName("우기")
            .profileImageUrl("http://프로필이미지-url")
            .userType("socialLoginUser")
            .email("bbwwpark@naver.com")
            .oauthProviderType(OAuthProviderType.KAKAO)
            .oauthId("1234")
            .build();

        project = Project.builder()
            .id(1L)
            .user(socialLoginUser)
            .name("깃헙 지킬 블로그")
            .description("개발 공부 기록용")
            .build();
    }

    @DisplayName("isSame 메서드는 같은 프로젝트 키가 주어지면, true를 반환한다.")
    @Test
    void isSame() {
        String secretKey = project.getSecretKey();
        assertThat(project.isSame(secretKey)).isTrue();
    }

    @DisplayName("isSame 메서드는 다른 프로젝트 키가 주어지면, false를 반환한다.")
    @Test
    void isSame_fail() {
        String secretKey = project.getSecretKey();
        assertThat(project.isSame("invalid" + secretKey)).isFalse();
    }

}