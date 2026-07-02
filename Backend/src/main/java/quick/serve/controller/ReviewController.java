package quick.serve.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import quick.serve.dto.ReviewDTO;
import quick.serve.dto.UserDTO;
import quick.serve.entity.ProviderEntity;
import quick.serve.entity.ReviewEntity;
import quick.serve.entity.UserEntity;
import quick.serve.repo.ProviderRepository;
import quick.serve.repo.ReviewRepo;
import quick.serve.repo.UserRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/review")
public class ReviewController {

	@Autowired
	private ReviewRepo reviewRepo;

	@Autowired
	private ProviderRepository providerRepo;
	
	@Autowired
	private UserRepository userRepo;

	@PostMapping("/set_review")
	public String setReview(@RequestParam Integer bId, @RequestParam Integer uId, @RequestParam Integer pId,
			@RequestParam Double rating, @RequestParam String comment) {

		if (rating < 1 || rating > 5) {
			return "INVALID_RATING";
		}

		if (reviewRepo.existsByBId(bId)) {
			return "REVIEW_ALREADY_GIVEN";
		}

		ReviewEntity review = new ReviewEntity();

		review.setBId(bId);
		review.setUId(uId);
		review.setPId(pId);
		review.setRating(rating);
		review.setComment(comment);

		updaterating(pId, rating);
		reviewRepo.save(review);

		return "REVIEW_SUBMITTED";
	}

	// @GetMapping("/x")
	public void updaterating(Integer pId, Double rating) {

		ProviderEntity provider = providerRepo.findById(pId).orElseThrow();

		Double existRating = provider.getRating();
		Integer existTotal = provider.getTotalReview();

		if (existRating == null) {
			existRating = 0.0;
		}

		if (existTotal == null) {
			existTotal = 0;
		}

		Integer newTotal = existTotal + 1;
		Double newRating = ((existRating * existTotal) + rating) / newTotal;

		// Round to 1 decimal place
		newRating = Math.round(newRating * 10.0) / 10.0;
		provider.setRating(newRating);
		provider.setTotalReview(newTotal);

		providerRepo.save(provider);

	}
	
	@GetMapping("/all")
	public List<ReviewDTO> getAllReviews() {

	    List<ReviewEntity> reviews = reviewRepo.findAll();

	    return reviews.stream().map(review -> {

	        ReviewDTO dto = new ReviewDTO();

	        dto.setId(review.getRId());
	        dto.setRating(review.getRating());
	        dto.setComment(review.getComment());

	        UserEntity user = userRepo.findById(review.getUId()).orElseThrow();

	        UserDTO userDto = new UserDTO();

	        userDto.setId(user.getId());
	        userDto.setFullName(user.getFullName());
	        userDto.setAddress(user.getAddress());

	        dto.setUser(userDto);

	        return dto;

	    }).toList();
	}

}
