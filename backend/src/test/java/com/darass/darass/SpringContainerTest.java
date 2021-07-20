package com.darass.darass;

import org.junit.jupiter.api.parallel.Isolated;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@Isolated
@ActiveProfiles("test")
@SpringBootTest
public class SpringContainerTest extends IsolationTest {


}
