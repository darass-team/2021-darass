package com.darass.slack;

import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

public class SlackMessageSender {
    private static final String PROD_ERROR_ALARM_CHANNEL = "/services/T0280M8QMGT/B02J0KQ1P6C/XHw8t5V6LibqoJ74DYxZGizv";

    public static String send(String message) {
        WebClient webClient = WebClient.builder()
            .baseUrl("https://hooks.slack.com")
            .build();

        return webClient
            .post()
            .uri(PROD_ERROR_ALARM_CHANNEL)
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON)
            .bodyValue(new SlackRequestDto(message))
            .retrieve()
            .bodyToMono(String.class)
            .flux()
            .toStream()
            .findFirst()
            .orElseGet(() -> "fail");
    }
}
