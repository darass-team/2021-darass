package com.darass.darass.comment.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.darass.darass.SpringContainerTest;
import com.darass.darass.auth.oauth.api.domain.OAuthProviderType;
import com.darass.darass.comment.domain.Comment;
import com.darass.darass.comment.domain.CommentLike;
import com.darass.darass.comment.domain.SortOption;
import com.darass.darass.comment.dto.CommentCreateRequest;
import com.darass.darass.comment.dto.CommentDeleteRequest;
import com.darass.darass.comment.dto.CommentReadRequest;
import com.darass.darass.comment.dto.CommentReadRequestByPagination;
import com.darass.darass.comment.dto.CommentReadRequestBySearch;
import com.darass.darass.comment.dto.CommentReadRequestInProject;
import com.darass.darass.comment.dto.CommentReadResponseInProject;
import com.darass.darass.comment.dto.CommentResponse;
import com.darass.darass.comment.dto.CommentUpdateRequest;
import com.darass.darass.comment.repository.CommentLikeRepository;
import com.darass.darass.comment.repository.CommentRepository;
import com.darass.darass.exception.httpbasicexception.BadRequestException;
import com.darass.darass.exception.httpbasicexception.NotFoundException;
import com.darass.darass.exception.httpbasicexception.UnauthorizedException;
import com.darass.darass.project.domain.Project;
import com.darass.darass.project.repository.ProjectRepository;
import com.darass.darass.user.domain.GuestUser;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.domain.User;
import com.darass.darass.user.repository.UserRepository;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@DisplayName("CommentService 클래스")
class CommentServiceTest extends SpringContainerTest {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private CommentLikeRepository commentLikeRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommentService commentService;

    private User socialLoginUser;

    private GuestUser guestUser;

    private Project project;

    private List<Comment> comments;

    @BeforeEach
    @Transactional
    void setUp() {
        socialLoginUser = SocialLoginUser.builder()
            .nickName("우기")
            .profileImageUrl("http://프로필이미지-url")
            .userType("socialLoginUser")
            .email("bbwwpark@naver.com")
            .oauthProviderType(OAuthProviderType.KAKAO)
            .oauthId("1234")
            .build();
        userRepository.save(socialLoginUser);

        guestUser = GuestUser.builder()
            .nickName("jayon")
            .password("1234")
            .build();
        userRepository.save(guestUser);

        project = Project.builder()
            .user(socialLoginUser)
            .name("깃헙 블로그 프로젝트")
            .description("프로젝트 설명")
            .build();
        projectRepository.save(project);

        Comment comment1 = Comment.builder()
            .user(socialLoginUser)
            .project(project)
            .url("url")
            .content("content1")
            .build();
        commentRepository.save(comment1);

        Comment comment2 = Comment.builder()
            .user(socialLoginUser)
            .project(project)
            .url("url")
            .content("content2")
            .build();
        Comment savedComment2 = commentRepository.save(comment2);
        CommentLike likedComment2 = CommentLike.builder()
            .comment(savedComment2)
            .user(socialLoginUser)
            .build();
        commentLikeRepository.save(likedComment2);

        Comment comment3 = Comment.builder()
            .user(socialLoginUser)
            .project(project)
            .url("url")
            .content("content3")
            .build();
        commentRepository.save(comment3);

        Comment comment4 = Comment.builder()
            .user(guestUser)
            .project(project)
            .url("url2")
            .content("hello")
            .build();
        commentRepository.save(comment4);

        comments = Arrays.asList(comment1, comment2, comment3, comment4);
    }

    @DisplayName("소셜 로그인 유저가 댓글을 등록한다.")
    @Test
    void save() {
        CommentCreateRequest request = new CommentCreateRequest(null, null, project.getSecretKey(), "content", "url");
        assertThat(commentService.save(socialLoginUser, request).getContent()).isEqualTo("content");
    }

    @DisplayName("비로그인 유저가 댓글을 등록한다.")
    @Test
    void save_guest() {
        CommentCreateRequest request = new CommentCreateRequest(guestUser.getNickName(), guestUser.getPassword(),
            project.getSecretKey(), "content", "url");
        assertThat(commentService.save(guestUser, request).getContent()).isEqualTo("content");
    }

