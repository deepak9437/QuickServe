
package quick.serve.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import quick.serve.entity.BookingEntity;
import quick.serve.repo.BookingRepo;

@Service
public class BookingService {
	
	@Autowired
	private BookingRepo bookingRepo;

	public void bookService(BookingEntity bookingEntity) {
		bookingRepo.save(bookingEntity);
	}
}
