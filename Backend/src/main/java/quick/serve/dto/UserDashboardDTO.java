package quick.serve.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.Data;

@Data
public class UserDashboardDTO {

    private long totalBookings;

    private long activeBookings;

    private long completedBookings;

    private List<RecentBookingDTO> recentBookings;
    
    private long totalReviews;
    
    private LocalDate memberSince;


}