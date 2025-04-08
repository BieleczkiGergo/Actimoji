package hu.actimoji.security;

import hu.actimoji.account.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    AccountService accountService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthFilter jwtAuthFilter) throws Exception {
        return http.cors(Customizer.withDefaults()).csrf( AbstractHttpConfigurer :: disable )
                .authorizeHttpRequests( auth -> auth
                        .requestMatchers("/profile/*").permitAll()
                        .requestMatchers(
                                "/review/*"
                                , "/mod/review/**"
                        ).hasRole("MODERATOR")
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/swagger-ui.html"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement( sess -> sess.sessionCreationPolicy( SessionCreationPolicy.STATELESS ) )
                .formLogin( AbstractHttpConfigurer::disable )
                .httpBasic( AbstractHttpConfigurer::disable )
                .addFilterBefore( jwtAuthFilter, UsernamePasswordAuthenticationFilter.class ).build();

    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService( accountService );
        authProvider.setPasswordEncoder( passwordEncoder() );
        return authProvider;

    }


    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();

    }
}
