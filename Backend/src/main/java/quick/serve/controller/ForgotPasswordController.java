package quick.serve.controller;

import java.security.SecureRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import quick.serve.dto.ForgotPasswordDTO;
import quick.serve.entity.UserEntity;
import quick.serve.repo.UserRepository;
import quick.serve.service.EmailService;

@RestController
@CrossOrigin("*")
@RequestMapping("/forgot")
public class ForgotPasswordController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/forgot_password/{userEmail}")
    public String forgotPassword(
            @PathVariable String userEmail) {

        UserEntity entity =
                userRepository.findByUserEmail(userEmail);

        if (entity == null) {
            return "EMAIL_NOT_FOUND";
        }

        String otp = generateOtp();

        entity.setOtp(otp);

        userRepository.save(entity);

        emailService.forgotPasswordOtp(
                userEmail,
                otp
        );

        return "OTP_SENT";
    }

    @PostMapping("/verifyOtp/{userEmail}/{otp}")
    public String verifyOtp(
            @PathVariable String userEmail,
            @PathVariable String otp) {

        System.out.println("VERIFY OTP API HIT");

        UserEntity entity =
                userRepository.findByUserEmail(userEmail);

        System.out.println("Entered OTP = " + otp);

        if(entity != null) {
            System.out.println("DB OTP = " + entity.getOtp());
        }

        if(entity == null) {
            return "USER_NOT_FOUND";
        }

        if(otp.trim().equals(entity.getOtp().trim())) {
            return "OTP_VERIFIED";
        }

        return "INVALID_OTP";
    }

    @PutMapping("/updatePassword")
    public String updatePassword(
            @RequestBody ForgotPasswordDTO dto) {

        UserEntity existUser =
                userRepository.findByUserEmail(
                        dto.getUserEmail());

        if (existUser == null) {
            return "USER_NOT_FOUND";
        }

        String encodedPassword =
                passwordEncoder.encode(
                        dto.getNewPassword());

        existUser.setPassword(
                encodedPassword);

        existUser.setOtp(null);

        userRepository.save(
                existUser);

        return "PASSWORD_RESET_SUCCESS";
    }

    private String generateOtp() {

        SecureRandom random =
                new SecureRandom();

        int otp =
                100000 +
                random.nextInt(900000);

        return String.valueOf(otp);
    }
}