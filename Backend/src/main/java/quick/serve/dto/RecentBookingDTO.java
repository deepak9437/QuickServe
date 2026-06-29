package quick.serve.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class RecentBookingDTO {

    private Integer bookingId;

    private Integer pId;

    private Boolean reviewGiven;

    private String providerName;

    private String problem;

    private String bookingStatus;

    private LocalDate bookingDate;
}
