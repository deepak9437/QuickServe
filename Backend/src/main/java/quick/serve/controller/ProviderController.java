package quick.serve.controller;

import java.security.SecureRandom;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
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
import org.springframework.web.server.ResponseStatusException;

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
	

	@PutMapping("/approve")
	public void approveProvider(Authentication authentication) {
		
		String email = authentication.getName();
		
		UserEntity user = userRepo.findByUserEmail(email);

		providerService.approveProvider(user.getId());

	}

	@PutMapping("/reject")
	public void rejectProvider(Authentication authentication) {
		
		String email = authentication.getName();
		
		UserEntity user = userRepo.findByUserEmail(email);

		providerService.rejectProvider(user.getId());
	}

	@GetMapping("/dashboard")
	public ProviderDashboardDTO dashboard(Authentication authentication) {

	    return providerService.getDashboardData(authentication.getName());
	}

	@GetMapping("/provider-id")
	public Integer getProviderId(Authentication authentication) {
		
		String email = authentication.getName();
		
		UserEntity user = userRepo.findByUserEmail(email);


		ProviderEntity provider = providerRepo.findProviderByUserId(user.getId());

		return provider.getPId();
	}

	/*
	 * provider dashboard recent services where provider accept/reject users
	 */

	@PutMapping("/accept/{bookingId}")
	public void acceptBooking(Authentication authentication,@PathVariable Integer bookingId) {
		
		String email =authentication.getName();
		
		UserEntity user = userRepo.findByUserEmail(email);
		
		ProviderEntity providerEntity = providerRepo.findProviderByUser(user);

		BookingEntity booking = bookingRepo.findById(bookingId).orElseThrow();
		
		if(!providerEntity.getPId().equals(booking.getPId())) {
			throw new ResponseStatusException(
			        HttpStatus.FORBIDDEN,
			        "You are not allowed to accept this booking."
			    );
		}

		booking.setBookingStatus("accepted");

		bookingRepo.save(booking);
	}

	@PutMapping("/generateOtp/{bookingId}")
	public void generateOtpForBooking(@PathVariable Integer bookingId) {

		BookingEntity booking = bookingRepo.findById(bookingId).orElseThrow();

		String otp = generateOtp();

		booking.setOtp(otp);

		booking.setBookingStatus("otp_sent");

		bookingRepo.save(booking);

		UserEntity customer = userRepo.findById(booking.getUId()).orElseThrow();

		emailService.otpEmail(customer.getUserEmail(), otp);
	}

	@PutMapping("/verifyOtp/{bookingId}")
	public String verifyOtp(@PathVariable Integer bookingId, @RequestParam String otp) {

		BookingEntity booking = bookingRepo.findById(bookingId).orElseThrow();

		if (booking.getOtp().equals(otp)) {

			booking.setBookingStatus("completed");

			bookingRepo.save(booking);

			return "OTP Verified";
		}

		return "Invalid OTP";
	}

	@PutMapping("/cancel/{bookingId}")
	public void cancelBooking(@PathVariable Integer bookingId) {

		BookingEntity booking = bookingRepo.findById(bookingId).orElseThrow();

		booking.setBookingStatus("cancelled");

		bookingRepo.save(booking);
	}

//	 @GetMapping("/x")
	public String generateOtp() {

		SecureRandom random = new SecureRandom();

		int otp = 100000 + random.nextInt(900000);

		return String.valueOf(otp);
	}

	@PutMapping("/availability/{pId}")
	public void updateAvailability(@PathVariable Integer pId, @RequestParam Boolean available) {

		ProviderEntity provider = providerRepo.findProviderByUserId(pId);

		provider.setAvailability(available);
		//System.out.println(provider);
		providerRepo.save(provider);
	}
	
	@GetMapping("/availability")
	public Boolean getAvailability(Authentication authentication){
		
		String email = authentication.getName();
		
		UserEntity user = userRepo.findByUserEmail(email);


	    ProviderEntity provider =
	            providerRepo.findProviderByUserId(user.getId());

	    return provider.getAvailability();
	}
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
