package com.darass.darass.project.domain;

import com.darass.darass.common.domain.BaseTimeEntity;
import com.darass.darass.user.domain.User;
import java.util.Random;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Table(uniqueConstraints = {
    @UniqueConstraint(
        name = "SECRET_KEY_UNIQUE",
        columnNames={"secretKey"}
    )})
public class Project extends BaseTimeEntity {

    private static final int ASCII_CODE_OF_0 = 48;
    private static final int ASCII_CODE_OF_z = 122;
    private static final int TARGET_STRING_LENGTH = 10;
    private static final int ASCII_CODE_OF_9 = 57;
    private static final int ASCII_CODE_OF_A = 65;
    private static final int ASCII_CIDE_OF_Z = 90;
    private static final int ASCII_CODE_OF_a = 97;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private User user;

    private String name;

    private String secretKey;

    @Builder
    public Project(User user, String name) {
        this.user = user;
        this.name = name;
        this.secretKey = createRandomSecretKey();
    }

    private String createRandomSecretKey() {
        int leftLimit = ASCII_CODE_OF_0;
        int rightLimit = ASCII_CODE_OF_z;
        Random random = new Random();

        return random.ints(leftLimit, rightLimit + 1)
            .filter(i -> (i <= ASCII_CODE_OF_9 || i >= ASCII_CODE_OF_A) && (i <= ASCII_CIDE_OF_Z
                || i >= ASCII_CODE_OF_a))
            .limit(TARGET_STRING_LENGTH)
            .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
            .toString();
    }
}
