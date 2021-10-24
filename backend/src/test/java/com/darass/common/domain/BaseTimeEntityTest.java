package com.darass.common.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.darass.SpringContainerTest;
import com.darass.user.domain.SocialLoginUser;
import com.darass.user.repository.SocialLoginUserRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@DisplayName("BaseTimeEntity 추상 클래스")
class BaseTimeEntityTest extends SpringContainerTest {

    @Autowired
    SocialLoginUserRepository socialLoginUserRepository;

    @DisplayName("BaseTimeEntity을 상속한 Entity는 save될 때 생성시간과, 수정시간이 자동으로 저장된다.")
    @Test
    public void saveCreatedDateAndModifiedDate() {
        //given
        LocalDateTime now = LocalDateTime.now();
        socialLoginUserRepository.save(SocialLoginUser.builder()
            .nickName("병욱")
            .email("jujubebat@kakao.com")
            .oauthId("241323123")
            .oauthProvider("kakao")
            .build());

        //when
        List<SocialLoginUser> socialLoginUsers = socialLoginUserRepository.findAll();

        //then
        SocialLoginUser socialLoginUser = socialLoginUsers.get(0);
        assertThat(socialLoginUser.getCreatedDate()).isEqualToIgnoringNanos(now);
        assertThat(socialLoginUser.getModifiedDate()).isEqualToIgnoringNanos(now);
    }

}