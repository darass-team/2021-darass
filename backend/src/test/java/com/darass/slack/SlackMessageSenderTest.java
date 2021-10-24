package com.darass.slack;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class SlackMessageSenderTest {

    private static final String SUCCESS_RESPONSE = "ok";

    @DisplayName("Slack에서 배포 환경의 에러 메시지 알림 채널에 메시지가 잘 전송되는 지 테스트")
    @Test
    void slack_test() {
        String response = SlackMessageSender.send("Slack 전송 작동 여부 테스트용 메시지");
        assertThat(response).isEqualTo(SUCCESS_RESPONSE);
    }
}