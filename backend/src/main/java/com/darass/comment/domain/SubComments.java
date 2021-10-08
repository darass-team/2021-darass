package com.darass.comment.domain;

import java.util.List;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class SubComments {

    private final List<Comment> comments;

    public void handleSecretSubComment() {
        for (Comment subComment : comments) {
            if (subComment.isSecret()) {
                subComment.replaceCommentInfoToSecret();
            }
        }
    }
}
