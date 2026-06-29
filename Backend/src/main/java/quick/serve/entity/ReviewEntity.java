package quick.serve.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="reviews")
public class ReviewEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="review_id")
	private Integer rId;
	
	@Column(name="booking_id")
	private Integer BId;
	
	@Column(name="user_id")
	private Integer uId;
	
	@Column(name="p_id")
	private Integer pId;
	
	@Column(name="rating")
	private Integer rating;
	
	@Column(name="comment")
	private String comment;
	
}
