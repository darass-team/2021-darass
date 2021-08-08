package com.darass.darass.comment.repository;

import com.darass.darass.comment.domain.Stat;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CommentCountStrategyByMonthly implements CommentCountStrategy {

    private static final String DATE = "MONTHLY";
    private static final Integer BEGIN_INDEX = 1;
    private static final Integer END_INDEX = 7;

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

        List<Stat> noneMonthStats = getStatByNoneMonth(startDate, endDate, stats);
        stats.addAll(noneMonthStats);
        stats.sort(Comparator.comparing(Stat::getDate));
        return stats;
    }

    private List<Stat> getStatByNoneMonth(LocalDateTime startDate, LocalDateTime endDate, List<Stat> stats) {
        List<Stat> noneMonthStats = new ArrayList<>();
        YearMonth startYearMonth = YearMonth.from(startDate);
        YearMonth endYearMonth = YearMonth.from(endDate);

        outer:
        for (YearMonth yearMonth = startYearMonth; !yearMonth.equals(endYearMonth); yearMonth = yearMonth.plusMonths(1L)) {
            for (Stat stat : stats) {
                if (yearMonth.toString().equals(stat.getDate())) {
                    continue outer;
                }
            }
            noneMonthStats.add(new Stat(yearMonth.toString(), 0L));
        }
        return noneMonthStats;
    }
}
