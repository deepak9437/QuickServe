package quick.serve.dto;

import lombok.Data;

@Data
public class ForgotPasswordDTO {

    private String userEmail;

    private String newPassword;
}