package com.darass.darass;

import static org.junit.jupiter.api.parallel.ExecutionMode.CONCURRENT;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.parallel.Execution;
import org.junit.jupiter.api.parallel.Isolated;
import org.springframework.beans.factory.annotation.Autowired;

public class IsolationTest {

    @Autowired
    private DatabaseCleaner databaseCleaner;

    @BeforeEach
    void setUp() {
        if (!databaseCleaner.isInit()) {
            databaseCleaner.afterPropertiesSet();
        }
        databaseCleaner.tableClear();
    }
}
