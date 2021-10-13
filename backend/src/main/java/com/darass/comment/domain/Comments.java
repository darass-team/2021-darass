package com.darass.comment.domain;

import com.darass.user.domain.User;
import java.util.ArrayList;
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

    public long totalComment() {
        return comments.size();
    }

    public long totalCommentWithSubComment() {
        return comments.size() + totalSubComment();
    }

    public long totalSubComment() {
        return comments.stream()
            .mapToInt(Comment::getSubCommentSize)
            .sum();
    }

    public void handleSecretComments(User commentReadUser, Long adminUserId) {
        if (!commentReadUser.isLoginUser()) {
            handleSecretCommentWithGuestUser();
            return;
        }
        if (!commentReadUser.isAdminUser(adminUserId)) {
            handleSecretCommentWithLoginUser(commentReadUser);
        }
    }

    public void handleSecretCommentWithGuestUser() {
        for (Comment comment : comments) {
            comment.handleSecretComment();
        }
    }

    public void handleSecretCommentWithLoginUser(User user) {
        for (Comment comment : comments) {
            if (user.isSameUser(comment.getUser())) {
                continue;
            }
            comment.handleSecretComment();
        }
    }

    public List<Comment> getComments() {
        return new ArrayList<>(comments);
    }
}
