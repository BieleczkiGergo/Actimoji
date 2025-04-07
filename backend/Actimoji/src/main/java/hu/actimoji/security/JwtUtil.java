package hu.actimoji.security;

import hu.actimoji.account.Account;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;
import java.util.List;

@Component
public class JwtUtil {

    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    private final long validity = 1000 * 60 * 60;

    public String generateToken(Account account) {
        System.out.println("generating token");

        List<String> roles = account.getRoles();

        System.out.println("Creating token with roles: " + roles);

        return Jwts.builder().
                setSubject( account.getUserName() )
                .claim("roles", roles)
                .setIssuedAt(new Date())
                .setExpiration(new Date( System.currentTimeMillis() + validity))
                .signWith( key )
                .compact();

    }

    public boolean validateToken(String token) {
        try{
            Jwts.parser().setSigningKey( key ).parseClaimsJws(token);
            System.out.println("valid token");
            return true;

        } catch (JwtException e){
            System.out.println("invalid token");
            return false;

        }

    }

    public String getUsername(String token) {
        return Jwts.parser().setSigningKey( key ).parseClaimsJws(token)
                .getBody()
                .getSubject();

    }

    public List<String> getRoles(String token) {

        return (List<String>) Jwts.parser().setSigningKey( key ).parseClaimsJws(token).getBody().get("roles");
    }
}
