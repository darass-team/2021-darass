package com.darass.auth.infrastructure;

import com.darass.exception.ExceptionWithMessageAndCode;
import com.darass.user.domain.SocialLoginUser;
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

    public String createAccessToken(SocialLoginUser socialLoginUser) {
        Claims claims = Jwts.claims().setSubject(socialLoginUser.getId().toString());
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMillisecondsOfAccessToken);

        return createJwtToken(claims, now, validity, secretKeyOfAccessToken);
    }

    public String createRefreshToken(SocialLoginUser socialLoginUser) {
        Claims claims = Jwts.claims().setSubject(socialLoginUser.getId().toString());
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMillisecondsOfRefreshToken);

        String refreshToken = createJwtToken(claims, now, validity, secretKeyOfRefreshToken);
        socialLoginUser.updateRefreshToken(refreshToken);
        return refreshToken;
    }

    public void validateAccessToken(String accessToken) {
        validateToken(accessToken, secretKeyOfAccessToken);
    }

    public void validateRefreshToken(String refreshToken) {
        validateToken(refreshToken, secretKeyOfRefreshToken);
    }

    public String getAccessTokenPayload(String accessToken) {
        try {
            return Jwts.parser().setSigningKey(secretKeyOfAccessToken).parseClaimsJws(accessToken).getBody().getSubject();
        } catch (MalformedJwtException e) {
            throw ExceptionWithMessageAndCode.INVALID_JWT_TOKEN.getException();
        }
    }

    private String createJwtToken(Claims claims, Date now, Date validity, String secretKey) {
        return Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(now)
            .setExpiration(validity)
            .signWith(SignatureAlgorithm.HS256, secretKey)
            .compact();
    }

    private void validateToken(String token, String secretKey) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
        } catch (JwtException | IllegalArgumentException e) {
            throw ExceptionWithMessageAndCode.INVALID_JWT_TOKEN.getException();
        }
    }
}
