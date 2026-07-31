package quick.serve.jwt;

import java.util.Base64;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import quick.serve.entity.UserEntity;

@Component
public class JwtUtil {
	
	private static final String SECRET = "QuickServeSuperSecretKeyForJwtAuthentication2026";

	private static final SecretKey SECRET_KEY = Keys.hmacShaKeyFor( Base64.getEncoder().encode(SECRET.getBytes()));

	private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24;
	
	public String generateToken(UserEntity user) {

	    return Jwts.builder()
	            .setSubject(user.getUserEmail())
	            .claim("role", user.getRole())
	            .setIssuedAt(new Date())
	            .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
	            .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
	            .compact();

	}
	
	public String extractEmail(String token) {

	    Claims claims = Jwts.parserBuilder()
	            .setSigningKey(SECRET_KEY)
	            .build()
	            .parseClaimsJws(token)
	            .getBody();

	    return claims.getSubject();

	}
	
	public boolean isTokenValid(String token) {

	    try {

	        Jwts.parserBuilder()
	                .setSigningKey(SECRET_KEY)
	                .build()
	                .parseClaimsJws(token);

	        return true;

	    } catch (Exception e) {

	        return false;

	    }

	}
	
	

}
