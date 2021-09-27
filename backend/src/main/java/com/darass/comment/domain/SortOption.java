package com.darass.comment.domain;

import java.util.Arrays;
import java.util.Locale;
import java.util.Objects;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

@Getter
@RequiredArgsConstructor
public enum SortOption {
    LATEST(Sort.by(Direction.DESC, "id")),
    LIKE(Sort.by(Direction.DESC, "likeCount").and(Sort.by("id"))),
    OTHER(Sort.by(Direction.ASC, "id"));

    private final Sort sort;

    public static Sort getMatchedSort(String sorting) {
        if (Objects.isNull(sorting)) {
            return OTHER.sort;
        }
        return Arrays.stream(values())
            .filter(sortOption -> sortOption.name().equals(sorting.toUpperCase(Locale.ROOT)))
            .findAny()
            .orElse(OTHER)
            .sort;
    }
}
