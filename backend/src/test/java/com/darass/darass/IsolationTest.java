package com.darass.darass;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;

public class IsolationTest extends ParallelTest {

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
