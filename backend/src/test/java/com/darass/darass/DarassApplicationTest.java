package com.darass.darass;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;


@SpringBootTest(webEnvironment = WebEnvironment.NONE)
@DisplayName("DarassApplication 클래스 ")
class DarassApplicationTest {

    @DisplayName("애플리케이션이 실행된다.")
    @Test
    void main() {
        DarassApplication.main(new String[]{});
    }
}
