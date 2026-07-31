package quick.serve.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import quick.serve.entity.BookingEntity;
import quick.serve.entity.UserEntity;
import quick.serve.repo.UserRepository;
import quick.serve.service.BookingService;

@RestController
@CrossOrigin("*")
@RequestMapping("/booking")
public class BookingController {

	private final BookingService bookingService;

	BookingController(BookingService bookingService) {
		// comment
		this.bookingService = bookingService;
	}
	
	@Autowired
	private UserRepository repository;

	@PostMapping("/customer_booking")
	public void gotoBookings(Authentication authentication, @RequestParam Integer pId, @RequestParam String serviceName,
			@RequestParam String problem, @RequestParam String address,
			@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate bookingDate) {
		
		String email = authentication.getName();
		
		UserEntity user = repository.findByUserEmail(email);

		BookingEntity bookingEntity = new BookingEntity();
//		UserEntity entity = new UserEntity();
//		ProviderEntity pEntity = new ProviderEntity();

		bookingEntity.setUId(user.getId());
		bookingEntity.setPId(pId);
		bookingEntity.setServiceName(serviceName);
		bookingEntity.setProblem(problem);
		bookingEntity.setAddress(address);
		bookingEntity.setBookingDate(bookingDate);
		bookingEntity.setBookingStatus("pending"); // pending,accepted,completed,cancelled

		//System.out.println(bookingEntity.getBookingDate());

		bookingService.bookService(bookingEntity);
	}

}
