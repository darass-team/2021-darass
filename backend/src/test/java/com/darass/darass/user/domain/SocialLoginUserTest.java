package com.darass.darass.user.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.darass.darass.auth.oauth.api.domain.OAuthProviderType;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.user.infrastructure.S3Uploader;
import java.io.IOException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.exception.SdkClientException;

@DisplayName("SocialLoginUser 클래스")
class SocialLoginUserTest {

    private final String nickName = "우기";
    private final String email = "bbwwpark@naver.com";
    private final String oauthId = "12314341451354";
    private final OAuthProviderType oAuthProviderType = OAuthProviderType.KAKAO;
    private SocialLoginUser socialLoginUser;

    @BeforeEach
    void setUp() {
        socialLoginUser = SocialLoginUser.builder()
            .nickName(nickName)
            .email(email)
            .oauthId(oauthId)
            .oauthProviderType(oAuthProviderType)
            .build();
    }

    @DisplayName("SocialLoginUser 객체가 빌더 패턴으로 생성된다.")
    @Test
    void constructor() {
        assertThat(socialLoginUser).isNotNull();
        assertThat(socialLoginUser.getNickName()).isEqualTo(nickName);
        assertThat(socialLoginUser.getOauthId()).isEqualTo(oauthId);
        assertThat(socialLoginUser.getOauthProviderType()).isEqualTo(oAuthProviderType);
    }

    @DisplayName("isLoginUser 메서드는 true를 리턴한다.")
    @Test
    void isLoginUser() {
        assertThat(socialLoginUser.isLoginUser()).isTrue();
    }

    @DisplayName("isValidGuestPassword 메서드는 패스워드가 주어다면, 예외를 던진다.")
    @Test
    void isValidGuestPassword() {
        assertThatThrownBy(() -> {
            assertThat(socialLoginUser.isValidGuestPassword("password")).isTrue();
        }).isEqualTo(ExceptionWithMessageAndCode.NOT_GUEST_USER.getException());
    }

    @DisplayName("changeNickNameOrProfileImageIfExists 메서드는 nickName만 입력되면, nickName만 변경된다.")
    @Test
    void changeNickNameOrProfileImageIfExists_nickName() {
        // given
        String initName = "첫이름";
        String changedName = "변경된이름";
        String initProfileImageUrl = "첫이미지url주소";
        SocialLoginUser user = SocialLoginUser.builder()
            .nickName(initName)
            .profileImageUrl(initProfileImageUrl)
            .build();

        // when
        user.changeNickNameOrProfileImageIfExists(null, changedName, null);

        // then
        assertThat(user.getNickName()).isEqualTo(changedName);
        assertThat(user.getProfileImageUrl()).isEqualTo(initProfileImageUrl);
    }

    @DisplayName("changeNickNameOrProfileImageIfExists 메서드는 profileImageFile만 입력되면, profileImageFile만 변경된다.")
    @Test
    void changeNickNameOrProfileImageIfExists_profileImageFile() throws IOException {
        // given
        String initName = "첫이름";
        String initProfileImageUrl = "첫이미지url주소";
        String changedProfileImageUrl = "변경된이미지url주소";
        S3Uploader s3Uploader = mock(S3Uploader.class);
        MultipartFile multipartFile = mock(MultipartFile.class);

        when(s3Uploader.upload(any())).thenReturn(changedProfileImageUrl);
        SocialLoginUser user = SocialLoginUser.builder()
            .nickName(initName)
            .profileImageUrl(initProfileImageUrl)
            .build();

        // when
        user.changeNickNameOrProfileImageIfExists(s3Uploader, null, multipartFile);

        // then
        assertThat(user.getProfileImageUrl()).isEqualTo(changedProfileImageUrl);
    }

    @DisplayName("changeNickNameOrProfileImageIfExists 메서드는 IOException 예외가 발생할 경우 Internal Server Exception을 발생시킨다.")
    @Test
    void changeNickNameOrProfileImageIfExists_throwIOException() throws IOException {
        // given
        S3Uploader s3Uploader = mock(S3Uploader.class);
        when(s3Uploader.upload(any())).thenThrow(new IOException());
        SocialLoginUser user = SocialLoginUser.builder()
            .nickName("이름")
            .profileImageUrl("프로필 이미지")
            .build();
        MultipartFile multipartFile = mock(MultipartFile.class);

        // then
        assertThatThrownBy(() -> user.changeNickNameOrProfileImageIfExists(s3Uploader, null, multipartFile))
            .isEqualTo(ExceptionWithMessageAndCode.IO_EXCEPTION.getException());
    }
}