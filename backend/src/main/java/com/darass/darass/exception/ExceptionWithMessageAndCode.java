package com.darass.darass.exception;

import com.darass.darass.exception.httpbasicexception.BadRequestException;
import com.darass.darass.exception.httpbasicexception.ConflictException;
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
    DUPLICATE_PROJECT_SECRET_KEY(new ConflictException("프로젝트의 Secret Key의 중복이 발생했습니다. 다시 프로젝트 생성을 시도해주세요.", 701)),
    DUPLICATE_PROJECT_NAME(new ConflictException("동일한 프로젝트 이름이 존재합니다. 다시 프로젝트 생성을 시도해주세요.", 702)),

    // 로그인 관련 : 8xx
    SHOULD_LOGIN(new UnauthorizedException("로그인을 해야 합니다.", 800)),
    INVALID_JWT_TOKEN(new UnauthorizedException("유효하지 않은 토큰입니다.", 801)),
    INVALID_JWT_NOT_FOUND_USER_TOKEN(new UnauthorizedException("존재하지 않는 사용자의 토큰입니다.", 802)),

    // 댓글 관련 : 9xx
    NOT_FOUND_COMMENT(new NotFoundException("해당하는 댓글이 없습니다.", 900)),
    INVALID_GUEST_PASSWORD(new UnauthorizedException("Guest 사용자의 비밀번호가 일치하지 않습니다.", 901)),
    NOT_GUEST_USER(new UnauthorizedException("Guest 사용자가 아닙니다.", 902)),
    UNAUTHORIZED_FOR_COMMENT(new UnauthorizedException("해당 댓글을 관리할 권한이 없습니다.", 903)),

    // 파일 관련 : 10xx
    IO_EXCEPTION(new BadRequestException("업로드할 파일이 잘못되었습니다.", 1000));

    private final CustomException exception;

    ExceptionWithMessageAndCode(CustomException e) {
        this.exception = e;
    }

    public String findMessage() {
        return exception.getMessage();
    }

    public Integer findCode() {
        return exception.getCode();
    }

}
