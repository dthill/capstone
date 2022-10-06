package pgfsd.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pgfsd.backend.dto.SaveProductDto;
import pgfsd.backend.entities.Product;
import pgfsd.backend.services.ProductService;

import java.util.List;

@RestController
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public List<Product> allProducts() {
        return this.productService.getAllProducts();
    }

    @PostMapping("/save/product")
    public Product saveProduct(@Validated @RequestBody SaveProductDto saveProductDto) {
        return this.productService.saveProduct(saveProductDto);
    }
}
