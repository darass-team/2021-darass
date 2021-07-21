package com.darass.darass.project.domain;

import java.util.Random;

public class RandomSecretKeyFactory implements SecretKeyFactory {

    private static final int ASCII_CODE_OF_0 = 48;
    private static final int ASCII_CODE_OF_z = 122;
    private static final int TARGET_STRING_LENGTH = 15;
    private static final int ASCII_CODE_OF_9 = 57;
    private static final int ASCII_CODE_OF_A = 65;
    private static final int ASCII_CODE_OF_Z = 90;
    private static final int ASCII_CODE_OF_a = 97;

    @Override
    public String createSecretKey() {
        int leftLimit = ASCII_CODE_OF_0;
        int rightLimit = ASCII_CODE_OF_z;
        Random random = new Random();

        return random.ints(leftLimit, rightLimit + 1)
            .filter(i -> (i <= ASCII_CODE_OF_9 || i >= ASCII_CODE_OF_A) && (i <= ASCII_CODE_OF_Z
                || i >= ASCII_CODE_OF_a))
            .limit(TARGET_STRING_LENGTH)
            .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
            .toString();
    }

}
