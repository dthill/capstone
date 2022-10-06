package pgfsd.backend.dto;

import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

@Data
public class SaveProductDto {
    @Size(min = 3, max = 100)
    private String name;
    @Size(min = 3, max = 200)
    private String description;
    @Min(1)
    private Long price;
}
