package quick.serve.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import quick.serve.dto.ProviderDTO;
import quick.serve.dto.ProviderDocDTO;
import quick.serve.dto.UserDTO;
import quick.serve.entity.ProviderEntity;
import quick.serve.repo.ProviderRepository;

@Service
public class ViewService {
	
	@Autowired
	private ProviderRepository providerRepo;
	
	
	
	//Get only single provider details
	public List<ProviderDTO> getSingleProvider(String skills) {

	    List<ProviderEntity> providers = providerRepo.findBySkills(skills);

	    return providers.stream().map(provider -> {

	        ProviderDTO dto = new ProviderDTO();

	        dto.setId(provider.getPId());
	        dto.setSkills(provider.getSkills());
	        dto.setExperience(provider.getExperience());
	        dto.setDescription(provider.getDescription());
	        dto.setStatus(provider.getStatus());
	        dto.setAvailability(provider.getAvailability());
	        dto.setRating(provider.getRating());
	        dto.setReview(provider.getTotalReview());

	        UserDTO userDto = new UserDTO();

	        userDto.setId(provider.getUser().getId());
	        userDto.setFullName(provider.getUser().getFullName());
	        userDto.setUserEmail(provider.getUser().getUserEmail());
	        userDto.setUserPhone(provider.getUser().getUserPhone());
	        userDto.setGender(provider.getUser().getGender());
	        userDto.setAddress(provider.getUser().getAddress());
	        userDto.setPincode(provider.getUser().getPincode());
	        userDto.setRole(provider.getUser().getRole());
	        
	        dto.setUser(userDto);

	        return dto;

	    }).toList();
	}
	

	
	
	
	//Get all details 
	public List<ProviderDTO> getAllProviders() {

		List<ProviderEntity> providers = providerRepo.findAllDetails("approved");

		return providers.stream().map(provider -> {

			ProviderDTO dto = new ProviderDTO();

			dto.setId(provider.getPId());
			dto.setSkills(provider.getSkills());
			dto.setExperience(provider.getExperience());
			dto.setDescription(provider.getDescription());
			dto.setStatus(provider.getStatus());
			dto.setAvailability(provider.getAvailability());
			dto.setRating(provider.getRating());
			dto.setReview(provider.getTotalReview());

			// User DTO
			UserDTO userDto = new UserDTO();
			userDto.setId(provider.getUser().getId());
			userDto.setFullName(provider.getUser().getFullName());
			userDto.setUserEmail(provider.getUser().getUserEmail());
			userDto.setUserPhone(provider.getUser().getUserPhone());
			userDto.setPassword(provider.getUser().getPassword());
			userDto.setGender(provider.getUser().getGender());
			userDto.setPincode(provider.getUser().getPincode());
			userDto.setRole(provider.getUser().getRole());
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





	public List<ProviderDTO> getAllPending() {
		List<ProviderEntity> providers = providerRepo.findAllDetails("pending");

		return providers.stream().map(provider -> {

			ProviderDTO dto = new ProviderDTO();

			dto.setId(provider.getPId());
			dto.setSkills(provider.getSkills());
			dto.setExperience(provider.getExperience());
			dto.setDescription(provider.getDescription());
			dto.setStatus(provider.getStatus());
			dto.setAvailability(provider.getAvailability());
			dto.setRating(provider.getRating());
			dto.setReview(provider.getTotalReview());

			// User DTO
			UserDTO userDto = new UserDTO();
			userDto.setId(provider.getUser().getId());
			userDto.setFullName(provider.getUser().getFullName());
			userDto.setUserEmail(provider.getUser().getUserEmail());
			userDto.setUserPhone(provider.getUser().getUserPhone());
			userDto.setPassword(provider.getUser().getPassword());
			userDto.setGender(provider.getUser().getGender());
			userDto.setPincode(provider.getUser().getPincode());
			userDto.setRole(provider.getUser().getRole());
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
