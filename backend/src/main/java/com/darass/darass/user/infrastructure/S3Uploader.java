package com.darass.darass.user.infrastructure;

import com.darass.darass.exception.ExceptionWithMessageAndCode;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.exception.SdkClientException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Component
public class S3Uploader {

    private static final String S3_BUCKET_NAME = "darass-user-profile-image";
    private static final String CLOUDFRONT_URL = "https://d3qmnph7nb4773.cloudfront.net/";
    private Region region;

    private S3Client s3;

    public S3Uploader() {
        this.region = Region.AP_NORTHEAST_2;
        this.s3 = S3Client.builder()
            .region(region)
            .build();
    }

    public String upload(MultipartFile multipartFile) {
        File uploadFile;
        try {
            uploadFile = convert(multipartFile);
        } catch (IOException e) {
            throw ExceptionWithMessageAndCode.INTERNAL_SERVER.getException();
        }

        try {
            String uploadImageUrl = upload(uploadFile);
            return uploadImageUrl;
        } catch (SdkClientException e) {
            throw ExceptionWithMessageAndCode.AWS_SDK_CLIENT_EXCEPTION.getException();
        } finally {
            removeNewFile(uploadFile);
        }
    }

    private File convert(MultipartFile multipartFile) throws IOException{
        File file = new File(multipartFile.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(file)) {
            fos.write(multipartFile.getBytes());
        }
        return file;
    }

    private String upload(File uploadFile) {
        String fileName = new Date().getTime() + uploadFile.getName();
        PutObjectRequest objectRequest = PutObjectRequest.builder()
            .bucket(S3_BUCKET_NAME)
            .key(fileName)
            .build();
        s3.putObject(objectRequest, RequestBody.fromFile(uploadFile));
        String uploadFileUrl = CLOUDFRONT_URL + fileName;
        return uploadFileUrl;
    }

    private void removeNewFile(File uploadFile) {
        uploadFile.delete();
    }
}
