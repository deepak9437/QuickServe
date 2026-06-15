package quick.serve.dto;

import java.util.List;

import lombok.Data;

@Data
public class UserDashboardDTO {

    private long totalBookings;

    private long activeBookings;

    private long completedBookings;

    private List<RecentBookingDTO> recentBookings;


}