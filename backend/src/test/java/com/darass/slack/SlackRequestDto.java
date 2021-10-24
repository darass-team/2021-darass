package com.darass.slack;

public class SlackRequestDto {
    private String text;

    public SlackRequestDto(String text) {
        this.text = text;
    }

    public SlackRequestDto() {
    }

    public String getText() {
        return text;
    }
}
