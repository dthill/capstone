package pgfsd.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pgfsd.backend.entities.Category;
import pgfsd.backend.entities.Product;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductAdminDto {
    private List<Product> products;
    private List<Category> possibleCategories;
}
