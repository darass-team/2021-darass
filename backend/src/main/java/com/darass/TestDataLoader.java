package com.darass;

import com.darass.auth.domain.KaKaoOAuthProvider;
import com.darass.comment.domain.Comment;
import com.darass.comment.domain.CommentLike;
import com.darass.comment.repository.CommentRepository;
import com.darass.project.domain.Project;
import com.darass.project.repository.ProjectRepository;
import com.darass.user.domain.SocialLoginUser;
import com.darass.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("develop")
@AllArgsConstructor
public class TestDataLoader implements CommandLineRunner {

    public static final int MAX_TEST_DATA_COUNT = 1000000;
    public static final int MIN_TEST_DATA_COUNT = 0;

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final CommentRepository commentRepository;

    @Override
    public void run(String... args) throws Exception {
        long dataCount = userRepository.count() + projectRepository.count() + commentRepository.count();

        if (dataCount != MIN_TEST_DATA_COUNT) {
            return;
        }

        makeData();
    }

    private void makeData() {
        for (int testNumber = 0; testNumber < MAX_TEST_DATA_COUNT; testNumber++) {
            SocialLoginUser socialLoginUser = saveSocialLoginUser(testNumber);
            Project project = saveProject(testNumber, socialLoginUser);
            saveComment(testNumber, socialLoginUser, project);
        }
    }

    private SocialLoginUser saveSocialLoginUser(int testNumber) {
        SocialLoginUser socialLoginUser = SocialLoginUser.builder()
            .nickName("testNickname" + testNumber)
            .oauthId("testOauthId" + testNumber)
            .oauthProvider(KaKaoOAuthProvider.NAME)
            .profileImageUrl("testProfileImageUrl" + testNumber)
            .build();
        userRepository.save(socialLoginUser);
        return socialLoginUser;
    }

    private Project saveProject(int testNumber, SocialLoginUser socialLoginUser) {
        Project project = Project.builder()
            .name("testName" + testNumber)
            .user(socialLoginUser)
            .description("testDescription" + testNumber)
            .build();
        projectRepository.save(project);
        return project;
    }

    private void saveComment(int testNumber, SocialLoginUser socialLoginUser, Project project) {
        Comment comment = Comment.builder()
            .user(socialLoginUser)
            .content("testContent" + testNumber)
            .project(project)
            .url("testUrl" + testNumber)
            .build();

        comment.addCommentLike(CommentLike.builder()
            .comment(comment)
            .user(socialLoginUser)
            .build());

        commentRepository.save(comment);
    }

}
