package quick.serve.dto;

import java.util.List;

import lombok.Data;

@Data
public class ProviderDTO {

	private Integer id;

	private String skills;

	private Integer experience;

	private String description;

	private String status;

	private Boolean availability;

	private Double rating;

	private Integer review;

	private UserDTO user;

	private List<ProviderDocDTO> providerdocs;

}
