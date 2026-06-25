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
		msg.setSubject("QuickServe - Registration Successful ..");
		msg.setText("Hello " + entity.getFullName() + ",\n\n" + "Welcome to QuickService!\n\n"
				+ "Your account has been created successfully. You can now easily find trusted service providers,"
				+ " compare options, book services, and get quick and reliable assistance whenever you need it.\n\n"
				+ "Thank you for choosing QuickService.\n\n" + "Regards,\n" + "QuickService Team");
		mailSender.send(msg);
	}

	public void providerEmail(UserEntity entity) {
		SimpleMailMessage msg = new SimpleMailMessage();
		msg.setTo(entity.getUserEmail());
		msg.setSubject("QuickServe - Registration Successful ..");
		msg.setText("Hello " + entity.getFullName() + ",\n\n" + "Your registration has been submitted successfully.\n\n"
				+ "Our team will review your profile and documents. Once approved, you will be able to provide services,"
				+ " manage bookings, and connect with customers through our platform.\n\n"
				+ "We will notify you when your account is approved.\n\n" + "Thank you for joining QuickService.\n\n"
				+ "Regards,\n" + "QuickService Team");
		mailSender.send(msg);
	}

	public void otpEmail(String customerEmail, String otp) {
		SimpleMailMessage msg = new SimpleMailMessage();
		msg.setTo(customerEmail);
		msg.setSubject("QuickServe - Your request accepted...");
		msg.setText("QuickServe: Your booking has been accepted.\n\nYour Booking OTP is: " + otp
				+ "\n\nDon't share this otp to anyone.Only share this otp to the provider after the service completed.\n\n"
				+ "Regards,\n" + "QuickService Team");
		mailSender.send(msg);
	}

	public void forgotPasswordOtp(String userEmail, String otp) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(userEmail);
		message.setSubject("QuickServe - Password Reset OTP");
		message.setText("QuickServe: We received a request to reset your password.\n\n" + "Your Password Reset OTP is: "
				+ otp + "\n\nThis OTP is valid for a limited time." + "\nPlease do not share this OTP with anyone."
				+ "\nIf you did not request a password reset, you can safely ignore this email." + "\n\nRegards,"
				+ "\nQuickServe Team");
		mailSender.send(message);
	}

}
