package quick.serve.controller;

import java.security.SecureRandom;

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
import quick.serve.entity.BookingEntity;
import quick.serve.entity.ProviderEntity;
import quick.serve.entity.UserEntity;
import quick.serve.repo.BookingRepo;
import quick.serve.repo.ProviderRepository;
import quick.serve.repo.UserRepository;
import quick.serve.service.EmailService;
import quick.serve.service.ProviderService;

@CrossOrigin("*")
@RequestMapping("/provider")
@RestController
@Slf4j
public class ProviderController {
	@Autowired
	private BookingRepo bookingRepo;

	@Autowired
	private ProviderRepository providerRepo;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private ProviderService providerService;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private EmailService emailService;

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

		providerService.providerRegisterService(entity, pEntity, documentType, documentURL, certificate,
				extraCertificate);
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
	public ProviderDashboardDTO dashboard(@PathVariable Integer pId) {

		return providerService.getDashboardData(pId);
	}

	@GetMapping("/provider-id/{userId}")
	public Integer getProviderId(@PathVariable Integer userId) {

		ProviderEntity provider = providerRepo.findProviderByUserId(userId);

		return provider.getPId();
	}

	/*
	 * provider dashboard recent services where provider accept/reject users
	 */

	@PutMapping("/accept/{bookingId}")
	public void acceptBooking(@PathVariable Integer bookingId) {

		BookingEntity booking = bookingRepo.findById(bookingId).orElseThrow();

		booking.setBookingStatus("accepted");
		String otp = generateOtp();
		booking.setOtp(otp);
		bookingRepo.save(booking);
		
		UserEntity customer = userRepo.findById(booking.getUId()).orElseThrow();
		
		String customerEmail = customer.getUserEmail();
		
		emailService.otpEmail(customerEmail,otp);
		
	}
	
	@GetMapping("/getOtp/{bookingId}")
	public Integer getOtp(@PathVariable Integer bookingId) {
		BookingEntity booking = bookingRepo.findById(bookingId).orElseThrow();
		
		return Integer.valueOf(booking.getOtp());
	}

//	@PutMapping("/accept/{bookingId}")
//	public void acceptBooking(@PathVariable Integer bookingId) {
//
//		BookingEntity booking = bookingRepo.findById(bookingId).orElseThrow();
//
//		booking.setBookingStatus("accepted");
//
//		String otp = generateOtp();
//
//		booking.setOtp(otp);
//
//		bookingRepo.save(booking);
//
//		UserEntity customer = userRepo.findById(booking.getUId()).orElseThrow();
//
//		String customerPhone = customer.getUserPhone();
//
//		System.out.println("Phone = [" + customerPhone + "]");
//		System.out.println("Length = " + customerPhone.length());
//
//		smsService.sendSms("QuickServe: Your booking has been accepted.Your Booking OTP is: "
//				+ otp
//				+ ".Don't share this otp to anyone.Only share this otp to the provider after the service completed.",customerPhone);
//	}

	@PutMapping("/cancel/{bookingId}")
	public void cancelBooking(@PathVariable Integer bookingId) {

		BookingEntity booking = bookingRepo.findById(bookingId).orElseThrow();

		booking.setBookingStatus("cancelled");

		bookingRepo.save(booking);
	}

	@PutMapping("/complete/{bookingId}")
	public void completeBooking(@PathVariable Integer bookingId) {

		BookingEntity booking = bookingRepo.findById(bookingId).orElseThrow();

		booking.setBookingStatus("completed");

		bookingRepo.save(booking);
	}

//	 @GetMapping("/x")
	public String generateOtp() {

		SecureRandom random = new SecureRandom();

		int otp = 100000 + random.nextInt(900000);

		return String.valueOf(otp);
	}
}
