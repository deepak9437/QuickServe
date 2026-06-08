package quick.serve.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import quick.serve.dto.ProviderDTO;
import quick.serve.service.ViewService;

@CrossOrigin("*")
@RestController
@RequestMapping("/view")
public class ViewDetailsController {

	@Autowired
	private ViewService viewService;

	@GetMapping("/all")
	public List<ProviderDTO> getAllProviders() {
		
		return viewService.getAllProviders();
	}
	
	@GetMapping("/separate")
	public List<ProviderDTO> singleProvider(@RequestParam String skills){
		
		return viewService.getSingleProvider(skills);
	}
}
