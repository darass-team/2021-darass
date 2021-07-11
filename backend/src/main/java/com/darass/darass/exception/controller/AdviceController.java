package com.darass.darass.exception.controller;

import com.darass.darass.exception.dto.ExceptionResponse;
import com.darass.darass.exception.httpbasicexception.BadRequestException;
import com.darass.darass.exception.httpbasicexception.ConflictException;
import com.darass.darass.exception.httpbasicexception.NotFoundException;
import com.darass.darass.exception.httpbasicexception.UnauthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AdviceController {

    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ExceptionResponse handle(BadRequestException e) {
        return new ExceptionResponse(e.getMessage(), e.getCode());
    }

    @ExceptionHandler(ConflictException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ExceptionResponse handle(ConflictException e) {
        return new ExceptionResponse(e.getMessage(), e.getCode());
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ExceptionResponse handle(NotFoundException e) {
        return new ExceptionResponse(e.getMessage(), e.getCode());
    }

    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ExceptionResponse handle(UnauthorizedException e) {
        return new ExceptionResponse(e.getMessage(), e.getCode());
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ExceptionResponse handle(Exception e) {
        e.printStackTrace();
        return new ExceptionResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
    }
}
