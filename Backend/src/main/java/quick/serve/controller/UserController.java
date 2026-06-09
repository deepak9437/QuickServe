package quick.serve.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import quick.serve.entity.UserEntity;
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
		entity.setRole("costumer");
		entity.setUserPhone(userPhone);

		userService.userRegisterService(entity);
	}

	@PostMapping("/user_login")
	public UserEntity gotoUserLogin(@RequestParam String userEmail, @RequestParam String password,
			HttpSession uSession) {

		UserEntity entity = userService.userLoginService(userEmail, password);
		
		//userService.userLoginService(userEmail,password);

		if (entity != null) {
			log.info("log in Successfully....");
			uSession.setAttribute("email", userEmail);
			return entity;
		}
		return null;
	}

	@PostMapping("/user_update")
	public void updateProfile(@RequestBody UserEntity uEntity) {
		userService.updateProfileService(uEntity);
	}

	

}