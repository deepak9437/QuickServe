package quick.serve.dto;

import java.util.List;

import lombok.Data;

@Data
public class ProviderDTO {

	private Integer pId;

	private String skills;

	private Integer experience;

	private String description;

	private String status;

	private Boolean availability;

	private Integer review;

	private UserDTO user;

	private List<ProviderDocDTO> providerdocs;

}