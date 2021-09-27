package com.darass.project.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("RandomSecretKeyFactory 클래스")
class SecretKeyFactoryTest {

    @Test
    @DisplayName("createSecretKey 메서드는 payload가 주어지면 랜덤 문자열과 payload를 더한 결과를 리턴한다.")
    void createSecretKey() {
        String payload = "1";
        SecretKeyFactory secretKeyFactory = new SecretKeyFactory();
        String randomSecretKey = secretKeyFactory.createSecretKey(payload);

        assertThat(randomSecretKey.substring(15, 16)).isEqualTo(payload);
    }

}