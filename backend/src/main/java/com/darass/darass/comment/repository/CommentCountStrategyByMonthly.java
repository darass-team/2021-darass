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
    private static final Integer LENGTH = 7;

    private final CommentRepository commentRepository;

    @Override
    public boolean isCountable(String periodicity) {
        return DATE.equals(periodicity.toUpperCase(Locale.ROOT));
    }

    @Override
    public List<Stat> calculateCount(String projectKey, LocalDateTime startDate, LocalDateTime endDate) {
        List<Stat> stats = commentRepository.findDateCount(projectKey, startDate, endDate, BEGIN_INDEX, LENGTH).stream()
            .map(objects -> new Stat((String) objects[0], (Long) objects[1]))
            .collect(Collectors.toList());

        List<Stat> noneMonthStats = getStatByNoneMonth(startDate, endDate, stats);
        stats.addAll(noneMonthStats);
        stats.sort(Comparator.comparing(Stat::getDate));
        return stats;
    }

    private List<Stat> getStatByNoneMonth(LocalDateTime startDate, LocalDateTime endDate, List<Stat> stats) {
        List<Stat> noneMonthStats = new ArrayList<>();
        YearMonth yearMonth = YearMonth.from(startDate);
        YearMonth endYearMonth = YearMonth.from(endDate);

        while (!yearMonth.equals(endYearMonth)) {
            if (isExistMonthStat(stats, yearMonth)) {
                continue;
            }
            noneMonthStats.add(new Stat(yearMonth.toString(), 0L));
            yearMonth = yearMonth.plusMonths(1L);

            if (yearMonth.equals(endYearMonth) && !isExistMonthStat(stats, yearMonth)) {
                noneMonthStats.add(new Stat(yearMonth.toString(), 0L));
            }
        }

        return noneMonthStats;
    }

    private boolean isExistMonthStat(List<Stat> stats, YearMonth yearMonth) {
        for (Stat stat : stats) {
            if (yearMonth.toString().equals(stat.getDate())) {
                return true;
            }
        }
        return false;
    }
}
