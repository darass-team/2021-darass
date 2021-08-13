package com.darass.darass.auth.oauth.infrastructure;

import com.darass.darass.exception.ExceptionWithMessageAndCode;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

    @Value("${security.jwt.access-token.secret-key}")
    private String secretKeyOfAccessToken;

    @Value("${security.jwt.refresh-token.secret-key}")
    private String secretKeyOfRefreshToken;

    @Value("${security.jwt.access-token.expire-length}")
    private long validityInMillisecondsOfAccessToken;

    @Value("${security.jwt.refresh-token.expire-length}")
    private long validityInMillisecondsOfRefreshToken;

    public String createAccessToken(String payload) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + validityInMillisecondsOfAccessToken);
        return createToken(payload, expiration, secretKeyOfAccessToken);
    }

    public String createRefreshToken(String payload) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + validityInMillisecondsOfRefreshToken);
        return createToken(payload, expiration, secretKeyOfRefreshToken);
    }

    private String createToken(String payload, Date expiration, String secretKey) {
        Claims claims = Jwts.claims().setSubject(payload);
        Date now = new Date();

        return Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(now)
            .setExpiration(expiration)
            .signWith(SignatureAlgorithm.HS256, secretKey)
            .compact();
    }

    public String getPayloadOfAccessToken(String accessToken) {
        try {
            return Jwts.parser().setSigningKey(secretKeyOfAccessToken).parseClaimsJws(accessToken).getBody().getSubject();
        } catch (MalformedJwtException e) {
            throw ExceptionWithMessageAndCode.INVALID_JWT_TOKEN.getException();
        }
    }

    public void validateAccessToken(String accessToken) {
        try {
            Jwts.parser().setSigningKey(secretKeyOfAccessToken).parseClaimsJws(accessToken);
        } catch (JwtException | IllegalArgumentException e) {
            throw ExceptionWithMessageAndCode.INVALID_JWT_TOKEN.getException();
        }
    }

    public void validateRefreshToken(String refreshToken) {
        try {
            Jwts.parser().setSigningKey(secretKeyOfRefreshToken).parseClaimsJws(refreshToken);
        } catch (JwtException | IllegalArgumentException e) {
            throw ExceptionWithMessageAndCode.SHOULD_LOGIN.getException();
        }
    }
}
