package com.darass.darass.comment.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class Stat {

    private final String date;

    private final Long count;
}