package com.darass.darass;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
public class DarassApplication {

    public static void main(String[] args) {
        SpringApplication.run(DarassApplication.class, args);
    }

}
