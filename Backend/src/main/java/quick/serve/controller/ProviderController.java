package quick.serve.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import quick.serve.dto.ProviderDashboardDTO;
import quick.serve.entity.ProviderEntity;
import quick.serve.entity.UserEntity;
import quick.serve.repo.ProviderRepository;
import quick.serve.service.ProviderService;

@CrossOrigin("*")
@RequestMapping("/provider")
@RestController
@Slf4j
public class ProviderController {
	
	@Autowired
	private ProviderRepository providerRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private ProviderService providerService ;
	
	@PostMapping("/provider_register")
	public void gotoProviderRegister(@RequestParam String fullName, @RequestParam String password,
			@RequestParam String gender, @RequestParam String userEmail, @RequestParam String address,
			@RequestParam Integer pincode, @RequestParam String userPhone, @RequestParam String skills,
			@RequestParam Integer experience, @RequestParam String description, @RequestParam String documentType,
			@RequestParam MultipartFile documentURL, @RequestParam MultipartFile certificate,
			@RequestParam(required = false) MultipartFile extraCertificate) {

		UserEntity entity = new UserEntity();
		entity.setFullName(fullName);
		
		String newPassword = passwordEncoder.encode(password);
		entity.setPassword(newPassword);
		
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

		providerService.providerRegisterService(entity, pEntity, documentType, documentURL, certificate, extraCertificate);
	}
	
	
	@PostMapping("/provider_login")
	public UserEntity gotoProviderLogin(@RequestParam String userEmail, @RequestParam String password,
			HttpSession pSession) {

		UserEntity entity = providerService.providerLogingService(userEmail, password);
		
		String status = providerRepo.findByUserId(entity.getId());
		System.out.println(status);

		if (entity != null && "approved".equals(status)) {
			log.info("provider login seuccessful ...");
			pSession.setAttribute("pEmail", userEmail); 
			return entity;
		} else if (entity != null && "pending".equals(status)) {
			log.info("Provider status is pending...try again after successful registration.");
			return entity;
		} else {
			log.info("provider Login Failed !");
			return null;
		}


	}
	@PutMapping("/approve/{id}")
	public void approveProvider(@PathVariable Integer id) {

	    providerService.approveProvider(id);

	}

	@PutMapping("/reject/{id}")
	public void rejectProvider(@PathVariable Integer id) {

	    providerService.rejectProvider(id);
	}
	
	 @GetMapping("/dashboard/{pId}")
	    public ProviderDashboardDTO dashboard(
	            @PathVariable Integer pId) {

	        return providerService.getDashboardData(pId);
	    }
}
