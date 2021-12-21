package com.darass.slack;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
public class SlackMessageSender {

    private static final String FAIL_RESPONSE = "fail";

    @Value("${logging.slack.webhook-uri}")
    private String slackChannelUri;

    public String send(Exception e) {
        StringBuilder sb = new StringBuilder();
        sb.append(e.getClass() + " : " + e.getMessage());
        StackTraceElement[] stackTrace = e.getStackTrace();
        for (StackTraceElement stackTraceElement : stackTrace) {
            sb.append("\n at ");
            sb.append(stackTraceElement.toString());
        }
        return send(sb.toString());
    }

    public String send(String message) {
        WebClient webClient = WebClient.builder()
            .baseUrl("https://hooks.slack.com")
            .build();

        return webClient
            .post()
            .uri(getSlackChannelUri())
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON)
            .bodyValue(new SlackRequestDto(message))
            .retrieve()
            .bodyToMono(String.class)
            .flux()
            .toStream()
            .findFirst()
            .orElseGet(() -> FAIL_RESPONSE);
    }

    public String getSlackChannelUri() {
        return slackChannelUri;
    }
}
