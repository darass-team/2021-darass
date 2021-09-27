package com.darass.comment.repository;

import com.darass.comment.domain.CommentStat;
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
    private static final int BEGIN_INDEX = 1;
    private static final int LENGTH = 10;
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
            .map(objects -> new CommentStat((String) objects[0], (Long) objects[1]))
            .collect(Collectors.toList());

        List<CommentStat> noneDailyCommentStats = getStatByNoneDaily(startDate, endDate, commentStats);
        commentStats.addAll(noneDailyCommentStats);
        commentStats.sort(Comparator.comparing(CommentStat::getDate));
        return commentStats;
    }

    private List<CommentStat> getStatByNoneDaily(LocalDateTime startDate, LocalDateTime endDate,
        List<CommentStat> commentStats) {
        List<CommentStat> noneMonthCommentStats = new ArrayList<>();
        LocalDate localDate = LocalDate.from(startDate);
        LocalDate end = LocalDate.from(endDate);

        while (!localDate.equals(end)) {
            if (isExistDailyStat(commentStats, localDate)) {
                localDate = localDate.plusDays(1L);
                continue;
            }
            noneMonthCommentStats.add(new CommentStat(localDate.toString(), DEFAULT_COMMENT_COUNT));
            localDate = localDate.plusDays(1L);
        }
        if (!isExistDailyStat(commentStats, localDate)) {
            noneMonthCommentStats.add(new CommentStat(localDate.toString(), DEFAULT_COMMENT_COUNT));
        }
        return noneMonthCommentStats;
    }

    private boolean isExistDailyStat(List<CommentStat> commentStats, LocalDate localDate) {
        return commentStats.stream()
            .anyMatch(commentStatistic -> localDate.toString().equals(commentStatistic.getDate()));
    }
}
