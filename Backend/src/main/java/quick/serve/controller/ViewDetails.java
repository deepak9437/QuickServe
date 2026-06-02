package quick.serve.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import quick.serve.dto.FullProjectDTO;
import quick.serve.service.MainService;

@RestController
@CrossOrigin("*")
@RequestMapping("/view")
public class ViewDetails {

	@Autowired
	private MainService mainService;

	@GetMapping("/all")
	public List<FullProjectDTO> providerDetails() {
		List<FullProjectDTO> entity = mainService.getUserDetails();

		return entity;
	}
}
