package quick.serve.dto;

import lombok.Data;

@Data
public class ProviderDocDTO {

	private Integer id;

	private Integer pId;

	private String documentType;

	private String documentURL;

	private String certificate;

	private String extraCertificate;
}
