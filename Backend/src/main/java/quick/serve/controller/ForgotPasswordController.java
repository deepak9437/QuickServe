package quick.serve.controller;

import java.security.SecureRandom;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	public String forgotPassword(@PathVariable String userEmail) {

		UserEntity entity = userRepository.findByUserEmail(userEmail);
		if (entity == null) {
			return "EMAIL_NOT_FOUND";
		}

		String otp = generateOtp();

		Boolean sent = emailService.forgotPasswordOtp(userEmail, otp);

		if (Boolean.TRUE.equals(sent)) {
			entity.setOtp(otp);
			entity.setOtpExpiry(LocalDateTime.now().plusMinutes(5));
			userRepository.save(entity);

			return "OTP_SENT"; // Success path
		} else {
			return "EMAIL_SENDING_FAILED";
		}
	}

	@PostMapping("/verifyOtp/{userEmail}/{otp}")
	public String verifyOtp(@PathVariable String userEmail, @PathVariable String otp) {

		UserEntity entity = userRepository.findByUserEmail(userEmail);

		if (entity == null) {
			return "USER_NOT_FOUND";
		}

		if (entity.getOtp() == null || entity.getOtpExpiry() == null) {
			return "OTP_NOT_FOUND";
		}

		if (entity.getOtpExpiry().isBefore(LocalDateTime.now())) {
			return "OTP_EXPIRED";
		}

		if (!entity.getOtp().trim().equals(otp.trim())) {
			return "INVALID_OTP";
		}

		return "OTP_VERIFIED";
	}

	@PutMapping("/updatePassword")
	public String updatePassword(@RequestBody ForgotPasswordDTO dto) {

		UserEntity existUser = userRepository.findByUserEmail(dto.getUserEmail());

		if (existUser == null) {
			return "USER_NOT_FOUND";
		}

		String encodedPassword = passwordEncoder.encode(dto.getNewPassword());

		existUser.setPassword(encodedPassword);

		existUser.setOtp(null);
		existUser.setOtpExpiry(null);

		userRepository.save(existUser);

		return "PASSWORD_RESET_SUCCESS";
	}

	private String generateOtp() {

		SecureRandom random = new SecureRandom();

		int otp = 100000 + random.nextInt(900000);

		return String.valueOf(otp);
	}
}