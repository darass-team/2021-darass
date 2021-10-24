package com.darass.healthcheck.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.darass.SpringContainerTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("HealthCheckController 클래스")
public class HealthCheckControllerTest extends SpringContainerTest {

    @DisplayName("/health GET으로 요청했을 때, 200으로 응답")
    @Test
    public void healthCheckTest() throws Exception {
        mockMvc.perform(get("/health"))
            .andExpect(status().isOk());
    }
}
