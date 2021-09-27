package com.darass.project.domain;

import java.util.Random;

public class SecretKeyFactory {

    private static final int ASCII_CODE_OF_0 = 48;
    private static final int ASCII_CODE_OF_z = 122;
    private static final int TARGET_STRING_LENGTH = 15;
    private static final int ASCII_CODE_OF_9 = 57;
    private static final int ASCII_CODE_OF_A = 65;
    private static final int ASCII_CODE_OF_Z = 90;
    private static final int ASCII_CODE_OF_a = 97;
    private static final Random RANDOM = new Random();

    public String createSecretKey(String payload) {
        return RANDOM.ints(ASCII_CODE_OF_0, ASCII_CODE_OF_z + 1)
            .filter(i -> (i <= ASCII_CODE_OF_9 || i >= ASCII_CODE_OF_A) && (i <= ASCII_CODE_OF_Z || i >= ASCII_CODE_OF_a))
            .limit(TARGET_STRING_LENGTH)
            .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
            .toString() + payload;
    }

}
