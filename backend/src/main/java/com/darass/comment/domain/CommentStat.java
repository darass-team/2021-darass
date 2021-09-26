package com.darass.comment.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CommentStat {

    private final String date;

    private final Long count;
}
