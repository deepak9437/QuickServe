package quick.serve.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {

		registry.addResourceHandler("/provider/document/**").addResourceLocations("file:D:/assets/provider/document/");

		registry.addResourceHandler("/provider/certificate/**")
				.addResourceLocations("file:D:/assets/provider/certificate/");

		registry.addResourceHandler("/provider/extraCertificate/**")
				.addResourceLocations("file:D:/assets/provider/certificate/");

		registry.addResourceHandler("/user/profilePic/**").addResourceLocations("file:D:/assets/user");

	}
}