    @DisplayName("존재하지 않는 프로젝트에 댓글을 등록하면 에러를 던진다.")
    @Test
    void save_exception() {
        CommentCreateRequest request = new CommentCreateRequest(null, null, "secret", "content", "url");
        assertThatThrownBy(() -> commentService.save(socialLoginUser, request))
            .isInstanceOf(NotFoundException.class)
            .hasMessage("해당하는 프로젝트가 없습니다.");
    }

    @DisplayName("전체 댓글을 최신순으로 조회한다.")
    @Test
    void findAllCommentsByUrlAndProjectKey_latest() {
        CommentReadRequest request = new CommentReadRequest(SortOption.LATEST.name(), "url", project.getSecretKey());
        List<CommentResponse> responses = commentService.findAllCommentsByUrlAndProjectKey(request);
        assertThat(responses).extracting("content")
            .isEqualTo(Arrays.asList("content3", "content2", "content1"));
    }

    @DisplayName("전체 댓글을 좋아요순으로 조회한다.")
    @Test
    void findAllCommentsByUrlAndProjectKey_like() {
        CommentReadRequest request = new CommentReadRequest(SortOption.LIKE.name(), "url", project.getSecretKey());
        List<CommentResponse> responses = commentService.findAllCommentsByUrlAndProjectKey(request);
        assertThat(responses).extracting("content")
            .isEqualTo(Arrays.asList("content2", "content1", "content3"));
    }

    @DisplayName("전체 댓글을 과거순으로 조회한다.")
    @Test
    void findAllCommentsByUrlAndProjectKey_oldest() {
        CommentReadRequest request = new CommentReadRequest(SortOption.OTHER.name(), "url", project.getSecretKey());
        List<CommentResponse> responses = commentService.findAllCommentsByUrlAndProjectKey(request);
        assertThat(responses).extracting("content")
            .isEqualTo(Arrays.asList("content1", "content2", "content3"));
    }

    @DisplayName("특정 페이지의 댓글을 최신순으로 조회한다.")
    @Test
    void findAllCommentsByUrlAndProjectKeyUsingPagination_latest() {
        CommentReadRequestByPagination request =
            new CommentReadRequestByPagination(SortOption.LATEST.name(), "url", project.getSecretKey(), 1, 1);
        List<CommentResponse> responses = commentService.findAllCommentsByUrlAndProjectKeyUsingPagination(request);
        assertThat(responses).extracting("content")
            .isEqualTo(Collections.singletonList("content3"));
    }

    @DisplayName("특정 페이지의 댓글을 좋아요순으로 조회한다.")
    @Test
    void findAllCommentsByUrlAndProjectKeyUsingPagination_like() {
        CommentReadRequestByPagination request =
            new CommentReadRequestByPagination(SortOption.LIKE.name(), "url", project.getSecretKey(), 1, 1);
        List<CommentResponse> responses = commentService.findAllCommentsByUrlAndProjectKeyUsingPagination(request);
        assertThat(responses).extracting("content")
            .isEqualTo(Collections.singletonList("content2"));
    }

    @DisplayName("특정 페이지의 댓글을 과거순으로 조회한다.")
    @Test
    void findAllCommentsByUrlAndProjectKeyUsingPagination_oldest() {
        CommentReadRequestByPagination request =
            new CommentReadRequestByPagination(SortOption.OTHER.name(), "url", project.getSecretKey(), 1, 1);
        List<CommentResponse> responses = commentService.findAllCommentsByUrlAndProjectKeyUsingPagination(request);
        assertThat(responses).extracting("content")
            .isEqualTo(Collections.singletonList("content1"));
    }

    @DisplayName("특정 프로젝트에 해당하고, 시작 날짜와 종료 날짜 사이에 있는 임의의 페이지의 댓글을 최신순으로 조회한다.")
    @Test
    void findAllCommentsByProjectKeyUsingPaginationAndDateBetween_latest() {
        CommentReadRequestInProject request =
            new CommentReadRequestInProject("LATEST", project.getSecretKey(), LocalDate.EPOCH, LocalDate.now(), 1, 1);
        List<CommentReadResponseInProject> responses = commentService.findAllCommentsByProjectKeyUsingPaginationAndDateBetween(request);
        assertThat(responses).extracting("content")
            .isEqualTo(Collections.singletonList("hello"));
    }

