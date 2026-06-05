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

import quick.serve.dto.ProviderDTO;
import quick.serve.dto.ProviderDocDTO;
import quick.serve.dto.UserDTO;
import quick.serve.entity.ProviderDocEntity;
import quick.serve.entity.ProviderEntity;
import quick.serve.entity.UserEntity;
import quick.serve.repo.ProviderDocRepository;
import quick.serve.repo.ProviderRepository;
import quick.serve.repo.UserRepository;

@Service
public class MainService {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private ProviderRepository providerRepo;
	
	@Autowired
	private ProviderDocRepository providerDocRepository;

	@Autowired
	private EmailService emailService;

	@Value("${image.path.user}")
	String userImage;

	@Value("${image.path.provider.document}")
	String pDocument;

	@Value("${image.path.provider.certificate}")
	String pCertificate;
	
	@Value("${image.path.provider.extraCertificate}")
	String pExtraCertificate;

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

		Path pExtrapCertificateLocation =
			    Paths.get(pExtraCertificate + File.separator + extraCertificate.getOriginalFilename());

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
		
		pEntity.setUser(entity);
		providerRepo.save(pEntity);
		
		pdEntity.setProvider(pEntity);
		providerDocRepository.save(pdEntity);
		
		emailService.providerEmail(entity);

	}

//	public UserEntity providerLoginService(String userEmail, String password ,String status) {
//		userRepo.findByUserEmailAndPassword(userEmail, password);
//		providerRepo.findByStatus(status);
//		return null;
//	}

	public List<ProviderDTO> getAllProviders() {

		List<ProviderEntity> providers = providerRepo.findAllWithDetails();

		return providers.stream().map(provider -> {

			ProviderDTO dto = new ProviderDTO();

			dto.setId(provider.getPId());
			dto.setSkills(provider.getSkills());
			dto.setExperience(provider.getExperience());
			dto.setDescription(provider.getDescription());
			dto.setStatus(provider.getStatus());
			dto.setAvailability(provider.getAvailability());
			dto.setReview(provider.getReview());

			// User DTO
			UserDTO userDto = new UserDTO();
			userDto.setId(provider.getUser().getId());
			userDto.setFullName(provider.getUser().getFullName());
			userDto.setUserEmail(provider.getUser().getUserEmail());
			userDto.setUserPhone(provider.getUser().getUserPhone());
			userDto.setPassword(provider.getUser().getPassword());
			userDto.setGender(provider.getUser().getGender());


			dto.setUser(userDto);

			// Provider Documents DTO
			List<ProviderDocDTO> docDtos = provider.getPDocs().stream().map(doc -> {
				ProviderDocDTO docDto = new ProviderDocDTO();

				docDto.setId(doc.getId());
				docDto.setDocumentType(doc.getDocumentType());
				docDto.setDocumentURL(doc.getDocumentURL());
				docDto.setCertificate(doc.getCertificate());
				docDto.setExtraCertificate(doc.getExtraCertificate());

				return docDto;
			}).toList();

			dto.setProviderdocs(docDtos);

			return dto;

		}).toList();
	}

}