package quick.serve.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class CustomerBookingDTO {

    private Integer bookingId;

    private String customerName;

    private String customerPhone;

    private String customerEmail;

    private String address;

    private String serviceName;

    private String problem;

    private String bookingStatus;

    private LocalDate bookingDate;
}