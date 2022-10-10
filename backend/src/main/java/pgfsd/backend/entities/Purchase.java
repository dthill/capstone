package pgfsd.backend.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.Instant;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "purchase")
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @NotNull
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Product> products;

    @ManyToOne(fetch = FetchType.EAGER)
    private User buyer;
    @NotNull
    private Instant createdOn;
    private Instant purchasedOn;
    private Long creditCardNumber;
    private String address;
}