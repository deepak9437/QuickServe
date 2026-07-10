package quick.serve.dto;

import java.util.List;

import lombok.Data;

@Data
public class ProviderDashboardDTO {

	private long pendingRequests;
	private long completedJobs;
	private long totalBookings;

	private List<CustomerBookingDTO> recentBookings;
}
