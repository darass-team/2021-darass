package com.darass.darass.comment.dto;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

@Getter
@AllArgsConstructor
public class CommentReadRequestBySearch {

    private String sortOption;

    private String projectKey;

    @DateTimeFormat(iso = ISO.DATE)
    private LocalDate startDate;

    @DateTimeFormat(iso = ISO.DATE)
    private LocalDate endDate;

    private String keyword;

    private Integer page;

    private Integer size;

}
