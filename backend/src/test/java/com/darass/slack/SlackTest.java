package com.darass.slack;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

public class SlackTest {

    private static final String SUCCESS_RESPONSE = "ok";

    @DisplayName("Slack에서 배포 환경의 에러 메시지 알림 채널에 메시지가 잘 전송되는 지 테스트")
    @Test
    void slack_test() {
        WebClient webClient = WebClient.builder()
            .baseUrl("https://hooks.slack.com")
            .build();

        Optional<String> response = webClient
            .post()
            .uri("/services/T0280M8QMGT/B02J0KQ1P6C/XHw8t5V6LibqoJ74DYxZGizv")
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON)
            .bodyValue(new SlackRequestDto("Slack 전송 작동 여부 테스트용 메시지"))
            .retrieve()
            .bodyToMono(String.class)
            .flux()
            .toStream()
            .findFirst();
        assertThat(response.get()).isEqualTo(SUCCESS_RESPONSE);
    }
}