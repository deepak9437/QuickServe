package quick.serve.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "provider")
@Data
public class ProviderEntity {

	@Id
	@Column(name = "p_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer pId;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private UserEntity user;

	@Column(name = "skills")
	private String skills;

	@Column(name = "experience")
	private Integer experience;

	@Column(name = "description")
	private String description;

	@Column(name = "status")
	private String status;

	@Column(name = "is_available")
	private Boolean availability;
	
	@Column(name="rating")
	private Double rating;

	@Column(name = "total_reviews")
	private Integer totalReview;

	@JsonIgnore
	@OneToMany(mappedBy = "provider")
	private List<ProviderDocEntity> pDocs;
}
