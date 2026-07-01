package quick.serve.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import quick.serve.entity.ProviderEntity;
import quick.serve.entity.ReviewEntity;
import quick.serve.repo.ProviderRepository;
import quick.serve.repo.ReviewRepo;

@RestController
@CrossOrigin("*")
@RequestMapping("/review")
public class ReviewController {

	@Autowired
	private ReviewRepo reviewRepo;

	@Autowired
	private ProviderRepository providerRepo;

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

}
