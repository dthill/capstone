package pgfsd.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pgfsd.backend.dto.ProductDetailsDto;
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

    @GetMapping("/products/{id}")
    public Product productById(@Validated @PathVariable Long id) {
        return this.productService.getProduct(id);
    }

    @PostMapping("/add/product")
    public List<Product> addProduct(@Validated @RequestBody SaveProductDto saveProductDto) {
        return this.productService.addProduct(saveProductDto);
    }

    @PutMapping("/update/product")
    public Product updateProduct(@Validated @RequestBody ProductDetailsDto productDetailsDto) {
        return this.productService.updateProduct(productDetailsDto);
    }

    @DeleteMapping("/delete/product")
    public List<Product> delete(@Validated @RequestBody ProductDetailsDto productDetailsDto) {
        return this.productService.deleteProduct(productDetailsDto);
    }
}
