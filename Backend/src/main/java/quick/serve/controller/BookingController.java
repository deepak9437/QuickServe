package quick.serve.controller;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import quick.serve.entity.BookingEntity;
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

	@PostMapping("/costumer_booking")
	public void gotoBookings(@RequestParam Integer uId, @RequestParam Integer pId, @RequestParam String serviceName,
			@RequestParam String problem, @RequestParam String address,
			@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate bookingDate) {

		BookingEntity bookingEntity = new BookingEntity();
//		UserEntity entity = new UserEntity();
//		ProviderEntity pEntity = new ProviderEntity();

		bookingEntity.setUId(uId);
		bookingEntity.setPId(pId);
		bookingEntity.setServiceName(serviceName);
		bookingEntity.setProblem(problem);
		bookingEntity.setAddress(address);
		bookingEntity.setBookingDate(bookingDate);
		bookingEntity.setBookingStatus("pending"); // pending,accepted,completed,cancelled

		System.out.println(bookingEntity.getBookingDate());

		bookingService.bookService(bookingEntity);
	}

}
