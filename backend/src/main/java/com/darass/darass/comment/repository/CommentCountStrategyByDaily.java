package com.darass.darass.comment.repository;

import com.darass.darass.comment.domain.Stat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
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
        List<Stat> stats = commentRepository.findDateCount(projectKey, startDate, endDate, BEGIN_INDEX, END_INDEX).stream()
            .map(objects -> new Stat((String) objects[0], (Long) objects[1]))
            .collect(Collectors.toList());

        List<Stat> noneMonthStats = getStatByNoneDaily(startDate, endDate, stats);
        stats.addAll(noneMonthStats);
        stats.sort(Comparator.comparing(Stat::getDate));
        return stats;
    }

    private List<Stat> getStatByNoneDaily(LocalDateTime startDate, LocalDateTime endDate, List<Stat> stats) {
        List<Stat> noneMonthStats = new ArrayList<>();
        LocalDate start = LocalDate.from(startDate);
        LocalDate end = LocalDate.from(endDate);

        outer:
        for (LocalDate localDate = start; !localDate.equals(end); localDate = localDate.plusDays(1L)) {
            for (Stat stat : stats) {
                if (localDate.toString().equals(stat.getDate())) {
                    continue outer;
                }
            }
            noneMonthStats.add(new Stat(localDate.toString(), 0L));
        }
        return noneMonthStats;
    }
}
