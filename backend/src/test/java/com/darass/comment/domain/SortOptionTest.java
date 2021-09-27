package com.darass.comment.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Sort;

@DisplayName("SortOption 클래스")
class SortOptionTest {

    @DisplayName("댓글을 최신순으로 정렬하는 Sort 객체를 반환한다.")
    @Test
    void getMatchedLatestSort() {
        Sort actual = SortOption.getMatchedSort("LATEST");
        assertThat(actual).isEqualTo(SortOption.LATEST.getSort());
    }

    @DisplayName("댓글을 좋아요순으로 정렬하는 Sort 객체를 반환한다.")
    @Test
    void getMatchedLikeSort() {
        Sort actual = SortOption.getMatchedSort("LIKE");
        assertThat(actual).isEqualTo(SortOption.LIKE.getSort());
    }

    @DisplayName("댓글을 과거순으로 정렬하는 Sort 객체를 반환한다.")
    @Test
    void getMatchedOldestSort() {
        Sort actual1 = SortOption.getMatchedSort("Oldest");
        Sort actual2 = SortOption.getMatchedSort("Jayon");
        Sort actual3 = SortOption.getMatchedSort(null);

        assertThat(actual1).isEqualTo(SortOption.OTHER.getSort());
        assertThat(actual2).isEqualTo(SortOption.OTHER.getSort());
        assertThat(actual3).isEqualTo(SortOption.OTHER.getSort());
    }
}