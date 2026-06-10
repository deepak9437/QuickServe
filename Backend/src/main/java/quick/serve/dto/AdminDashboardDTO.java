package quick.serve.dto;

import lombok.Data;

@Data
public class AdminDashboardDTO {
	
	private long totalCustomers;
	
	private long totalProviders;
	
	private long totalBookings;
	
	private long pendingApproval;
}
