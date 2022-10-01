package pgfsd.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class UserDto {
    @NotNull
    private String email;
    private Boolean isAdmin;
    
}
