package com.darass.comment.repository;

import com.darass.comment.domain.CommentStat;
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
    private static final int BEGIN_INDEX = 12;
    private static final int LENGTH = 2;
    private static final long DEFAULT_COMMENT_COUNT = 0L;

    private final CommentRepository commentRepository;

    @Override
    public boolean isCountable(String periodicity) {
        return DATE.equals(periodicity.toUpperCase(Locale.ROOT));
    }

    @Override
    public List<CommentStat> calculateCount(String projectKey, LocalDateTime startDate, LocalDateTime endDate) {
        List<CommentStat> commentStats = commentRepository
            .findDateCount(projectKey, startDate, endDate, BEGIN_INDEX, LENGTH).stream()
            .map(objects -> new CommentStat(String.valueOf(Integer.parseInt(String.valueOf(objects[0]))),
                (Long) objects[1]))
            .collect(Collectors.toList());

        List<CommentStat> noneHourlyCommentStats = getStatByNoneHourly(startDate, endDate, commentStats);
        commentStats.addAll(noneHourlyCommentStats);
        commentStats.sort(Comparator.comparingInt(s -> Integer.parseInt(s.getDate())));
        return commentStats;
    }

    private List<CommentStat> getStatByNoneHourly(LocalDateTime startDate, LocalDateTime endDate,
        List<CommentStat> commentStats) {
        List<CommentStat> noneHourlyCommentStats = new ArrayList<>();

        for (int localTime = LocalTime.MIN.getHour(); localTime <= LocalTime.MAX.getHour(); localTime++) {
            if (isExistHourlyStat(commentStats, localTime)) {
                continue;
            }
            noneHourlyCommentStats.add(new CommentStat(String.valueOf(localTime), DEFAULT_COMMENT_COUNT));
        }
        return noneHourlyCommentStats;
    }

    private boolean isExistHourlyStat(List<CommentStat> commentStats, int localTime) {
        return commentStats.stream()
            .anyMatch(commentStatistic -> localTime == Integer.parseInt(commentStatistic.getDate()));
    }
}
