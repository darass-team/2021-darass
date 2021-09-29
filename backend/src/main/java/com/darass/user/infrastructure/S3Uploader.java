package com.darass.user.infrastructure;

import com.darass.exception.ExceptionWithMessageAndCode;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.exception.SdkClientException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Component
@RequiredArgsConstructor
public class S3Uploader {

    private static final String S3_BUCKET_NAME = "darass-user-profile-image";
    private static final String CLOUDFRONT_URL = "https://d3qmnph7nb4773.cloudfront.net/";
    private final S3Client s3;

    public String upload(MultipartFile multipartFile) {
        File uploadFile = convert(multipartFile);
        String uploadFileUrl = uploadToS3(uploadFile);
        return uploadFileUrl;
    }

    private File convert(MultipartFile multipartFile) {
        File file = new File(multipartFile.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(file)) {
            fos.write(multipartFile.getBytes());
        } catch (IOException e) {
            throw ExceptionWithMessageAndCode.IO_EXCEPTION.getException();
        }
        return file;
    }

    private String uploadToS3(File uploadFile) {
        String fileName = new Date().getTime() + uploadFile.getName();
        PutObjectRequest objectRequest = PutObjectRequest.builder()
            .bucket(S3_BUCKET_NAME)
            .key(fileName)
            .build();
        try {
            s3.putObject(objectRequest, RequestBody.fromFile(uploadFile));
        } catch (SdkClientException e) {
            throw e;
        } finally {
            removeNewFile(uploadFile);
        }
        String uploadFileUrl = CLOUDFRONT_URL + fileName;
        return uploadFileUrl;
    }

    private void removeNewFile(File uploadFile) {
        uploadFile.delete();
    }
}
