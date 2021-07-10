package com.darass.darass.exception.httpbasicexception;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {

    private Integer code;

    public CustomException(String message, Integer code) {
        super(message);
        this.code = code;
    }
}
