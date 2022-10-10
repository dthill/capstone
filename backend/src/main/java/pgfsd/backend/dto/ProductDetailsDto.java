package pgfsd.backend.dto;

import lombok.Data;
import pgfsd.backend.entities.Category;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Optional;

@Data
public class ProductDetailsDto {
    @Min(1)
    private Long id;
    @Size(min = 3, max = 100)
    private String name;
    @Size(min = 3, max = 200)
    private String description;
    @Min(1)
    private Long price;
    @NotNull
    private List<Long> categoryIds;
    @NotNull
    private Boolean enabled;
    private String imageUrl;
    private Optional<List<Category>> possibleCategories;
}
