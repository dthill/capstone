package pgfsd.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pgfsd.backend.entities.Product;

import javax.persistence.ManyToMany;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SaveCategoryDto {
    @NotNull
    private String name;
    @NotNull
    private String description;
}
