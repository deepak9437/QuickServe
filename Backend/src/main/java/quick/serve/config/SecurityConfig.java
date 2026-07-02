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
SecurityFilterChain securityFilterChain(
        HttpSecurity http) throws Exception {

    http
        .csrf(csrf -> csrf.disable())

        .authorizeHttpRequests(auth -> auth

            // =========================
            // USER MODULE
            // =========================

            .requestMatchers("/user/user_register").permitAll()
            .requestMatchers("/user/user_login").permitAll()
            .requestMatchers("/user/user_update").permitAll()
            .requestMatchers("/user/dashboard/**").permitAll()
            

            // =========================
            // PROVIDER MODULE
            // =========================

            .requestMatchers("/provider/provider_register").permitAll()
            .requestMatchers("/provider/provider_login").permitAll()

            .requestMatchers("/provider/provider-id/**").permitAll()
            .requestMatchers("/provider/dashboard/**").permitAll()
            
            .requestMatchers("/provider/availability/**").permitAll()

            // Provider Approval

            .requestMatchers("/provider/approve/**").permitAll()
            .requestMatchers("/provider/reject/**").permitAll()

            // Provider Booking Actions

            .requestMatchers("/provider/accept/**").permitAll()
            .requestMatchers("/provider/cancel/**").permitAll()

            // OTP Workflow

            .requestMatchers("/provider/generateOtp/**").permitAll()
            .requestMatchers("/provider/verifyOtp/**").permitAll()

            // =========================
            // CUSTOMER BOOKING MODULE
            // =========================

            .requestMatchers("/booking/customer_booking").permitAll()

            // =========================
            // VIEW PROVIDERS MODULE
            // =========================

            .requestMatchers("/view/separate").permitAll()
            .requestMatchers("/view/approved").permitAll()
            .requestMatchers("/view/pending").permitAll()

            // =========================
            // ADMIN MODULE
            // =========================

            .requestMatchers("/admin/approval").permitAll()

            .requestMatchers("/admin/dashboard_stats").permitAll()

            .requestMatchers("/admin/total_customers").permitAll()
            .requestMatchers("/admin/total_providers").permitAll()
            .requestMatchers("/admin/total_bookings").permitAll()
            .requestMatchers("/admin/pending_approval").permitAll()

            .requestMatchers("/admin/users").permitAll()
            .requestMatchers("/admin/providers").permitAll()
            .requestMatchers("/admin/bookings").permitAll()

            // =========================
            // FORGOT PASSWORD MODULE
            // =========================

            .requestMatchers("/forgot/forgot_password/**").permitAll()
            .requestMatchers("/forgot/updatePassword").permitAll()
            .requestMatchers("/forgot/**").permitAll()

            // =========================
            // ALL OTHER REQUESTS
            // =========================
            
            .requestMatchers("/review/set_review").permitAll()
            .requestMatchers("/review/x").permitAll()
            .requestMatchers("/review/all").permitAll()
            
            .requestMatchers("/provider/document/**").permitAll()
            .requestMatchers("/provider/certificate/**").permitAll()
            .requestMatchers("/provider/extraCertificate/**").permitAll()
            
            .anyRequest().authenticated()

        );

    return http.build();
}

@Bean
PasswordEncoder passwordEncoder() {

    return new BCryptPasswordEncoder();
}

}
