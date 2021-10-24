package com.darass.slack;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest(classes = {
    SlackMessageSender.class
})
@ActiveProfiles("test")
public class SlackMessageSenderTest {

    private static final String SUCCESS_RESPONSE = "ok";
    private static final String PROD_ERROR_ALARM_SLACK_CHANNEL = "/services/T0280M8QMGT/B02J0KQ1P6C/XHw8t5V6LibqoJ74DYxZGizv";
    private static final String DEV_ERROR_ALARM_SLACK_CHANNEL = "/services/T0280M8QMGT/B02BEFE2C8G/MM1BveGzKk8DQhXbfj5czkx1";
    private static final String FAIL_RESPONSE = "fail";

    @SpyBean(name = "slackMessageSender")
    private SlackMessageSender slackMessageSender;

    @DisplayName("Slack에서 에러 메시지 알림 채널에 메시지가 잘 전송된다.")
    @Test
    void slack() {
        given(slackMessageSender.getSlackChannelUri())
            .willReturn(PROD_ERROR_ALARM_SLACK_CHANNEL);
        String response1 = slackMessageSender.send("Slack 전송 작동 여부 테스트용 메시지");
        assertThat(response1).isEqualTo(SUCCESS_RESPONSE);

        given(slackMessageSender.getSlackChannelUri())
            .willReturn(DEV_ERROR_ALARM_SLACK_CHANNEL);
        String response2 = slackMessageSender.send("Slack 전송 작동 여부 테스트용 메시지");
        assertThat(response2).isEqualTo(SUCCESS_RESPONSE);
    }

    @DisplayName("none이라는 값이 들어갔을 때, 슬랙 메시지가 아무 곳에도 전송되지 않는다.")
    @Test
    void slack_none() {
        given(slackMessageSender.getSlackChannelUri())
            .willReturn("none");
        String response2 = slackMessageSender.send("Slack 전송 작동 여부 테스트용 메시지");
        assertThat(response2).isEqualTo(FAIL_RESPONSE);
    }
}