package pgfsd.backend.dto;

import lombok.Data;

import javax.validation.constraints.Size;

@Data
public class UserRegistrationDto {
    @Size(min = 3, max = 200)
    private String email;
    @Size(min = 5, max = 200)
    private String password;
}
