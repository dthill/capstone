package pgfsd.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.Size;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class UserDto {
    @Size(min = 3, max = 200)
    private String email;
    private Boolean isAdmin;

}
