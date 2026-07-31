package quick.serve.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import quick.serve.security.JwtAuthenticationFilter;

@Configuration
public class SecurityConfig {
	
	private final JwtAuthenticationFilter jwtAuthenticationFilter;

	public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
	    this.jwtAuthenticationFilter = jwtAuthenticationFilter;
	}

@Bean
SecurityFilterChain securityFilterChain(
        HttpSecurity http) throws Exception {

    http
        .csrf(csrf -> csrf.disable())
        
        .sessionManagement(session ->
        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

        .authorizeHttpRequests(auth -> auth

        		.requestMatchers("/user/user_register").permitAll()
        		.requestMatchers("/user/user_login").permitAll()
        		.requestMatchers("/user/profilePic/**").permitAll()

        		.requestMatchers("/provider/provider_register").permitAll()

        		.requestMatchers("/view/**").permitAll()

        		.requestMatchers("/forgot/**").permitAll()

        		.requestMatchers("/review/x").permitAll()
        		.requestMatchers("/review/all").permitAll()

        		.requestMatchers("/provider/document/**").permitAll()
        		.requestMatchers("/provider/certificate/**").permitAll()
        		.requestMatchers("/provider/extraCertificate/**").permitAll()

        		// Protected APIs
        		.requestMatchers("/admin/**").hasRole("admin")
        		.requestMatchers("/provider/**").hasRole("provider")
        		.requestMatchers("/customer/**").hasRole("customer")
            
            .anyRequest().authenticated()

        );
    
    http.addFilterBefore(
            jwtAuthenticationFilter,
            UsernamePasswordAuthenticationFilter.class
    );

    return http.build();
}

@Bean
PasswordEncoder passwordEncoder() {

    return new BCryptPasswordEncoder();
}

}
