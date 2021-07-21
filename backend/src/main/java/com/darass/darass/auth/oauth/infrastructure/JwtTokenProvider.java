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

    @Value("${security.jwt.token.secret-key}")
    private String secretKey;

    @Value("${security.jwt.token.expire-length}")
    private long validityInMilliseconds;

    public String createAccessToken(String payload) {
        Claims claims = Jwts.claims().setSubject(payload);
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(now)
            .setExpiration(validity)
            .signWith(SignatureAlgorithm.HS256, secretKey)
            .compact();
    }

    public String getPayload(String accessToken) {
        try {
            return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(accessToken).getBody().getSubject();
        } catch (MalformedJwtException e) {
            throw ExceptionWithMessageAndCode.INVALID_JWT_TOKEN.getException();
        }
    }

    public void validateAccessToken(String accessToken) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(accessToken);
        } catch (JwtException | IllegalArgumentException e) {
            throw ExceptionWithMessageAndCode.INVALID_JWT_TOKEN.getException();
        }
    }
}
