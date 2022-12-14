package pgfsd.backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
public class PaymentDto {
    @NotNull
    private Long creditCardNumber;
    @NotNull
    private String address;
}
