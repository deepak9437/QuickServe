package quick.serve.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import quick.serve.entity.UserEntity;
import quick.serve.repo.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private EmailService emailService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

//	@Value("${image.path.user}")
//	String userImage;

	public void userRegisterService(UserEntity entity) {
		userRepo.save(entity);
		emailService.userEmail(entity);
	}
	
	public UserEntity userLoginService(String userEmail, String password) {
		UserEntity entity = userRepo.findByUserEmail(userEmail);
		
		boolean matches = passwordEncoder.matches(password, entity.getPassword());
		if (matches) {
			return entity;
		} 
		return null;
	}

	public UserEntity updateProfileService(UserEntity uEntity) {
		return userRepo.save(uEntity);
	}

	




}