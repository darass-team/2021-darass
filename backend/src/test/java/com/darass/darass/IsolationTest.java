package com.darass.darass;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;

<<<<<<< HEAD
public class IsolationTest {
=======
public class IsolationTest extends ParallelTest {
>>>>>>> 0926d60 (refactor: 모든 테스트가 병렬적으로 수행되도록 리팩터링)

    @Autowired
    private DatabaseCleaner databaseCleaner;

    @BeforeEach
    void setUp() {
        databaseCleaner.tableClear();
    }
}
