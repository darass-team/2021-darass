package com.darass.darass.exception;

import com.darass.darass.exception.httpbasicexception.CustomException;
import com.darass.darass.exception.httpbasicexception.InternalServerException;
import com.darass.darass.exception.httpbasicexception.NotFoundException;
import com.darass.darass.exception.httpbasicexception.UnauthorizedException;
import lombok.Getter;

@Getter
public enum ExceptionWithMessageAndCode {
    // 서버 관련 : 5xx
    INTERNAL_SERVER(new InternalServerException("서버 에러입니다. 서버 관리자에게 문의주세요.", 500)),

    // 유저 관련 : 6xx
    NOT_FOUND_USER(new NotFoundException("해당하는 유저가 없습니다.", 600)),

    // 프로젝트 관련 : 7xx
    NOT_FOUND_PROJECT(new NotFoundException("해당하는 프로젝트가 없습니다.", 700)),

    // 로그인 관련 : 8xx
    SHOULD_LOGIN(new UnauthorizedException("로그인을 해야 합니다.", 800)),
    INVALID_JWT_TOKEN(new UnauthorizedException("유효하지 않은 토큰입니다.", 801)),
    INVALID_JWT_NOT_FOUND_USER_TOKEN(new UnauthorizedException("존재하지 않는 사용자의 토큰입니다.", 802));

    private CustomException exception;

    ExceptionWithMessageAndCode(CustomException e) {
        this.exception = e;
    }
}
