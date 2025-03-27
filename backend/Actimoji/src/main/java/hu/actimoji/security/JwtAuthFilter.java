package hu.actimoji.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        System.out.println(authHeader);

        if( authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;

        }

        final String token = authHeader.replace("Bearer ", "");
        System.out.println( "token: " + token );

        if( !jwtUtil.validateToken(token) ) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "invalid token");
            return;

        }

        final String username = jwtUtil.getUsername( token );
        final List<SimpleGrantedAuthority> roles = jwtUtil.getRoles(token)
                .stream().map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        System.out.println("extracted roles: " + roles);

        Authentication auth = new UsernamePasswordAuthenticationToken(username, null, roles);
        SecurityContextHolder.getContext().setAuthentication(auth);

        filterChain.doFilter(request, response);

    }
}
