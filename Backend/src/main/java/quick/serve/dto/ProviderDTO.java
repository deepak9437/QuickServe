package quick.serve.dto;

import lombok.Data;
import quick.serve.entity.UserEntity;

@Data
public class ProviderDTO {
	
	private Integer id;
	
	private UserEntity user;
	
	private String skills;
	
	private Integer experience;
	
	private String description;
		
	private String status;
	
	private Boolean availability;
	
	private Double rating;
	
	private Integer review;
	
}
