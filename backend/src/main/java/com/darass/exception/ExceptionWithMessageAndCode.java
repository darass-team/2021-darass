package com.darass.exception;

import com.darass.exception.httpbasicexception.BadRequestException;
import com.darass.exception.httpbasicexception.ConflictException;
import com.darass.exception.httpbasicexception.CustomException;
import com.darass.exception.httpbasicexception.InternalServerException;
import com.darass.exception.httpbasicexception.NotFoundException;
import com.darass.exception.httpbasicexception.UnauthorizedException;
import lombok.Getter;

@Getter
public enum ExceptionWithMessageAndCode {
    // 서버 관련 : 5xx
    INTERNAL_SERVER(new InternalServerException("서버 에러입니다. 서버 관리자에게 문의주세요.", 500)),
    JSON_PROCESSING_EXCEPTION(new InternalServerException("json 파싱 오류", 501)),

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
    INVALID_OAUTH_PROVIDER(new UnauthorizedException("존재하지 않는 oauth provider 입니다.", 803)),
    INVALID_OAUTH_AUTHORIZATION_CODE(new UnauthorizedException("유효하지 않은 oauth 인가 코드 입니다.", 804)),
    INVALID_OAUTH_ACCESS_TOKEN(new UnauthorizedException("유효하지 않은 oauth 엑세스 토큰입니다.", 805)),
    NOT_EXISTS_ACCESS_TOKEN(new UnauthorizedException("엑세스 토큰이 존재하지 않습니다.", 806)),
    NOT_EXISTS_REFRESH_TOKEN(new UnauthorizedException("리프레쉬 토큰이 존재하지 않습니다.", 807)),
    INVALID_REFRESH_TOKEN(new UnauthorizedException("리프레쉬 토큰이 유효하지 않습니다.", 808)),
    NOT_EXISTS_COOKIE(new BadRequestException("쿠키가 존재하지 않습니다.", 809)),

    // 댓글 관련 : 9xx
    NOT_FOUND_COMMENT(new NotFoundException("해당하는 댓글이 없습니다.", 900)),
    INVALID_GUEST_PASSWORD(new UnauthorizedException("Guest 사용자의 비밀번호가 일치하지 않습니다.", 901)),
    NOT_GUEST_USER(new UnauthorizedException("Guest 사용자가 아닙니다.", 902)),
    UNAUTHORIZED_FOR_COMMENT(new UnauthorizedException("해당 댓글을 관리할 권한이 없습니다.", 903)),
    INVALID_SUB_COMMENT_INDEX(new BadRequestException("대댓글에는 대댓글을 작성할 수 없습니다.", 904)),

    // 파일 관련 : 10xx
    IO_EXCEPTION(new BadRequestException("업로드할 파일이 잘못되었습니다.", 1000)),
    OVER_MAX_FILE_SIZE(new BadRequestException("업로드 가능한 파일 크기를 초과하였습니다.", 1400)),

    // 페이지네이션 관련 : 11xx
    PAGE_NOT_POSITIVE_EXCEPTION(new BadRequestException("페이지의 값은 1 이상이어야 합니다.", 1100)),

    // 통계 관련 : 12xx
    NOT_FOUND_PERIODICITY(new NotFoundException("해당하는 주기가 없습니다.", 1200)),

    // 제한 관련 : 13xx
    INVALID_INPUT_LENGTH(new BadRequestException("입력값의 길이기 적절하지 않습니다.", 1300));

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
