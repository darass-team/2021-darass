package com.darass.darass.exception.httpbasicexception.auth;

import com.darass.darass.exception.httpbasicexception.CustomException;

public class AuthenticationException extends CustomException {

    public AuthenticationException(String message, Integer code) {
        super(message, code);
    }
}
