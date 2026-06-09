package quick.serve.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

	    http
	        .csrf(csrf -> csrf.disable())
	        .authorizeHttpRequests(auth -> auth
	            .requestMatchers("/entry/user_register").permitAll()
	            .requestMatchers("/entry/user_login").permitAll()
	            .requestMatchers("/entry/provider_register").permitAll()
	            .requestMatchers("/entry/provider_login").permitAll()
	            .requestMatchers("/view/separate").permitAll()
	            .requestMatchers("/view/all").permitAll()
	            .requestMatchers("/booking/costumer_booking").permitAll()
	            .anyRequest().authenticated()
	        );
            		

        return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}