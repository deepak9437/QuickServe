package quick.serve.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import quick.serve.jwt.JwtUtil;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{
	
	private final JwtUtil jwtUtil;
	
	public JwtAuthenticationFilter(JwtUtil jwtUtil) {
	    this.jwtUtil = jwtUtil;
	}
	
	@Autowired
	private CustomUserDetailsService customUserDetailsService;
	
	@Override
	protected void doFilterInternal(
	        HttpServletRequest request,
	        HttpServletResponse response,
	        FilterChain filterChain)
	        throws ServletException, IOException {
		
		String authHeader = request.getHeader("Authorization");
		
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {

		    filterChain.doFilter(request, response);

		    return;

		}
		
		String token = authHeader.substring(7);
		
		if (!jwtUtil.isTokenValid(token)) {

		    filterChain.doFilter(request, response);

		    return;

		}
		
		String email = jwtUtil.extractEmail(token);
		
		UserDetails userDetails =
		        customUserDetailsService.loadUserByUsername(email);

		UsernamePasswordAuthenticationToken authentication =
		        new UsernamePasswordAuthenticationToken(
		                userDetails,
		                null,
		                userDetails.getAuthorities()
		        );

		SecurityContextHolder
		        .getContext()
		        .setAuthentication(authentication);
		
		filterChain.doFilter(request, response);
		
	}
	
}
