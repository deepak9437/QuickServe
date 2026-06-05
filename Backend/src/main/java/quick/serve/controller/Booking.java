package quick.serve.controller;

import java.math.BigDecimal;

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
public class Booking {

	private final BookingService bookingService;

	Booking(BookingService bookingService) {
		this.bookingService = bookingService;
	}

	@PostMapping("/costumer_booking")
	public void gotoBookings(@RequestParam Integer uId ,@RequestParam Integer pId, @RequestParam String serviceName, @RequestParam BigDecimal amount,
			@RequestParam String address) {
		
		BookingEntity bookingEntity = new BookingEntity();
//		UserEntity entity = new UserEntity();
//		ProviderEntity pEntity = new ProviderEntity();
		
		bookingEntity.setUId(uId);
		bookingEntity.setPId(pId);
		bookingEntity.setServiceName(serviceName);
		bookingEntity.setBookingStatus("pending"); //pending,accepted,completed,cancelled
		bookingEntity.setAmount(amount);
		bookingEntity.setAddress(address);
		
		
		bookingService.bookService();
	}

}
