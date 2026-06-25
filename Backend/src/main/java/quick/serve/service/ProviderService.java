package quick.serve.service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import quick.serve.dto.CustomerBookingDTO;
import quick.serve.dto.ProviderDashboardDTO;
import quick.serve.entity.BookingEntity;
import quick.serve.entity.ProviderDocEntity;
import quick.serve.entity.ProviderEntity;
import quick.serve.entity.UserEntity;
import quick.serve.repo.BookingRepo;
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
	private BookingRepo bookingRepo;

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
		if (matches) {
			return entity;
		}
		return null;
	}

	public void providerRegisterService(UserEntity entity, ProviderEntity pEntity, String documentType,
			MultipartFile documentURL, MultipartFile certificate, MultipartFile extraCertificate) {

		// Check if email already exists
		UserEntity existingUser = userRepo.findByUserEmail(entity.getUserEmail());

		if (existingUser != null) {
			throw new RuntimeException("Email already registered");
		}

		ProviderDocEntity pdEntity = new ProviderDocEntity();

		pdEntity.setDocumentType(documentType);

		// System.out.println(document_url.getOriginalFilename(),certificate.getOriginalFilename());
		Path pDocLocation = Paths.get(pDocument + File.separator + documentURL.getOriginalFilename());

		Path pCertificateLocation = Paths.get(pCertificate + File.separator + certificate.getOriginalFilename());

		Path pExtrapCertificateLocation = null;

		if (extraCertificate != null && !extraCertificate.isEmpty()) {

			pExtrapCertificateLocation = Paths
					.get(pExtraCertificate + File.separator + extraCertificate.getOriginalFilename());
		}

		try {
			Files.copy(documentURL.getInputStream(), pDocLocation, StandardCopyOption.REPLACE_EXISTING);
			Files.copy(certificate.getInputStream(), pCertificateLocation, StandardCopyOption.REPLACE_EXISTING);
			if (extraCertificate != null && !extraCertificate.isEmpty()) {

				Files.copy(extraCertificate.getInputStream(), pExtrapCertificateLocation,
						StandardCopyOption.REPLACE_EXISTING);
			}
		} catch (Exception e) {
			e.getLocalizedMessage();
		}

		pdEntity.setDocumentURL(documentURL.getOriginalFilename());
		pdEntity.setCertificate(certificate.getOriginalFilename());
		if (extraCertificate != null && !extraCertificate.isEmpty()) {

			pdEntity.setExtraCertificate(extraCertificate.getOriginalFilename());
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

		ProviderEntity provider = providerRepo.findById(id).orElseThrow();

		provider.setStatus("approved");

		providerRepo.save(provider);
	}

	public void rejectProvider(Integer id) {

		ProviderEntity provider = providerRepo.findById(id).orElseThrow();

		provider.setStatus("rejected");

		providerRepo.save(provider);
	}

	public ProviderDashboardDTO getDashboardData(Integer pId) {

	    ProviderDashboardDTO dto =
	            new ProviderDashboardDTO();

	    dto.setTotalBookings(
	            bookingRepo.countByPId(pId));

	    dto.setPendingRequests(
	            bookingRepo.countByPIdAndBookingStatus(
	                    pId,
	                    "pending"));

	    dto.setCompletedJobs(
	            bookingRepo.countByPIdAndBookingStatus(
	                    pId,
	                    "completed"));

	    dto.setRecentBookings(
	            getProviderBookings(pId));

	    return dto;
	}

	
	//for provider Accept the service then shows customer details
	
	public List<CustomerBookingDTO> getProviderBookings(
	        Integer pId) {

	    List<BookingEntity> bookings =
	            bookingRepo.findByPIdOrderByBookingDateDesc(pId);
	    if (bookings.size() > 5) {
	        bookings = bookings.subList(0, 5);
	    }

	    List<CustomerBookingDTO> result =
	            new ArrayList<>();

	    for (BookingEntity booking : bookings) {

	        UserEntity customer =
	                userRepo.findById(
	                        booking.getUId())
	                        .orElse(null);

	        CustomerBookingDTO dto =
	                new CustomerBookingDTO();

	        dto.setBookingId(
	                booking.getBookingId());

	        dto.setServiceName(
	                booking.getServiceName());

	        dto.setProblem(
	                booking.getProblem());

	        dto.setAddress(
	                booking.getAddress());

	        dto.setBookingStatus(
	                booking.getBookingStatus());

	        dto.setBookingDate(
	                booking.getBookingDate());

	        if (customer != null) {

	            dto.setCustomerName(
	                    customer.getFullName());

	            dto.setCustomerPhone(
	                    customer.getUserPhone());

	            dto.setCustomerEmail(
	                    customer.getUserEmail());
	        }

	        result.add(dto);
	    }

	    return result;
	}
}
