package com.darass.darass.user.infrastructure;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.darass.darass.SpringContainerTest;
import java.io.IOException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@DisplayName("S3Uploader 클래스")
public class S3UploaderTest extends SpringContainerTest {

    @SpyBean(name = "s3Uploader")
    private S3Uploader s3Uploader;

    @MockBean(name = "s3Client")
    private S3Client s3Client;

    @DisplayName("S3에 이미지를 업로드 했을 때, 정상적으로 이미지 URL을 Return하는 지 테스트")
    @Test
    public void upload() throws IOException {
        given(s3Client.putObject(any(PutObjectRequest.class), any(RequestBody.class)))
            .willReturn(null);
        MultipartFile multipartFile = mock(MultipartFile.class);
        when(multipartFile.getOriginalFilename()).thenReturn("파일이름");
        byte[] byteArray = {};
        when(multipartFile.getBytes()).thenReturn(byteArray);

        assertThat(s3Uploader.upload(multipartFile)).isNotNull();
    }
}
