package quick.serve.security;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import quick.serve.entity.UserEntity;
import quick.serve.repo.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Service
public class CustomUserDetailsService implements UserDetailsService{
	
	private final UserRepository userRepository;
	
	public CustomUserDetailsService(UserRepository userRepository) {
		this.userRepository=userRepository;
	}
	
	@Override
	public UserDetails loadUserByUsername(String email)
	        throws UsernameNotFoundException {

		UserEntity user = userRepository.findByUserEmail(email);

		if (user == null) {
		    throw new UsernameNotFoundException("User not found");
		}

		return User
		        .withUsername(user.getUserEmail())
		        .password(user.getPassword())
		        .roles(user.getRole())
		        .build();

	}

}
