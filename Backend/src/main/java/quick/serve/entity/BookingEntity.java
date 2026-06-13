
package quick.serve.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="booking")
public class BookingEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "booking_id")
	private Integer bookingId;

	@Column(name = "user_id")
	private Integer uId;

	@Column(name = "p_id")
	private Integer PId;

	@Column(name = "service_name")
	private String serviceName;

	@Column(name = "booking_status")
	private String bookingStatus;

	@Column(name = "problem")
	private String problem;
	
	@Column(name = "address")
	private String address;
	
	@Column(name="booking_date")
	private LocalDate bookingDate;
	


}
