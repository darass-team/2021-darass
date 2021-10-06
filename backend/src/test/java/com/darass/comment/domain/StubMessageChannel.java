package com.darass.comment.domain;

import java.util.ArrayList;
import java.util.List;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;

public class StubMessageChannel implements MessageChannel {

    private final List<Message<byte[]>> messages = new ArrayList<>();

    public List<Message<byte[]>> getMessages() {
        return this.messages;
    }

    public boolean send(Message<?> message) {
        this.messages.add((Message<byte[]>) message);
        return true;
    }

    public boolean send(Message<?> message, long timeout) {
        this.messages.add((Message<byte[]>) message);
        return true;
    }

}
