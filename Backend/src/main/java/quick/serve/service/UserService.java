package quick.serve.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import quick.serve.dto.RecentBookingDTO;
import quick.serve.dto.UserDashboardDTO;
import quick.serve.entity.BookingEntity;
import quick.serve.entity.ProviderEntity;
import quick.serve.entity.UserEntity;
import quick.serve.repo.BookingRepo;
import quick.serve.repo.ProviderRepository;
import quick.serve.repo.ReviewRepo;
import quick.serve.repo.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private EmailService emailService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private BookingRepo bookingRepo;

	@Autowired
	private ProviderRepository providerRepo;
	
	@Autowired
	private ReviewRepo reviewRepo;

//	@Value("${image.path.user}")
//	String userImage;

	public void userRegisterService(UserEntity entity) {
		userRepo.save(entity);
		emailService.userEmail(entity);
	}

	public UserEntity userLoginService(String userEmail, String password) {
		UserEntity entity = userRepo.findByUserEmail(userEmail);

		boolean matches = passwordEncoder.matches(password, entity.getPassword());
		if (matches) {
			return entity;
		}
		return null;
	}

	public UserEntity updateProfileService(UserEntity uEntity) {
		return userRepo.save(uEntity);
	}

	public UserDashboardDTO getUserDashboardData(Integer uId) {

		UserDashboardDTO dto = new UserDashboardDTO();
		
		UserEntity userEntity = userRepo.findById(uId).orElseThrow();

		dto.setTotalBookings(bookingRepo.countByUId(uId));

		dto.setActiveBookings(bookingRepo.countByUIdAndBookingStatus(uId, "pending"));

		dto.setCompletedBookings(bookingRepo.countByUIdAndBookingStatus(uId, "completed"));
		
		dto.setTotalReviews(reviewRepo.countUId(uId));
		
		if (userEntity.getCreatedAt() != null) {
		    dto.setMemberSince(userEntity.getCreatedAt().toLocalDate());
		}

		List<BookingEntity> bookings = bookingRepo.findByUIdOrderByBookingDateDesc(uId);

		List<RecentBookingDTO> recentBookings = new ArrayList<>();

		for (BookingEntity booking : bookings) {

			RecentBookingDTO recentBooking = new RecentBookingDTO();

			recentBooking.setProblem(booking.getProblem());

			recentBooking.setBookingStatus(booking.getBookingStatus());

			recentBooking.setBookingDate(booking.getBookingDate());

			recentBooking.setBookingId(booking.getBookingId());

			recentBooking.setPId(booking.getPId());

			recentBooking.setReviewGiven(reviewRepo.existsByBId(booking.getBookingId()));

			ProviderEntity provider = providerRepo.findById(booking.getPId()).orElse(null);

			if (provider != null) {
				recentBooking.setProviderName(provider.getUser().getFullName());
			}

			recentBookings.add(recentBooking);
		}

		dto.setRecentBookings(recentBookings);

		return dto;
	}

}