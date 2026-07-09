package quick.serve.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        registry.addResourceHandler("/provider/document/**")
                .addResourceLocations(
                    "file:/home/ubuntu/quickserve/assets/provider/document/"
                );

        registry.addResourceHandler("/provider/certificate/**")
                .addResourceLocations(
                    "file:/home/ubuntu/quickserve/assets/provider/certificate/"
                );

        registry.addResourceHandler("/provider/extraCertificate/**")
                .addResourceLocations(
                    "file:/home/ubuntu/quickserve/assets/provider/extraCertificate/"
                );

        registry.addResourceHandler("/user/profilePic/**")
                .addResourceLocations(
                    "file:/home/ubuntu/quickserve/assets/user/profile/"
                );
    }
}