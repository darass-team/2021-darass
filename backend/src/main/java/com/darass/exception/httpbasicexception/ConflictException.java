package com.darass.exception.httpbasicexception;

public class ConflictException extends CustomException {

    public ConflictException(String message, Integer code) {
        super(message, code);
    }
}
