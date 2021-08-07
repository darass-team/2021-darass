package com.darass.darass.auth.oauth.api.domain.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.darass.darass.auth.oauth.api.domain.vo.NaverAccount;
import com.darass.darass.user.domain.SocialLoginUser;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("NaverLoginResponse 클래스")
class NaverLoginResponseTest {

    @DisplayName("toEntity 메서드는 socialLoginUser을 리턴한다.")
    @Test
    void toEntity() {
        String oauthId = "1234";
        String nickName = "박병욱";
        String email = "bbwwpark@naver.com";
        String profileImageUrl = "http://naver/profile.png";

        NaverLoginResponse naverLoginResponse =
            new NaverLoginResponse(new NaverAccount(oauthId, nickName, email, profileImageUrl));

        SocialLoginUser socialLoginUser = naverLoginResponse.toEntity();

        assertThat(socialLoginUser.getOauthId()).isEqualTo(oauthId);
        assertThat(socialLoginUser.getNickName()).isEqualTo(nickName);
        assertThat(socialLoginUser.getEmail()).isEqualTo(email);
        assertThat(socialLoginUser.getProfileImageUrl()).isEqualTo(profileImageUrl);
    }

}