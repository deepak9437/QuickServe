package quick.serve.dto;

import lombok.Data;
import quick.serve.entity.UserEntity;

@Data
public class LoginResponse {

    private String token;
    private UserEntity user;
    private String message;

    public LoginResponse(String token, UserEntity user, String message) {
        this.token = token;
        this.user = user;
        this.message = message;
    }
}