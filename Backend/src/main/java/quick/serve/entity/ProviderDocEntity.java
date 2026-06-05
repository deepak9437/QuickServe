package quick.serve.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="provider_documents")
public class ProviderDocEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="pd_id")
	private Integer pdId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "p_id")
	private ProviderEntity provider;
	
	@Column(name="document_type")
	private String documentType;
	
	@Column(name="document_url")
	private String documentURL;
	
	@Column(name="certificate")
	private String certificate;
	
	@Column(name="extra_certificate")
	private String extraCertificate;
	
}