    @DisplayName("특정 프로젝트에 해당하고, 시작 날짜와 종료 날짜 사이에 있는 임의의 페이지의 댓글을 좋아요으로 조회한다.")
    @Test
    void findAllCommentsByProjectKeyUsingPaginationAndDateBetween_like() {
        CommentReadRequestInProject request =
            new CommentReadRequestInProject("LIKE", project.getSecretKey(), LocalDate.EPOCH, LocalDate.now(), 1, 1);
        List<CommentReadResponseInProject> responses = commentService.findAllCommentsByProjectKeyUsingPaginationAndDateBetween(request);
        assertThat(responses).extracting("content")
            .isEqualTo(Collections.singletonList("content2"));
    }

    @DisplayName("특정 프로젝트에 해당하고, 시작 날짜와 종료 날짜 사이에 있는 임의의 페이지의 댓글을 과거순으로 조회한다.")
    @Test
    void findAllCommentsByProjectKeyUsingPaginationAndDateBetween_oldest() {
        CommentReadRequestInProject request =
            new CommentReadRequestInProject("OLDEST", project.getSecretKey(), LocalDate.EPOCH, LocalDate.now(), 1, 1);
        List<CommentReadResponseInProject> responses = commentService.findAllCommentsByProjectKeyUsingPaginationAndDateBetween(request);
        assertThat(responses).extracting("content")
            .isEqualTo(Collections.singletonList("content1"));
    }

    @DisplayName("특정 키워드가 들어 있는 내용의 댓글을 최신순으로 조회한다.")
    @Test
    void findAllCommentsByProjectKeyUsingPaginationAndDateBetweenAndLike_latest() {
        CommentReadRequestBySearch request =
            new CommentReadRequestBySearch("LATEST", project.getSecretKey(), "content", 1, 5);
        List<CommentReadResponseInProject> responses
            = commentService.findAllCommentsByProjectKeyUsingPaginationAndDateBetweenAndLike(request);

        assertThat(responses).extracting("content")
            .isEqualTo(Arrays.asList("content3", "content2", "content1"));
    }

    @DisplayName("특정 키워드가 들어 있는 내용의 댓글을 좋아요순으로 조회한다.")
    @Test
    void findAllCommentsByProjectKeyUsingPaginationAndDateBetweenAndLike_like() {
        CommentReadRequestBySearch request =
            new CommentReadRequestBySearch("LIKE", project.getSecretKey(), "content", 1, 5);
        List<CommentReadResponseInProject> responses
            = commentService.findAllCommentsByProjectKeyUsingPaginationAndDateBetweenAndLike(request);

        assertThat(responses).extracting("content")
            .isEqualTo(Arrays.asList("content2", "content1", "content3"));
    }

    @DisplayName("특정 키워드가 들어 있는 내용의 댓글을 과거순으로 조회한다.")
    @Test
    void findAllCommentsByProjectKeyUsingPaginationAndDateBetweenAndLike_oldest() {
        CommentReadRequestBySearch request =
            new CommentReadRequestBySearch("OLDEST", project.getSecretKey(), "content", 1, 5);
        List<CommentReadResponseInProject> responses
            = commentService.findAllCommentsByProjectKeyUsingPaginationAndDateBetweenAndLike(request);

        assertThat(responses).extracting("content")
            .isEqualTo(Arrays.asList("content1", "content2", "content3"));
    }

    @DisplayName("페이지네이션할 때 페이지는 1 이상이어야 한다.")
    @Test
    void pagination_exception() {
        CommentReadRequestInProject request =
            new CommentReadRequestInProject("LATEST", project.getSecretKey(), LocalDate.EPOCH, LocalDate.now(), 0, 1);
        assertThatThrownBy(() -> commentService.findAllCommentsByProjectKeyUsingPaginationAndDateBetween(request))
            .isInstanceOf(BadRequestException.class)
            .hasMessage("페이지의 값은 1 이상이어야 합니다.");
    }

