package com.darass.comment.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;

import com.darass.auth.domain.KaKaoOAuthProvider;
import com.darass.comment.domain.Comment;
import com.darass.comment.domain.CommentLike;
import com.darass.comment.domain.SortOption;
import com.darass.comment.dto.CommentCreateRequest;
import com.darass.comment.dto.CommentDeleteRequest;
import com.darass.comment.dto.CommentReadRequest;
import com.darass.comment.dto.CommentReadRequestByPagination;
import com.darass.comment.dto.CommentReadRequestBySearch;
import com.darass.comment.dto.CommentReadRequestInProject;
import com.darass.comment.dto.CommentReadSecretCommentRequest;
import com.darass.comment.dto.CommentResponse;
import com.darass.comment.dto.CommentResponses;
import com.darass.comment.dto.CommentStatRequest;
import com.darass.comment.dto.CommentStatResponse;
import com.darass.comment.dto.CommentUpdateRequest;
import com.darass.comment.repository.CommentLikeRepository;
import com.darass.comment.repository.CommentRepository;
import com.darass.commentalarm.domain.CommentAlarm;
import com.darass.commentalarm.domain.CommentAlarmMachine;
import com.darass.commentalarm.domain.CommentAlarmType;
import com.darass.commentalarm.repository.CommentAlarmRepository;
import com.darass.SpringContainerTest;
import com.darass.exception.httpbasicexception.BadRequestException;
import com.darass.exception.httpbasicexception.NotFoundException;
import com.darass.exception.httpbasicexception.UnauthorizedException;
import com.darass.project.domain.Project;
import com.darass.project.repository.ProjectRepository;
import com.darass.user.domain.GuestUser;
import com.darass.user.domain.SocialLoginUser;
import com.darass.user.domain.User;
import com.darass.user.repository.UserRepository;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.transaction.annotation.Transactional;

