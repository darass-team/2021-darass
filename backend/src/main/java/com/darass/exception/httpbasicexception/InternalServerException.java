package com.darass.exception.httpbasicexception;

public class InternalServerException extends CustomException {

    public InternalServerException(String message, Integer code) {
        super(message, code);
    }
}
