package com.darass.darass.auth.oauth;

import com.darass.darass.auth.oauth.exception.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AuthControllerAdvice {

    @ExceptionHandler(AuthenticationException.class)
    public String authenticationExceptionHandler(AuthenticationException exception) {
        return exception.getMessage();
    }
}
