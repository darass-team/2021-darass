package com.darass.darass.comment.repository;

import com.darass.darass.exception.ExceptionWithMessageAndCode;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CommentCountStrategyFactory {

    private final List<CommentCountStrategy> commentCountStrategies;

    public CommentCountStrategy findStrategy(String period) {
        return commentCountStrategies.stream()
            .filter(strategy -> !Objects.isNull(period) && strategy.isCountable(period))
            .findAny()
            .orElseThrow(ExceptionWithMessageAndCode.NOT_FOUND_PERIODICITY::getException);
    }
}