@Transactional
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
    private CommentAlarmRepository commentAlarmRepository;

    @Autowired
    private CommentService commentService;

    @MockBean
    private CommentAlarmMachine commentAlarmMachine;

    private User socialLoginUser;

    private GuestUser guestUser;

    private User admin;

    private Project project;

    private List<Comment> comments;

    @BeforeEach
    void setUp() {
        doNothing().when(commentAlarmMachine).sendMessage(any());

        socialLoginUser = SocialLoginUser.builder()
            .nickName("우기")
            .profileImageUrl("http://프로필이미지-url")
            .userType("socialLoginUser")
            .email("bbwwpark@naver.com")
            .oauthProvider(KaKaoOAuthProvider.NAME)
            .oauthId("1234")
            .build();
        userRepository.save(socialLoginUser);

        guestUser = GuestUser.builder()
            .nickName("jayon")
            .password("1234")
            .build();
        userRepository.save(guestUser);

        admin = SocialLoginUser.builder()
            .nickName("진영")
            .profileImageUrl("http://프로필이미지-url")
            .userType("socialLoginUser")
            .email("pjy1368@naver.com")
            .oauthProvider(KaKaoOAuthProvider.NAME)
            .oauthId("1234")
            .build();
        userRepository.save(admin);

        project = Project.builder()
            .user(admin)
            .name("깃헙 블로그 프로젝트")
            .description("프로젝트 설명")
            .build();
        projectRepository.save(project);

        Comment comment1 = Comment.builder()
            .user(socialLoginUser)
            .project(project)
            .url("url")
            .content("content1")
            .secret(true)
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
            .secret(true)
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

    @DisplayName("소셜 로그인 유저가 댓글을 등록하고 알람 메세지를 저장한다.")
    @Test
    void save() {
        SocialLoginUser user = SocialLoginUser.builder()
            .nickName("우기")
            .profileImageUrl("http://프로필이미지-url")
            .userType("socialLoginUser")
            .email("bbwwpark@naver.com")
            .oauthProvider(KaKaoOAuthProvider.NAME)
            .oauthId("1234")
            .build();
        userRepository.save(user);

        Project project = Project.builder()
            .user(user)
            .name("깃헙 블로그 프로젝트")
            .description("프로젝트 설명")
            .build();
        projectRepository.save(project);

        CommentCreateRequest request = new CommentCreateRequest(null, null, null, project.getSecretKey(), "content", "url");
        assertThat(commentService.save(socialLoginUser, request).getContent()).isEqualTo("content");

        List<CommentAlarm> commentAlarms = commentAlarmRepository.findAll();
        CommentAlarm commentAlarm = commentAlarms.get(0);

        assertThat(commentAlarm.getComment().getContent()).isEqualTo("content");
        assertThat(commentAlarm.getSender()).isEqualTo(socialLoginUser);
        assertThat(commentAlarm.getCommentAlarmType()).isEqualTo(CommentAlarmType.CREATE_COMMENT);
    }

    @DisplayName("비로그인 유저가 댓글을 등록하고 알람 메세지를 보낸다.")
    @Test
    void save_guest() {
        CommentCreateRequest request = new CommentCreateRequest(guestUser.getNickName(), guestUser.getPassword(), null,
            project.getSecretKey(), "content", "url");
        assertThat(commentService.save(guestUser, request).getContent()).isEqualTo("content");

        List<CommentAlarm> commentAlarms = commentAlarmRepository.findAll();
        CommentAlarm commentAlarm = commentAlarms.get(0);

        assertThat(commentAlarm.getComment().getContent()).isEqualTo("content");
        assertThat(commentAlarm.getSender().getNickName()).isEqualTo(guestUser.getNickName());
        assertThat(commentAlarm.getCommentAlarmType()).isEqualTo(CommentAlarmType.CREATE_COMMENT);
    }

    @DisplayName("존재하지 않는 프로젝트에 댓글을 등록하면 에러를 던진다.")
    @Test
    void save_exception() {
        CommentCreateRequest request = new CommentCreateRequest(null, null, null, "secret", "content", "url");
        assertThatThrownBy(() -> commentService.save(socialLoginUser, request))
            .isInstanceOf(NotFoundException.class)
            .hasMessage("해당하는 프로젝트가 없습니다.");
    }

    @DisplayName("특정 URL의 댓글을 최신순으로 조회한다.")
    @Test
    void findAllCommentsByUrlAndProjectKey_latest() {
        CommentReadRequest request = new CommentReadRequest(SortOption.LATEST.name(), "url", project.getSecretKey());
        List<CommentResponse> responses = commentService.findAllCommentsByUrlAndProjectKey(admin, request).getComments();
        assertThat(responses).extracting("content").isEqualTo(Arrays.asList("content3", "content2", "content1"));
    }

    @DisplayName("특정 URL의 댓글을 좋아요순으로 조회한다.")
    @Test
    void findAllCommentsByUrlAndProjectKey_like() {
        CommentReadRequest request = new CommentReadRequest(SortOption.LIKE.name(), "url", project.getSecretKey());
        List<CommentResponse> responses = commentService.findAllCommentsByUrlAndProjectKey(admin, request).getComments();
        assertThat(responses).extracting("content").isEqualTo(Arrays.asList("content2", "content1", "content3"));
    }

    @DisplayName("특정 URL의 댓글을 과거순으로 조회한다.")
    @Test
    void findAllCommentsByUrlAndProjectKey_oldest() {
        CommentReadRequest request = new CommentReadRequest(SortOption.OTHER.name(), "url", project.getSecretKey());
        List<CommentResponse> responses = commentService.findAllCommentsByUrlAndProjectKey(admin, request).getComments();
        assertThat(responses).extracting("content").isEqualTo(Arrays.asList("content1", "content2", "content3"));
    }

    @DisplayName("특정 페이지의 댓글을 최신순으로 조회한다.")
    @Test
    void findAllCommentsByUrlAndProjectKeyUsingPagination_latest() {
        CommentReadRequestByPagination request =
            new CommentReadRequestByPagination(SortOption.LATEST.name(), "url", project.getSecretKey(), 1, 1);
        List<CommentResponse> responses = commentService.findAllCommentsByUrlAndProjectKeyUsingPagination(request)
            .getComments();
        assertThat(responses).extracting("content")
            .isEqualTo(Collections.singletonList("content3"));
    }

    @DisplayName("특정 페이지의 댓글을 좋아요순으로 조회한다.")
    @Test
    void findAllCommentsByUrlAndProjectKeyUsingPagination_like() {
        CommentReadRequestByPagination request =
            new CommentReadRequestByPagination(SortOption.LIKE.name(), "url", project.getSecretKey(), 1, 1);
        List<CommentResponse> responses = commentService.findAllCommentsByUrlAndProjectKeyUsingPagination(request)
            .getComments();
        assertThat(responses).extracting("content")
            .isEqualTo(Collections.singletonList("content2"));
    }

    @DisplayName("특정 페이지의 댓글을 과거순으로 조회한다.")
    @Test
    void findAllCommentsByUrlAndProjectKeyUsingPagination_oldest() {
        CommentReadRequestByPagination request =
            new CommentReadRequestByPagination(SortOption.OTHER.name(), "url", project.getSecretKey(), 1, 1);
        List<CommentResponse> responses = commentService.findAllCommentsByUrlAndProjectKeyUsingPagination(request)
            .getComments();
        assertThat(responses).extracting("content")
            .isEqualTo(Collections.singletonList("content1"));
    }

    @DisplayName("특정 프로젝트에 해당하고, 시작 날짜와 종료 날짜 사이에 있는 임의의 페이지의 댓글을 최신순으로 조회한다.")
    @Test
    void findAllCommentsByProjectKeyUsingPaginationAndDateBetween_latest() {
        CommentReadRequestInProject request =
            new CommentReadRequestInProject("LATEST", project.getSecretKey(), LocalDate.EPOCH, LocalDate.now(), 1, 1);
        List<CommentResponse> responses = commentService.findAllCommentsInProject(request)
            .getComments();
        assertThat(responses).extracting("content")
            .isEqualTo(Collections.singletonList("hello"));
    }

    @DisplayName("특정 프로젝트에 해당하고, 시작 날짜와 종료 날짜 사이에 있는 임의의 페이지의 댓글을 좋아요으로 조회한다.")
    @Test
    void findAllCommentsByProjectKeyUsingPaginationAndDateBetween_like() {
        CommentReadRequestInProject request =
            new CommentReadRequestInProject("LIKE", project.getSecretKey(), LocalDate.EPOCH, LocalDate.now(), 1, 1);
        List<CommentResponse> responses = commentService.findAllCommentsInProject(request)
            .getComments();
        assertThat(responses).extracting("content")
            .isEqualTo(Collections.singletonList("content2"));
    }

    @DisplayName("특정 프로젝트에 해당하고, 시작 날짜와 종료 날짜 사이에 있는 임의의 페이지의 댓글을 과거순으로 조회한다.")
    @Test
    void findAllCommentsByProjectKeyUsingPaginationAndDateBetween_oldest() {
        CommentReadRequestInProject request =
            new CommentReadRequestInProject("OLDEST", project.getSecretKey(), LocalDate.EPOCH, LocalDate.now(), 1, 1);
        List<CommentResponse> responses = commentService.findAllCommentsInProject(request)
            .getComments();
        assertThat(responses).extracting("content")
            .isEqualTo(Collections.singletonList("content1"));
    }

    @DisplayName("특정 키워드가 들어 있는 내용의 댓글을 최신순으로 조회한다.")
    @Test
    void findAllCommentsByProjectKeyUsingPaginationAndDateBetweenAndLike_latest() {
        CommentReadRequestBySearch request =
            new CommentReadRequestBySearch("LATEST", project.getSecretKey(), LocalDate.EPOCH, LocalDate.now(),
                "content", 1, 5);
        List<CommentResponse> responses = commentService.findAllCommentsInProjectUsingSearch(request)
            .getComments();
        assertThat(responses).extracting("content")
            .isEqualTo(Arrays.asList("content3", "content2", "content1"));
    }

    @DisplayName("특정 키워드가 들어 있는 내용의 댓글을 좋아요순으로 조회한다.")
    @Test
    void findAllCommentsByProjectKeyUsingPaginationAndDateBetweenAndLike_like() {
        CommentReadRequestBySearch request =
            new CommentReadRequestBySearch("LIKE", project.getSecretKey(), LocalDate.EPOCH, LocalDate.now(),
                "content", 1, 5);
        List<CommentResponse> responses = commentService.findAllCommentsInProjectUsingSearch(request)
            .getComments();
        assertThat(responses).extracting("content")
            .isEqualTo(Arrays.asList("content2", "content1", "content3"));
    }

    @DisplayName("특정 키워드가 들어 있는 내용의 댓글을 과거순으로 조회한다.")
    @Test
    void findAllCommentsByProjectKeyUsingPaginationAndDateBetweenAndLike_oldest() {
        CommentReadRequestBySearch request =
            new CommentReadRequestBySearch("OLDEST", project.getSecretKey(), LocalDate.EPOCH, LocalDate.now(),
                "content", 1, 5);
        List<CommentResponse> responses = commentService.findAllCommentsInProjectUsingSearch(request)
            .getComments();
        assertThat(responses).extracting("content")
            .isEqualTo(Arrays.asList("content1", "content2", "content3"));
    }

    @DisplayName("페이지네이션할 때 페이지는 1 이상이어야 한다.")
    @Test
    void pagination_exception() {
        CommentReadRequestInProject request =
            new CommentReadRequestInProject("LATEST", project.getSecretKey(), LocalDate.EPOCH, LocalDate.now(), 0, 1);
        assertThatThrownBy(() -> commentService.findAllCommentsInProject(request))
            .isInstanceOf(BadRequestException.class)
            .hasMessage("페이지의 값은 1 이상이어야 합니다.");
    }

    @DisplayName("특정 프로젝트의 시간별 댓글 통계를 구한다.")
    @Test
    void stat_hourly() {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = LocalDate.of(endDate.getYear(), endDate.getMonthValue() - 1, endDate.getDayOfMonth());
        CommentStatRequest request = new CommentStatRequest("HOURLY", project.getSecretKey(),
            startDate, endDate);
        CommentStatResponse commentStatResponse = commentService.giveStat(request);
        assertThat(commentStatResponse.getCommentStats()).hasSize(24);
    }

    @DisplayName("특정 프로젝트의 일별 댓글 통계를 구한다.")
    @Test
    void stat_daily() {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = LocalDate.of(endDate.getYear(), endDate.getMonthValue() - 1, endDate.getDayOfMonth());
        CommentStatRequest request = new CommentStatRequest("DAILY", project.getSecretKey(),
            startDate, endDate);
        CommentStatResponse commentStatResponse = commentService.giveStat(request);
        assertThat(commentStatResponse.getCommentStats())
            .hasSize((int) ChronoUnit.DAYS.between(startDate, endDate) + 1);
    }

    @DisplayName("특정 프로젝트의 일별 댓글 통계를 구한다. (시작 날짜 = 종료 날짜)")
    @Test
    void stat_daily_same_date() {
        LocalDate localDate = LocalDate.now().minusYears(10L);
        CommentStatRequest request = new CommentStatRequest("DAILY", project.getSecretKey(),
            localDate, localDate);
        CommentStatResponse commentStatResponse = commentService.giveStat(request);
        assertThat(commentStatResponse.getCommentStats())
            .hasSize(1);
    }

    @DisplayName("특정 프로젝트의 월별 댓글 통계를 구한다.")
    @Test
    void stat_monthly() {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = LocalDate.of(endDate.getYear(), endDate.getMonthValue() - 4, 1);
        CommentStatRequest request = new CommentStatRequest("MONTHLY", project.getSecretKey(),
            startDate, endDate);
        CommentStatResponse commentStatResponse = commentService.giveStat(request);
        assertThat(commentStatResponse.getCommentStats()).hasSize((int) ChronoUnit.MONTHS.between(startDate, endDate) + 1);
    }

    @DisplayName("특정 프로젝트의 월별 댓글 통계를 구한다. (시작 날짜 = 종료 날짜)")
    @Test
    void stat_monthly_same_date() {
        LocalDate localDate = LocalDate.now().minusYears(10L);
        CommentStatRequest request = new CommentStatRequest("MONTHLY", project.getSecretKey(),
            localDate, localDate);
        CommentStatResponse commentStatResponse = commentService.giveStat(request);
        assertThat(commentStatResponse.getCommentStats()).hasSize(1);
    }

    @DisplayName("소셜 로그인 유저가 댓글을 수정한다.")
    @Test
    void updateContent_social_login_user() {
        CommentUpdateRequest request = new CommentUpdateRequest("jayon");
        commentService.updateComment(comments.get(0).getId(), socialLoginUser, request);
        assertThat(commentRepository.findById(comments.get(0).getId()).get().getContent()).isEqualTo("jayon");
    }

    @DisplayName("비로그인 유저가 댓글을 수정한다.")
    @Test
    void updateContent_guest_user() {
        CommentUpdateRequest request = new CommentUpdateRequest(guestUser.getId(), guestUser.getPassword(), "jayon", false);
        commentService.updateComment(comments.get(3).getId(), guestUser, request);
        assertThat(commentRepository.findById(comments.get(3).getId()).get().getContent()).isEqualTo("jayon");
    }

    @DisplayName("소셜 로그인 유저는 남의 댓글을 수정하면 에러를 던진다.")
    @Test
    void updateContent_social_login_user_exception() {
        CommentUpdateRequest request = new CommentUpdateRequest("jayon");
        assertThatThrownBy(() -> commentService.updateComment(comments.get(3).getId(), socialLoginUser, request))
            .isInstanceOf(UnauthorizedException.class)
            .hasMessage("해당 댓글을 관리할 권한이 없습니다.");
    }

    @DisplayName("비로그인 유저가 비밀번호를 틀리면 댓글을 수정할 수 없다.")
    @Test
    void updateContent_guest_user_exception() {
        CommentUpdateRequest request = new CommentUpdateRequest(guestUser.getId(), "invalid", "jayon", false);
        assertThatThrownBy(() -> commentService.updateComment(comments.get(3).getId(), guestUser, request))
            .isInstanceOf(UnauthorizedException.class)
            .hasMessage("Guest 사용자의 비밀번호가 일치하지 않습니다.");
    }

    @DisplayName("비로그인 유저가 비밀 댓글을 조회한다.")
    @Test
    void readSecretComment_guest_user() {
        CommentReadSecretCommentRequest request = new CommentReadSecretCommentRequest(guestUser.getId(), guestUser.getPassword());
        commentService.readSecretComment(comments.get(3).getId(), guestUser, request);
        assertThat(commentRepository.findById(comments.get(2).getId()).get().isReadable())
            .isTrue();
    }

    @DisplayName("비로그인 유저가 비밀번호를 틀리면 비밀 댓글을 조회할 수 없다.")
    @Test
    void readSecretComment_guest_user_exception() {
        CommentReadSecretCommentRequest request = new CommentReadSecretCommentRequest(guestUser.getId(), "invalid");
        assertThatThrownBy(() -> commentService.readSecretComment(comments.get(3).getId(), guestUser, request))
            .isInstanceOf(UnauthorizedException.class)
            .hasMessage("Guest 사용자의 비밀번호가 일치하지 않습니다.");
    }

    @DisplayName("소셜 로그인 유저가 남의 비밀 댓글을 조회하려고 하면 에러를 던진다.")
    @Test
    void readSecretComment_login_user_exception() {
        CommentReadSecretCommentRequest request = new CommentReadSecretCommentRequest(null, null);
        assertThatThrownBy(() -> commentService.readSecretComment(comments.get(3).getId(), socialLoginUser, request))
            .isInstanceOf(UnauthorizedException.class)
            .hasMessage("해당 댓글을 관리할 권한이 없습니다.");
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
    void delete_administrator() {
        CommentDeleteRequest request = new CommentDeleteRequest(null, null);
        commentService.delete(comments.get(3).getId(), admin, request);
        assertThat(commentRepository.existsById(comments.get(3).getId())).isFalse();
    }

    @DisplayName("좋아요를 누른다.")
    @Test
    void click_like() {
        commentService.toggleLike(comments.get(0).getId(), guestUser);

        List<CommentAlarm> commentAlarms = commentAlarmRepository.findAll();
        CommentAlarm commentAlarm = commentAlarms.get(0);

        assertThat(comments.get(0).getCommentLikes()).hasSize(1);
        assertThat(comments.get(0).getUser()).isEqualTo(socialLoginUser);
        assertThat(commentAlarm.getComment().getContent()).isEqualTo("content1");
        assertThat(commentAlarm.getSender()).isEqualTo(guestUser);
        assertThat(commentAlarm.getCommentAlarmType()).isEqualTo(CommentAlarmType.CREATE_COMMENT_LIKE);
    }

    @Transactional
    @DisplayName("이미 좋아요가 되어 있으면 토글한다.")
    @Test
    void toggle_like() {
        //given
        commentLikeRepository.deleteAll();
        commentRepository.deleteAll();

        Comment comment = Comment.builder()
            .user(socialLoginUser)
            .project(project)
            .url("url")
            .content("content")
            .build();
        commentRepository.save(comment);

        commentService.toggleLike(comment.getId(), socialLoginUser);

        //when
        commentService.toggleLike(comment.getId(), socialLoginUser);

        //then
        assertThat(comment.getCommentLikes()).hasSize(0);
    }

    @DisplayName("비로그인 사용자가 볼 때, 비밀 댓글의 본문 내용은 확인이 불가능하다.")
    @Test
    void findAllCommentsByUrlAndProjectKeyConsiderSecretComment_guest_user() {
        CommentReadRequest request = new CommentReadRequest("latest", "url", project.getSecretKey());
        CommentResponses responses = commentService
            .findAllCommentsByUrlAndProjectKey(guestUser, request);

        for (CommentResponse commentResponse : responses.getComments()) {
            if (commentResponse.isSecret()) {
                assertThat(commentResponse.isReadable()).isFalse();
            }
        }
    }

    @DisplayName("로그인 사용자가 댓글을 볼 때, 자신이 쓴 댓글을 제외한 모든 비밀 댓글의 본문 내용은 확인이 불가능하다.")
    @Test
    void findAllCommentsByUrlAndProjectKeyConsiderSecretComment_login_user() {
        CommentReadRequest request = new CommentReadRequest("latest", "url", project.getSecretKey());
        CommentResponses responses = commentService
            .findAllCommentsByUrlAndProjectKey(socialLoginUser, request);

        for (CommentResponse commentResponse : responses.getComments()) {
            if (commentResponse.isSecret()) {
                if (socialLoginUser.isSameUser(commentResponse.getUser().getId())) {
                    assertThat(commentResponse.isReadable()).isTrue();
                    continue;
                }
                assertThat(commentResponse.isReadable()).isFalse();
            }
        }
    }

    @DisplayName("관리자는 모든 댓글을 열람할 수 있다.")
    @Test
    void findAllCommentsByUrlAndProjectKeyConsiderSecretComment_admin() {
        CommentReadRequest request = new CommentReadRequest("latest", "url", project.getSecretKey());
        CommentResponses responses = commentService
            .findAllCommentsByUrlAndProjectKey(socialLoginUser, request);

        for (CommentResponse commentResponse : responses.getComments()) {
            assertThat(commentResponse.isReadable()).isTrue();
        }
    }
}