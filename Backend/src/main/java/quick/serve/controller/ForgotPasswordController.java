package quick.serve.controller;

import java.security.SecureRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
		
		String otp =generateOtp();
		entity.setOtp(otp);
		if(userEmail.equals(entity.getUserEmail())) {
			emailService.forgotPasswordOtp(userEmail, otp);
			return String.valueOf(otp);
		}
		return null;
	}
	
//	@GetMapping("/updatePassword/{userEmail}")
//	public void updatePassword(@PathVariable String userEmail) {
//		UserEntity existUser = userRepository.findByUserEmail(userEmail);
//		 Integer id =existUser.getId();
//		String newPassword = passwordEncoder.encode(user.getPassword());
//		existUser.setPassword(newPassword);
//		
//		userRepository.save(existUser);
//	}
	
	

//	 @GetMapping("/x")
	public String generateOtp() {

		SecureRandom random = new SecureRandom();

		int otp = 100000 + random.nextInt(900000);

		return String.valueOf(otp);
	}
}
