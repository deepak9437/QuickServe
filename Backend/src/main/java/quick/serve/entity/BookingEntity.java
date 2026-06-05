package quick.serve.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class BookingEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="booking_id")
	private Integer bookingId;
	
	@Column(name="user_id")
	private Integer uId;
	
	@Column(name="p_id")
	private Integer pId;
	
	@Column(name="service_name")
	private String serviceName;
	
	@Column(name="booking_status")
	private String bookingStatus;
	
	@Column(name="amount")
	private BigDecimal amount;
	
	@Column(name="address")
	private String address;
	
}
