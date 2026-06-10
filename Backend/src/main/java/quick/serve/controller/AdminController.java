package quick.serve.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import quick.serve.dto.AdminDashboardDTO;
import quick.serve.entity.ProviderEntity;
import quick.serve.repo.BookingRepo;
import quick.serve.repo.ProviderRepository;
import quick.serve.repo.UserRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	private ProviderRepository providerRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BookingRepo bookingRepo;
	
	@GetMapping("/approval")
	public void adminApproval(@RequestBody ProviderEntity pEntity) {
		ProviderEntity existPEntity = providerRepository.findById(pEntity.getPId()).orElseThrow();
		
		existPEntity.setStatus(pEntity.getStatus());
		
		providerRepository.save(existPEntity);
	}
	
	@GetMapping("/total_customers")
	public long totalCustomers() {
		return userRepository.countByRole("customer");
	}
	
	@GetMapping("/total_providers")
	public long totalProviders() {
		return userRepository.countByRole("provider");
	}
	
	@GetMapping("/total_bookings")
	public long totalBookings() {
		return bookingRepo.count();
	}
	
	@GetMapping("/pending_approval")
	public long pendingApproval() {
		return providerRepository.countByStatus("pending");
	}
	
	@GetMapping("/dashboard_stats")
	public AdminDashboardDTO dashboardStats() {

	    AdminDashboardDTO dto = new AdminDashboardDTO();

	    dto.setTotalCustomers(
	            userRepository.countByRole("customer"));

	    dto.setTotalProviders(
	            userRepository.countByRole("provider"));

	    dto.setTotalBookings(
	            bookingRepo.count());

	    dto.setPendingApproval(
	            providerRepository.countByStatus("pending"));

	    return dto;
	}
}
