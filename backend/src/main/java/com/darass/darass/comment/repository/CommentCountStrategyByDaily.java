package com.darass.darass.comment.repository;

import com.darass.darass.comment.domain.Stat;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CommentCountStrategyByDaily implements CommentCountStrategy {

    private static final String DATE = "DAILY";
    private static final Integer BEGIN_INDEX = 1;
    private static final Integer END_INDEX = 10;

    private final CommentRepository commentRepository;

    @Override
    public boolean isCountable(String periodicity) {
        return DATE.equals(periodicity.toUpperCase(Locale.ROOT));
    }

    @Override
    public List<Stat> calculateCount(String projectKey, LocalDateTime startDate, LocalDateTime endDate) {
        return commentRepository.findDateCount(projectKey, startDate, endDate, BEGIN_INDEX, END_INDEX).stream()
            .map(objects -> new Stat((String) objects[0], (Long) objects[1]))
            .collect(Collectors.toList());
    }
}
