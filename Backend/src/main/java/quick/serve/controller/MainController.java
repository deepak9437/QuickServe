package quick.serve.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import quick.serve.entity.ProviderEntity;
import quick.serve.entity.UserEntity;
import quick.serve.repo.ProviderRepository;
import quick.serve.repo.UserRepository;
import quick.serve.service.MainService;

@RestController
@CrossOrigin("*")
@RequestMapping("/entry")
@Slf4j
public class MainController {

	@Autowired
	private MainService mainService;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private ProviderRepository providerRepo;

	@PostMapping("/user_register")
	public void gotoUserRegister(@RequestParam String fullName, @RequestParam String password,
			@RequestParam String gender, @RequestParam String userEmail, @RequestParam String address,
			@RequestParam Integer pincode, @RequestParam String role, @RequestParam String userPhone) {

		UserEntity entity = new UserEntity();
		entity.setFullName(fullName);
		entity.setPassword(password);
		entity.setGender(gender);
		entity.setUserEmail(userEmail);
		entity.setAddress(address);
		entity.setPincode(pincode);
		entity.setRole("costumer");
		entity.setUserPhone(userPhone);

		mainService.userRegisterService(entity);
	}

	@PostMapping("/user_login")
	public void gotoUserLogin(@RequestParam String userEmail, @RequestParam String password, HttpSession uSession) {
		UserEntity entity = mainService.userLoginService(userEmail, password);

		if (entity != null) {
			log.info("log in Successfully....");
			uSession.setAttribute("email", userEmail);
		} else {
			log.info("log in failed...");
		}
	}

	@PostMapping("/provider_register")
	public void gotoProviderRegister(@RequestParam String fullName, @RequestParam String password,
			@RequestParam String gender, @RequestParam String userEmail, @RequestParam String address,
			@RequestParam Integer pincode, @RequestParam String userPhone, @RequestParam String skills,
			@RequestParam Integer experience, @RequestParam String description, @RequestParam String documentType,
			@RequestParam MultipartFile documentURL, @RequestParam MultipartFile certificate,
			@RequestParam MultipartFile extraCertificate) {

		UserEntity entity = new UserEntity();
		entity.setFullName(fullName);
		entity.setPassword(password);
		entity.setGender(gender);
		entity.setUserEmail(userEmail);
		entity.setAddress(address);
		entity.setPincode(pincode);
		entity.setRole("provider");
		entity.setUserPhone(userPhone);

		ProviderEntity pEntity = new ProviderEntity();
		pEntity.setSkills(skills);
		pEntity.setExperience(experience);
		pEntity.setDescription(description);
		pEntity.setStatus("pending");

		mainService.providerRegisterService(entity, pEntity, documentType, documentURL, certificate, extraCertificate);
	}

	@PostMapping("/provider_login")
	public String gotoProviderLogin(@RequestParam String userEmail, @RequestParam String password,
			HttpSession pSession) {

		UserEntity entity = userRepo.findByUserEmailAndPassword(userEmail, password);
		String status = providerRepo.findByUserId(entity.getId());
		System.out.println(status);

		if (entity != null && "approved".equals(status)) {
			log.info("provider login seuccessful ...");
			pSession.setAttribute("pEmail", userEmail);     
			return "approved";
		} else if (entity != null && "pending".equals(status)) {
			log.info("Provider status is pending...try again after successful registration.");
			return "Provider status is pending...try again after successful registration.";
		} else {
			log.info("provider Login Failed !");
			return "failed";
		}

//		return "ok";

	}

}
