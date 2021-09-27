package com.darass.exception.httpbasicexception;

public class BadRequestException extends CustomException {

    public BadRequestException(String message, Integer code) {
        super(message, code);
    }
}
