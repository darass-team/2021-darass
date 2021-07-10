package com.darass.darass.exception.httpbasicexception;

public class ForbiddenException extends CustomException {

    public ForbiddenException(String message, Integer code) {
        super(message, code);
    }
}