    @DisplayName("소셜 로그인 유저가 댓글을 수정한다.")
    @Test
    void updateContent_social_login_user() {
        CommentUpdateRequest request = new CommentUpdateRequest("jayon");
        commentService.updateContent(comments.get(0).getId(), socialLoginUser, request);
        assertThat(commentRepository.findById(comments.get(0).getId()).get().getContent()).isEqualTo("jayon");
    }

    @DisplayName("비로그인 유저가 댓글을 수정한다.")
    @Test
    void updateContent_guest_user() {
        CommentUpdateRequest request = new CommentUpdateRequest(guestUser.getId(), guestUser.getPassword(), "jayon");
        commentService.updateContent(comments.get(3).getId(), guestUser, request);
        assertThat(commentRepository.findById(comments.get(3).getId()).get().getContent()).isEqualTo("jayon");
    }

    @DisplayName("소셜 로그인 유저는 남의 댓글을 수정하면 에러를 던진다.")
    @Test
    void updateContent_social_login_user_exception() {
        CommentUpdateRequest request = new CommentUpdateRequest("jayon");
        assertThatThrownBy(() -> commentService.updateContent(comments.get(3).getId(), socialLoginUser, request))
            .isInstanceOf(UnauthorizedException.class)
            .hasMessage("해당 댓글을 관리할 권한이 없습니다.");
    }

    @DisplayName("비로그인 유저가 비밀번호를 틀리면 댓글을 수정할 수 없다.")
    @Test
    void updateContent_guest_user_exception() {
        CommentUpdateRequest request = new CommentUpdateRequest(guestUser.getId(), "invalid", "jayon");
        assertThatThrownBy(() -> commentService.updateContent(comments.get(3).getId(), guestUser, request))
            .isInstanceOf(UnauthorizedException.class)
            .hasMessage("Guest 사용자의 비밀번호가 일치하지 않습니다.");
    }

    @DisplayName("소셜 로그인 유저가 댓글을 삭제한다.")
    @Test
    void delete_social_login_user() {
        CommentDeleteRequest request = new CommentDeleteRequest(null, null);
        commentService.delete(comments.get(0).getId(), socialLoginUser, request);
        assertThat(commentRepository.existsById(comments.get(0).getId())).isFalse();
    }

    @DisplayName("비로그인 유저가 댓글을 삭제한다.")
    @Test
    void delete_guest_user() {
        CommentDeleteRequest request = new CommentDeleteRequest(guestUser.getId(), guestUser.getPassword());
        commentService.delete(comments.get(3).getId(), guestUser, request);
        assertThat(commentRepository.existsById(comments.get(3).getId())).isFalse();
    }

    @DisplayName("비로그인 유저는 남의 댓글을 삭제할 수 없다.")
    @Test
    void delete_social_login_user_exception() {
        CommentDeleteRequest request = new CommentDeleteRequest(guestUser.getId(), guestUser.getPassword());
        assertThatThrownBy(() -> commentService.delete(comments.get(2).getId(), guestUser, request))
            .isInstanceOf(UnauthorizedException.class)
            .hasMessage("해당 댓글을 관리할 권한이 없습니다.");
    }

    @DisplayName("관리자가 다른 유저의 댓글을 삭제한다.")
    @Test
    @Transactional
    void delete_administrator() {
        CommentDeleteRequest request = new CommentDeleteRequest(null, null);
        commentService.delete(comments.get(3).getId(), socialLoginUser, request);
        assertThat(commentRepository.existsById(comments.get(3).getId())).isFalse();
    }

    @DisplayName("좋아요를 누른다.")
    @Test
    @Transactional
    void click_like() {
        commentService.toggleLikeStatus(comments.get(0).getId(), socialLoginUser);
        assertThat(comments.get(0).getCommentLikes()).hasSize(1);
    }

    @DisplayName("이미 좋아요가 되어 있으면 토글한다.")
    @Test
    void toggle_like() {
        commentService.toggleLikeStatus(comments.get(1).getId(), socialLoginUser);
        assertThat(comments.get(1).getCommentLikes()).hasSize(0);
    }
}