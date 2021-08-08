package com.darass.darass.comment.repository;

import com.darass.darass.comment.domain.Stat;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CommentCountStrategyByHourly implements CommentCountStrategy {

    private static final String DATE = "HOURLY";
    private static final Integer BEGIN_INDEX = 12;
    private static final Integer LENGTH = 2;

    private final CommentRepository commentRepository;

    @Override
    public boolean isCountable(String periodicity) {
        return DATE.equals(periodicity.toUpperCase(Locale.ROOT));
    }

    @Override
    public List<Stat> calculateCount(String projectKey, LocalDateTime startDate, LocalDateTime endDate) {
        List<Stat> stats = commentRepository.findDateCount(projectKey, startDate, endDate, BEGIN_INDEX, LENGTH).stream()
            .map(objects -> new Stat(String.valueOf(Integer.parseInt(String.valueOf(objects[0]))), (Long) objects[1]))
            .collect(Collectors.toList());

        List<Stat> noneHourlyStats = getStatByNoneHourly(startDate, endDate, stats);
        stats.addAll(noneHourlyStats);
        stats.sort(Comparator.comparingInt(s -> Integer.parseInt(s.getDate())));
        return stats;
    }

    private List<Stat> getStatByNoneHourly(LocalDateTime startDate, LocalDateTime endDate, List<Stat> stats) {
        List<Stat> noneHourlyStats = new ArrayList<>();

        outer:
        for (LocalTime localTime = LocalTime.MIN; localTime.getHour() != LocalTime.MAX.getHour();
            localTime = localTime.plusHours(1L)) {
            for (Stat stat : stats) {
                if (localTime.getHour() == Integer.parseInt(stat.getDate())) {
                    continue outer;
                }
            }
            noneHourlyStats.add(new Stat(String.valueOf(localTime.getHour()), 0L));
        }
        return noneHourlyStats;
    }
}
