package com.darass.darass.project.domain;

public class CustomSecretKeyFactory implements SecretKeyFactory {

    private String secretKey;

    public CustomSecretKeyFactory(String secretKey) {
        this.secretKey = secretKey;
    }

    @Override
    public String createSecretKey() {
        return secretKey;
    }
}
