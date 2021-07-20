package com.darass.darass.project.domain;

import com.darass.darass.ParallelTest;

public class CustomSecretKeyFactory extends ParallelTest implements SecretKeyFactory {

    private final String secretKey;

    public CustomSecretKeyFactory(String secretKey) {
        this.secretKey = secretKey;
    }

    @Override
    public String createSecretKey() {
        return secretKey;
    }
}
