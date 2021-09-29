package com.darass.exception.httpbasicexception;

public class UnauthorizedException extends CustomException {

    public UnauthorizedException(String message, Integer code) {
        super(message, code);
    }
}
