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
	            .requestMatchers("/user/user_register").permitAll()
	            .requestMatchers("/user/user_login").permitAll()
	            .requestMatchers("/user/user_update").permitAll()
	            .requestMatchers("/user/dashboard/**").permitAll()
	            .requestMatchers("/provider/provider_register").permitAll()
	            .requestMatchers("/provider/provider_login").permitAll()
	            .requestMatchers("/view/separate").permitAll()
	            .requestMatchers("/view/approved").permitAll()
	            .requestMatchers("/view/pending").permitAll()
	            .requestMatchers("/admin/approval").permitAll()
	            .requestMatchers("/admin/total_customers").permitAll()
	            .requestMatchers("/admin/total_providers").permitAll()
	            .requestMatchers("/admin/total_bookings").permitAll()
	            .requestMatchers("/admin/pending_approval").permitAll()
	            .requestMatchers("/admin/dashboard_stats").permitAll()
	            .requestMatchers("/booking/customer_booking").permitAll()
	            .requestMatchers("/provider/approve/**").permitAll()
	            .requestMatchers("/provider/reject/**").permitAll()
	            .requestMatchers("/provider/dashboard/**").permitAll()
	            .requestMatchers("/admin/users").permitAll()
	            .requestMatchers("/admin/providers").permitAll()
	            .requestMatchers("/admin/bookings").permitAll()
	            .requestMatchers("/provider/provider-id/**").permitAll()
	            .requestMatchers("/provider/accept/**").permitAll()
	            .requestMatchers("/provider/cancel/**").permitAll()
	            .requestMatchers("/provider/complete/**").permitAll()
	            .requestMatchers("/provider/getOtp/**").permitAll()
	            .requestMatchers("/forgot/forgot_password/**").permitAll()
	            .requestMatchers("/forgot/updatePassword/**").permitAll()
	           // .requestMatchers("/provider/x").permitAll()
	            
	           
	            .anyRequest().authenticated()
	        );
            		

        return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}