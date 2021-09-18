package com.darass.darass.websocket.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketChatConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry stompEndpointRegistry) {
        stompEndpointRegistry.addEndpoint("/websocket").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry messageBrokerRegistry) {

        messageBrokerRegistry.setApplicationDestinationPrefixes("/app");

        messageBrokerRegistry.enableStompBrokerRelay("/queue")
            .setRelayHost("52.78.66.216")
            .setRelayPort(8000)
            .setSystemLogin("username")
            .setSystemPasscode("password")
            .setClientLogin("username")
            .setClientPasscode("password");
    }
}