package quick.serve.service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import quick.serve.entity.ProviderDocEntity;
import quick.serve.entity.ProviderEntity;
import quick.serve.entity.UserEntity;
import quick.serve.repo.ProviderDocRepository;
import quick.serve.repo.ProviderRepository;
import quick.serve.repo.UserRepository;

@Service
public class ProviderService {
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private ProviderRepository providerRepo;

	@Autowired
	private ProviderDocRepository providerDocRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private EmailService emailService;
	
	@Value("${image.path.provider.document}")
	String pDocument;

	@Value("${image.path.provider.certificate}")
	String pCertificate;

	@Value("${image.path.provider.extraCertificate}")
	String pExtraCertificate;
	
	public UserEntity providerLogingService(String userEmail, String password) {
		UserEntity entity = userRepo.findByUserEmail(userEmail);
		
		boolean matches = passwordEncoder.matches(password, entity.getPassword());
		if(matches) {
			return entity;
		}
		return null;
	}

	public void providerRegisterService(UserEntity entity, ProviderEntity pEntity, String documentType,
			MultipartFile documentURL, MultipartFile certificate, MultipartFile extraCertificate) {
		
		 // Check if email already exists
	    UserEntity existingUser =
	            userRepo.findByUserEmail(
	                    entity.getUserEmail());

	    if (existingUser != null) {
	        throw new RuntimeException(
	                "Email already registered");
	    }


		ProviderDocEntity pdEntity = new ProviderDocEntity();

		pdEntity.setDocumentType(documentType);

		// System.out.println(document_url.getOriginalFilename(),certificate.getOriginalFilename());
		Path pDocLocation = Paths.get(pDocument + File.separator + documentURL.getOriginalFilename());

		Path pCertificateLocation = Paths.get(pCertificate + File.separator + certificate.getOriginalFilename());

		Path pExtrapCertificateLocation = null;

		if (extraCertificate != null && !extraCertificate.isEmpty()) {

		    pExtrapCertificateLocation = Paths.get(
		        pExtraCertificate +
		        File.separator +
		        extraCertificate.getOriginalFilename()
		    );
		}

		try {
			Files.copy(documentURL.getInputStream(), pDocLocation, StandardCopyOption.REPLACE_EXISTING);
			Files.copy(certificate.getInputStream(), pCertificateLocation, StandardCopyOption.REPLACE_EXISTING);
			if (extraCertificate != null && !extraCertificate.isEmpty()) {

			    Files.copy(
			        extraCertificate.getInputStream(),
			        pExtrapCertificateLocation,
			        StandardCopyOption.REPLACE_EXISTING
			    );
			}
		} catch (Exception e) {
			e.getLocalizedMessage();
		}

		pdEntity.setDocumentURL(documentURL.getOriginalFilename());
		pdEntity.setCertificate(certificate.getOriginalFilename());
		if (extraCertificate != null && !extraCertificate.isEmpty()) {

		    pdEntity.setExtraCertificate(
		        extraCertificate.getOriginalFilename()
		    );
		}
		pdEntity.setDocumentType(documentType);

		userRepo.save(entity);

		pEntity.setUser(entity);
		providerRepo.save(pEntity);

		pdEntity.setProvider(pEntity);
		providerDocRepository.save(pdEntity);

		emailService.providerEmail(entity);

	}
	
//	-----------------------------------------------------
	public void approveProvider(Integer id) {

	    ProviderEntity provider =
	            providerRepo.findById(id)
	                        .orElseThrow();

	    provider.setStatus("approved");

	    providerRepo.save(provider);
	}

	public void rejectProvider(Integer id) {

	    ProviderEntity provider =
	            providerRepo.findById(id)
	                        .orElseThrow();

	    provider.setStatus("rejected");

	    providerRepo.save(provider);
	}

}
