package pgfsd.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pgfsd.backend.entities.Product;
import pgfsd.backend.entities.User;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.Instant;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseDto {
    @NotNull
    private Long id;
    @NotNull
    private List<Product> products;
    @NotNull
    private Instant createdOn;
    private Instant purchasedOn;
    private Long creditCardNumber;
    private String address;
}
