package com.darass.healthcheck.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {
    @GetMapping("/health")
    public ResponseEntity<Void> healthCheck() {
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}
