package com.darass.darass.common.domain;

import com.darass.darass.user.domain.OAuthPlatform;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.repository.SocialLoginUserRepository;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("BaseTimeEntity 추상 클래스")
@ActiveProfiles("test")
@SpringBootTest
class BaseTimeEntityTest {

    @Autowired
    SocialLoginUserRepository socialLoginUserRepository;

    @DisplayName("BaseTimeEntity을 상속한 Entity는 save될 때 생성시간과, 수정시간이 자동으로 저장된다.(JST 시간으로 저장됨)")
    @Test
    void saveCreatedDateAndModifiedDate() {
        socialLoginUserRepository.save(SocialLoginUser.builder()
            .nickName("병욱")
            .email("jujubebat@kakao.com")
            .oauthId("241323123")
            .oauthPlatform(OAuthPlatform.KAKAO)
            .build());

        List<SocialLoginUser> socialLoginUsers = socialLoginUserRepository.findAll();
        SocialLoginUser socialLoginUser = socialLoginUsers.get(0);

        LocalDateTime currentSavedLocalDateTime = socialLoginUser.getCreatedDate();
        LocalDateTime currentJapanStandardTime = LocalDateTime.now(ZoneId.of("JST", ZoneId.SHORT_IDS));

        assertThat(currentSavedLocalDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd-hh-mm-ss")))
            .isEqualTo(currentJapanStandardTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd-hh-mm-ss")));
    }

}