package com.darass.darass.exception;

import com.darass.darass.exception.httpbasicexception.CustomException;
import com.darass.darass.exception.httpbasicexception.InternalServerException;
import com.darass.darass.exception.httpbasicexception.NotFoundException;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public enum ExceptionWithMessageAndCode {
    // 서버 관련 : 5xx
    INTERNAL_SERVER(new InternalServerException("서버 에러입니다. 서버 관리자에게 문의주세요.", 500)),
    
    // 유저 관련 : 6xx
    NOT_FOUND_USER(new NotFoundException("해당하는 유저가 없습니다.", 600)),
    
    // 프로젝트 관련 : 7xx
    NOT_FOUND_PROJECT(new NotFoundException("해당하는 프로젝트가 없습니다.", 700));

    private CustomException exception;

    ExceptionWithMessageAndCode(CustomException e) {
        this.exception = e;
    }
}
