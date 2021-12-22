package com.darass.exception.controller;

import com.darass.exception.dto.ExceptionResponse;
import com.darass.exception.httpbasicexception.BadRequestException;
import com.darass.exception.httpbasicexception.ConflictException;
import com.darass.exception.httpbasicexception.NotFoundException;
import com.darass.exception.httpbasicexception.UnauthorizedException;
import com.darass.slack.SlackMessageSender;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ControllerAdvice {

    @Autowired
    private SlackMessageSender slackMessageSender;

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ExceptionResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        return new ExceptionResponse(e.getMessage(), HttpStatus.BAD_REQUEST.value());
    }

    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ExceptionResponse handleBadRequestException(BadRequestException e) {
        return new ExceptionResponse(e.getMessage(), e.getCode());
    }

    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ExceptionResponse handleUnauthorizedException(UnauthorizedException e) {
        return new ExceptionResponse(e.getMessage(), e.getCode());
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ExceptionResponse handleNotFoundException(NotFoundException e) {
        return new ExceptionResponse(e.getMessage(), e.getCode());
    }

    @ExceptionHandler(ConflictException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ExceptionResponse handleConflictException(ConflictException e) {
        return new ExceptionResponse(e.getMessage(), e.getCode());
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ExceptionResponse handleException(Exception e) {
        log.error(e.getMessage(), e);
        slackMessageSender.send(e);
        return new ExceptionResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
    }
}
