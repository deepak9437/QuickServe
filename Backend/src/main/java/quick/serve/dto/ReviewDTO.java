package quick.serve.dto;

import lombok.Data;

@Data
public class ReviewDTO {

    private Integer id;

    private Double rating;

    private String comment;

    private UserDTO user;

}