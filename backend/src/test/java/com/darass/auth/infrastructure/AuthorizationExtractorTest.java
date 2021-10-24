package com.darass.auth.infrastructure;

import static org.assertj.core.api.Assertions.assertThat;

import com.darass.SpringContainerTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;

@DisplayName("AuthorizationExtractor 클래스")
class AuthorizationExtractorTest extends SpringContainerTest {

    private final MockHttpServletRequest mockHttpServletRequest = new MockHttpServletRequest();
    private final String basicAuthType = "Basic ";
    private final String bearerAuthType = "Bearer ";
    private final String mutualAuthType = "Mutual ";
    private final String accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjI2NTI2MzI3LCJleHAiOjE2MjY1MzE1MTF9.ByMJIr0G2gLcQs_7N6lLpEWAqWXq4CYdEe-QUfMjWI0";

    @BeforeEach
    void setUp() {
        mockHttpServletRequest.addHeader("authorization", mutualAuthType + accessToken);
        mockHttpServletRequest.addHeader("authorization", basicAuthType + accessToken);
    }

    @DisplayName("extract 메서드는 Bearer 타입 토큰 정보가 담긴 Authorization 헤더를 가지는 httpServletRequest가 주어진다면, 엑세스 토큰을 파싱헤서 반환한다.")
    @Test
    void extract_success1() {
        mockHttpServletRequest.addHeader("authorization", bearerAuthType + accessToken);
        AuthorizationExtractor authorizationExtractor = new AuthorizationExtractor();

        assertThat(AuthorizationExtractor.extract(mockHttpServletRequest)).isEqualTo(accessToken);
    }

    @DisplayName("extract 메서드는 엑세스 토큰 뒤에 추가 정보가 콤마를 기준으로 붙어 있는 Authorization 헤더를 가지는 httpServletRequest가 주어진다면, 엑세스 토큰을 파싱헤서 반환한다.")
    @Test
    void extract_success2() {
        mockHttpServletRequest
            .addHeader("authorization", bearerAuthType + accessToken + ", Basic YXNkZnNhZGZzYWRmOlZLdDVOMVhk");
        AuthorizationExtractor authorizationExtractor = new AuthorizationExtractor();

        assertThat(AuthorizationExtractor.extract(mockHttpServletRequest)).isEqualTo(accessToken);
    }

    @DisplayName("extract 메서드는 Authorization 헤더가 없는 httpServletRequest가 주어진다면, null을 리턴한다.")
    @Test
    void extract_fail() {
        AuthorizationExtractor authorizationExtractor = new AuthorizationExtractor();

        assertThat(AuthorizationExtractor.extract(mockHttpServletRequest)).isEqualTo(null);
    }

}