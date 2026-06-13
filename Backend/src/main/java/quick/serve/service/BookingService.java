
package quick.serve.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import quick.serve.dto.ProviderDashboardDTO;
import quick.serve.entity.BookingEntity;
import quick.serve.repo.BookingRepo;

@Service
public class BookingService {
	
	@Autowired
	private BookingRepo bookingRepo;

	public void bookService(BookingEntity bookingEntity) {
		bookingRepo.save(bookingEntity);
	}
	
	public ProviderDashboardDTO getDashboardData(Integer pId) {


		  ProviderDashboardDTO dto =
	                new ProviderDashboardDTO();

	        dto.setTotalBookings(
	                bookingRepo.countByPId(pId));

	        dto.setPendingRequests(
	                bookingRepo.countByPIdAndBookingStatus(
	                        pId,
	                        "pending"));

	        dto.setCompletedJobs(
	                bookingRepo.countByPIdAndBookingStatus(
	                        pId,
	                        "completed"));

	        dto.setRecentBookings(
	                bookingRepo.findByPIdOrderByBookingDateDesc(
	                        pId));

	        return dto;
	        
	}
}
