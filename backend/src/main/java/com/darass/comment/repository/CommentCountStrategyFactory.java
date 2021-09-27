package com.darass.comment.repository;

import com.darass.exception.ExceptionWithMessageAndCode;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CommentCountStrategyFactory {

    private final List<CommentCountStrategy> commentCountStrategies;

    public CommentCountStrategy findStrategy(String periodicity) {
        return commentCountStrategies.stream()
            .filter(strategy -> !Objects.isNull(periodicity) && strategy.isCountable(periodicity))
            .findAny()
            .orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_PERIODICITY::getException);
    }
}
