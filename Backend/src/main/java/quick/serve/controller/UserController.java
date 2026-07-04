package quick.serve.controller;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import quick.serve.dto.UserDashboardDTO;
import quick.serve.entity.UserEntity;
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
	
	@PutMapping("/profile/{id}")
	public void setProfile(@PathVariable Integer id,@RequestParam MultipartFile profilePic) {
		
		UserEntity existEntity = userRepository.findById(id).orElseThrow();
		
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
	public UserEntity gotoUserLogin(@RequestParam String userEmail, @RequestParam String password,
			HttpSession uSession) {

		UserEntity entity = userService.userLoginService(userEmail, password);

		// userService.userLoginService(userEmail,password);

		if (entity != null) {
			log.info("log in Successfully....");
			uSession.setAttribute("email", userEmail);
			return entity;
		}
		return null;
	}

	@PutMapping("/user_update")
	public void updateProfile(@RequestBody UserEntity user) {
		UserEntity existUser = userRepository.findById(user.getId()).orElseThrow();

		existUser.setFullName(user.getFullName());
		existUser.setAddress(user.getAddress());
		existUser.setUserPhone(user.getUserPhone());
		existUser.setPincode(user.getPincode());

		userRepository.save(existUser);

	}

	@GetMapping("/dashboard/{uId}")
	public UserDashboardDTO dashboard(@PathVariable Integer uId) {

		return userService.getUserDashboardData(uId);
	}

}
