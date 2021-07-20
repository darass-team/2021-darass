package com.darass.darass.project.domain;

import com.darass.darass.ParallelTest;

<<<<<<< HEAD
=======
public class CustomSecretKeyFactory extends ParallelTest implements SecretKeyFactory {

>>>>>>> 0926d60 (refactor: 모든 테스트가 병렬적으로 수행되도록 리팩터링)
    private final String secretKey;

    public CustomSecretKeyFactory(String secretKey) {
        this.secretKey = secretKey;
    }

    @Override
    public String createSecretKey() {
        return secretKey;
    }
}
