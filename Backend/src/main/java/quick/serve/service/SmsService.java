package quick.serve.service;

import org.springframework.stereotype.Service;

@Service
public class SmsService{
	
	
}



//This class is for Twilio

//public class SmsService {
//
// private final String ACCOUNT_SID =
//         "AC8789d5a349a49fce4d708858d6d8bb49";
//
// private final String AUTH_TOKEN =
//         "d9d2bbf18a8b839fa89774b28a603299";
//
// private final String TWILIO_NUMBER =
//         "+18173830288";
//
// public void sendSms(
//         String phone,
//         String message) {
//
//     Twilio.init(
//             ACCOUNT_SID,
//             AUTH_TOKEN);
//
//     try {
//
//    	    String smsText = null;
//			Message message1 = Message.creator(
//    	            new com.twilio.type.PhoneNumber(phone),
//    	            new com.twilio.type.PhoneNumber(TWILIO_NUMBER),
//    	            smsText
//    	    ).create();
//
//    	    System.out.println(message1.getSid());
//
//    	} catch (Exception e) {
//
//    	    e.printStackTrace();
//
//    	    if (e instanceof com.twilio.exception.ApiException ex) {
//
//    	        System.out.println("Code : " + ex.getCode());
//    	        System.out.println("Message : " + ex.getMessage());
//    	        System.out.println("More Info : " + ex.getMoreInfo());
//    	    }
//    	}
// }
//}


//This class is for Fast2SMS

//public class SmsService {
//
//    private static final String API_KEY =
//            "iohw1nfSy8G7YxcU0K5PvZ9LzpDrgCW4EedNl6JOBtIjsRkbMQ8EjXNl0opYWqMAesKTtF635SPdH9Zk";
//
//    public void sendSms(
//    		String message,
//            String phone
//            ) {
//
//        try {
//
//            String url =
//                    "https://www.fast2sms.com/dev/bulkV2"
//                    + "?authorization=" + API_KEY
//                    + "&route=q"
//                    + "&message=" + URLEncoder.encode(
//                            message,
//                            StandardCharsets.UTF_8)
//                    + "&language=english"
//                    + "&flash=0"
//                    + "&numbers=" + phone;
//
//            HttpClient client =
//                    HttpClient.newHttpClient();
//
//            HttpRequest request =
//                    HttpRequest.newBuilder()
//                            .uri(URI.create(url))
//                            .GET()
//                            .build();
//
//            HttpResponse<String> response =
//                    client.send(
//                            request,
//                            HttpResponse.BodyHandlers.ofString());
//
//            System.out.println(response.body());
//
//        } catch (Exception e) {
//
//            e.printStackTrace();
//        }
//    }
//}



