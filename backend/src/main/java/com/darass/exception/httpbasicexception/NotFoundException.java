package com.darass.exception.httpbasicexception;

public class NotFoundException extends CustomException {

    public NotFoundException(String message, Integer code) {
        super(message, code);
    }
}
