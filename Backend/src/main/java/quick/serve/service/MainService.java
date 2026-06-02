package quick.serve.service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import quick.serve.dto.FullProjectDTO;
import quick.serve.entity.ProviderDocEntity;
import quick.serve.entity.ProviderEntity;
import quick.serve.entity.UserEntity;
import quick.serve.repo.ProviderRepository;
import quick.serve.repo.UserRepository;

@Service
public class MainService {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private ProviderRepository providerRepo;

//	@Autowired
//	private ProjectDTO projectDTO;

	@Autowired
	private EmailService emailService;

	@Value("${image.path.user}")
	String userImage;

	@Value("${image.path.provider.document}")
	String pDocument;

	@Value("${image.path.provider.certificate}")
	String pCertificate;

	public void userRegisterService(UserEntity entity) {
		userRepo.save(entity);
		emailService.userEmail(entity);
	}

	public UserEntity userLoginService(String userEmail, String password) {
		UserEntity entity = userRepo.findByUserEmailAndPassword(userEmail, password);
		return entity;
	}

	public void providerRegisterService(UserEntity entity, ProviderEntity pEntity, String documentType,
			MultipartFile documentURL, MultipartFile certificate, MultipartFile extraCertificate) {

		ProviderDocEntity pdEntity = new ProviderDocEntity();

		pdEntity.setDocumentType(documentType);

		// System.out.println(document_url.getOriginalFilename(),certificate.getOriginalFilename());
		Path pDocLocation = Paths.get(pDocument + File.separator + documentURL.getOriginalFilename());

		Path pCertificateLocation = Paths.get(pCertificate + File.separator + certificate.getOriginalFilename());

		Path pExtrapCertificateLocation = Paths
				.get(extraCertificate + File.separator + extraCertificate.getOriginalFilename());

		try {
			Files.copy(documentURL.getInputStream(), pDocLocation, StandardCopyOption.REPLACE_EXISTING);
			Files.copy(certificate.getInputStream(), pCertificateLocation, StandardCopyOption.REPLACE_EXISTING);
			Files.copy(extraCertificate.getInputStream(), pExtrapCertificateLocation,
					StandardCopyOption.REPLACE_EXISTING);

		} catch (Exception e) {
			e.getLocalizedMessage();
		}

		pdEntity.setDocumentURL(documentURL.getOriginalFilename());
		pdEntity.setCertificate(certificate.getOriginalFilename());
		pdEntity.setExtraCertificate(extraCertificate.getOriginalFilename());
		pdEntity.setDocumentType(documentType);

		userRepo.save(entity);
		providerRepo.save(pEntity);
		providerRepo.save(pdEntity);

		emailService.providerEmail(entity);

	}

	public ProviderEntity providerLoginService(String userEmail, String password) {
		return providerRepo.findByProviderEmailAndPassword(userEmail, password);
	}

	public List<FullProjectDTO> getUserDetails() {
		return providerRepo.findAllWithDetails().stream().map(p -> new FullProjectDTO(p.getUser(), p, p.getPDocs()))
				.toList();
	}

//	public List<ProjectDTO> getUserDetails(){
//		List<ProjectDTO> entity = new ArrayList<>();
//		entity = userRepo.findAll();
////		providerRepo.findAll();
//		return entity;
//	}

}


