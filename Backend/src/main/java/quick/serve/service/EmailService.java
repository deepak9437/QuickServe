package quick.serve.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import quick.serve.entity.UserEntity;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender mailSender;

	public void userEmail(UserEntity entity) {
		SimpleMailMessage msg = new SimpleMailMessage();
		msg.setTo(entity.getUserEmail());
		msg.setSubject("Registration Successful ..");
		msg.setText("Hello " + entity.getFullName() + ",\n\n" + "Welcome to QuickService!\n\n"
				+ "Your account has been created successfully. You can now easily find trusted service providers,"
				+ " compare options, book services, and get quick and reliable assistance whenever you need it.\n\n"
				+ "Thank you for choosing QuickService.\n\n" + "Regards,\n" + "QuickService Team");
		mailSender.send(msg);
	}

	public void providerEmail(UserEntity entity) {
		SimpleMailMessage msg = new SimpleMailMessage();
		msg.setTo(entity.getUserEmail());
		msg.setSubject("Registration Successful ..");
		msg.setText("Hello " + entity.getFullName() + ",\n\n" + "Your registration has been submitted successfully.\n\n"
				+ "Our team will review your profile and documents. Once approved, you will be able to provide services,"
				+ " manage bookings, and connect with customers through our platform.\n\n"
				+ "We will notify you when your account is approved.\n\n" + "Thank you for joining QuickService.\n\n"
				+ "Regards,\n" + "QuickService Team");
	}

}
