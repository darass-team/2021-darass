package com.darass.darass.comment.repository;

import com.darass.darass.comment.domain.CommentStat;
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
    private static final int BEGIN_INDEX = 1;
    private static final int LENGTH = 7;
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

        List<CommentStat> noneMonthCommentStats = getStatByNoneMonth(startDate, endDate, commentStats);
        commentStats.addAll(noneMonthCommentStats);
        commentStats.sort(Comparator.comparing(CommentStat::getDate));
        return commentStats;
    }

    private List<CommentStat> getStatByNoneMonth(LocalDateTime startDate, LocalDateTime endDate,
        List<CommentStat> commentStats) {
        List<CommentStat> noneMonthCommentStats = new ArrayList<>();
        YearMonth yearMonth = YearMonth.from(startDate);
        YearMonth endYearMonth = YearMonth.from(endDate);

        int count = 0;
        while (!yearMonth.equals(endYearMonth)) {
            count++;
            if (isExistMonthStat(commentStats, yearMonth)) {
                yearMonth = yearMonth.plusMonths(1L);
                continue;
            }
            noneMonthCommentStats.add(new CommentStat(yearMonth.toString(), DEFAULT_COMMENT_COUNT));
            yearMonth = yearMonth.plusMonths(1L);
            if (count > 100000) {
                throw new RuntimeException("while문 무한 반복이 의심됩니다.");
            }
        }
        if (!isExistMonthStat(commentStats, yearMonth)) {
            noneMonthCommentStats.add(new CommentStat(yearMonth.toString(), DEFAULT_COMMENT_COUNT));
        }
        return noneMonthCommentStats;
    }

    private boolean isExistMonthStat(List<CommentStat> commentStats, YearMonth yearMonth) {
        return commentStats.stream()
            .anyMatch(commentStatistic -> yearMonth.toString().equals(commentStatistic.getDate()));
    }
}
