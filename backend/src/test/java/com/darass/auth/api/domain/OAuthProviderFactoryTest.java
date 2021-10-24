package com.darass.auth.api.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.darass.auth.domain.GithubOAuthProvider;
import com.darass.auth.domain.KaKaoOAuthProvider;
import com.darass.auth.domain.NaverOAuthProvider;
import com.darass.auth.domain.OAuthProviderFactory;
import com.darass.SpringContainerTest;
import com.darass.exception.ExceptionWithMessageAndCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@DisplayName("OAuthProviderFactory 클래스")
class OAuthProviderFactoryTest extends SpringContainerTest {

    @Autowired
    OAuthProviderFactory oAuthProviderFactory;

    @DisplayName("getOAuthProvider 메서드는 kakao oauth provider 이름이 주어지면, KaKaoOAuthProvider 객체를 리턴한다.")
    @Test
    void getKaKaoOAuthProvider() {
        assertThat(oAuthProviderFactory.getOAuthProvider(KaKaoOAuthProvider.NAME)).isInstanceOf(KaKaoOAuthProvider.class);
    }

    @DisplayName("getNaverOAuthProvider 메서드는 naver oauth provider 이름이 주어지면, NaverOAuthProvider 객체를 리턴한다.")
    @Test
    void getNaverOAuthProvider() {
        assertThat(oAuthProviderFactory.getOAuthProvider(NaverOAuthProvider.NAME)).isInstanceOf(NaverOAuthProvider.class);
    }

    @DisplayName("getGithubOAuthProvider 메서드는 github oauth provider 이름이 주어지면, GithubOAuthProvider 객체를 리턴한다.")
    @Test
    void getGithubOAuthProvider() {
        assertThat(oAuthProviderFactory.getOAuthProvider(GithubOAuthProvider.NAME)).isInstanceOf(GithubOAuthProvider.class);
    }

    @DisplayName("getGithubOAuthProvider 메서드는 올바르지 않은 oauth provider 이름이 주어지면, 예외를 던진다.")
    @Test
    void getOAuthProvider_fail() {
        assertThatThrownBy(() -> oAuthProviderFactory.getOAuthProvider("darass"))
            .isInstanceOf(ExceptionWithMessageAndCode.INVALID_OAUTH_PROVIDER.getException().getClass());
    }

}