package com.darass.darass.comment.domain;

import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class Comments {

    private final List<Comment> comments;

    public List<Comment> match(String url, String projectKey) {
        return comments.stream()
            .filter(it -> it.match(url, projectKey))
            .collect(Collectors.toList());
    }
}
