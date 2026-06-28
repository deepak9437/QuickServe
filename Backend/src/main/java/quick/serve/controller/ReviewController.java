package quick.serve.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import quick.serve.entity.ReviewEntity;
import quick.serve.repo.ReviewRepo;

@RestController
@CrossOrigin("*")
@RequestMapping("/review")
public class ReviewController {

	@Autowired
	private ReviewRepo reviewRepo;

	@PostMapping("/set_review")
	public String setReview(@RequestParam Integer bId, @RequestParam Integer uId, @RequestParam Integer pId,
			@RequestParam Integer rating, @RequestParam String comment) {

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

		reviewRepo.save(review);

		return "REVIEW_SUBMITTED";
	}
}
