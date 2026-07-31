package quick.serve.controller;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;
import quick.serve.dto.LoginResponse;
import quick.serve.dto.UserDashboardDTO;
import quick.serve.entity.ProviderEntity;
import quick.serve.entity.UserEntity;
import quick.serve.jwt.JwtUtil;
import quick.serve.repo.ProviderRepository;
import quick.serve.repo.UserRepository;
import quick.serve.service.UserService;

@RestController
@CrossOrigin("*")
@RequestMapping("/user")
@Slf4j
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ProviderRepository providerRepository;
	
	@Autowired
	private JwtUtil jwtUtil;

	@PostMapping("/user_register")
	public void gotoUserRegister(@RequestParam String fullName, @RequestParam String password,
			@RequestParam String gender, @RequestParam String userEmail, @RequestParam String address,
			@RequestParam Integer pincode, @RequestParam String userPhone) {

		UserEntity entity = new UserEntity();
		entity.setFullName(fullName);

		String newPassword = passwordEncoder.encode(password);

		entity.setPassword(newPassword);
		entity.setGender(gender);
		entity.setUserEmail(userEmail);
		entity.setAddress(address);
		entity.setPincode(pincode);
		entity.setRole("customer");
		entity.setUserPhone(userPhone);

		userService.userRegisterService(entity);
	}
	
	//Add image.path.user.profile in the application.properties.
	@Value("${image.path.user.profile}")
	String profile;
	
	@PutMapping("/profile")
	public void setProfile(Authentication authentication ,@RequestParam MultipartFile profilePic) {
		
		String email = authentication.getName();
		
		UserEntity existEntity = userRepository.findByUserEmail(email);
		
		Path profileLocation = Paths.get(profile + File.separator + profilePic.getOriginalFilename());
		
		try{
			Files.copy(profilePic.getInputStream(), profileLocation , StandardCopyOption.REPLACE_EXISTING);
		}catch(Exception e) {
			e.getLocalizedMessage();
		}
		
		existEntity.setProfile(profilePic.getOriginalFilename());
		
		userRepository.save(existEntity);
		
	}

	@PostMapping("/user_login")
	public LoginResponse gotoUserLogin(@RequestParam String userEmail,
	                                   @RequestParam String password) {

	    UserEntity entity = userService.userLoginService(userEmail, password);

	    if (entity == null) {
	        return new LoginResponse(null, null, "Invalid email or password.");
	    }

	    if ("provider".equalsIgnoreCase(entity.getRole())) {

	    	 ProviderEntity pEntity = providerRepository.findByUserId(entity.getId());
//	 		System.out.println(pEntity.getStatus());
	 		String status = pEntity.getStatus();
	 		
	        if (!"approved".equalsIgnoreCase(status)) {
	            return new LoginResponse(
	                    null,
	                    null,
	                    "Your account approval is currently pending."
	            );
	        }
	    }

	    String token = jwtUtil.generateToken(entity);

	    return new LoginResponse(
	            token,
	            entity,
	            "Login Successful"
	    );
	}

	@PutMapping("/user_update")
	public void updateProfile(Authentication authentication,@RequestBody UserEntity user) {
		
		String email =authentication.getName();
		UserEntity existUser = userRepository.findByUserEmail(email);

		existUser.setFullName(user.getFullName());
		existUser.setAddress(user.getAddress());
		existUser.setUserPhone(user.getUserPhone());
		existUser.setPincode(user.getPincode());

		userRepository.save(existUser);

	}

	@GetMapping("/dashboard")
	public UserDashboardDTO dashboard(Authentication authentication) {
		
		String email = authentication.getName();
		
		UserEntity entity = userRepository.findByUserEmail(email);
		
		return userService.getUserDashboardData(entity.getId());
	}

}
