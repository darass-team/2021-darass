package com.darass.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Profile({"prod", "develop"})
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Value("${stomp-broker.ip}")
    private String StompBrokerIp;

    @Value("${stomp-broker.port}")
    private int StompBrokerPort;

    @Value("${stomp-broker.username}")
    private String StompBrokerUsername;

    @Value("${stomp-broker.passowrd}")
    private String StompBrokerPassword;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry stompEndpointRegistry) {
        stompEndpointRegistry.addEndpoint("/websocket").setAllowedOriginPatterns("*").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry messageBrokerRegistry) {

        messageBrokerRegistry.setApplicationDestinationPrefixes("/app");

        messageBrokerRegistry.enableStompBrokerRelay("/queue")
            .setRelayHost(StompBrokerIp)
            .setRelayPort(StompBrokerPort)
            .setSystemLogin(StompBrokerUsername)
            .setSystemPasscode(StompBrokerPassword)
            .setClientLogin(StompBrokerUsername)
            .setClientPasscode(StompBrokerPassword);
    }

}