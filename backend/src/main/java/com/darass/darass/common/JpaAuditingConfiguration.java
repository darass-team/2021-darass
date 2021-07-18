package com.darass.darass.common;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.auditing.DateTimeProvider;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;

@Configuration
@EnableJpaAuditing(dateTimeProviderRef = "utcDateTimeProvider")
public class JpaAuditingConfiguration {

    @Bean
    public DateTimeProvider utcDateTimeProvider() {
        return () -> Optional.of(LocalDateTime.now(ZoneId.of("Asia/Seoul")));
    }
}