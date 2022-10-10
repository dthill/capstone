package pgfsd.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pgfsd.backend.dto.ProductAdminDto;
import pgfsd.backend.dto.ProductDetailsDto;
import pgfsd.backend.dto.ProductSearchDto;
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

    @PostMapping("/products")
    public ProductAdminDto searchProducts(@Validated @RequestBody ProductSearchDto productSearchDto) {
        return this.productService.searchAllProducts(productSearchDto);
    }

    @GetMapping("/products/top")
    public ProductAdminDto getTopProducts() {
        return this.productService.getTopProducts();
    }

    @GetMapping("/products/{id}")
    public ProductDetailsDto productById(@Validated @PathVariable Long id) {
        return this.productService.getProduct(id);
    }

    @GetMapping("/admin/products")
    public ProductAdminDto allProducts() {
        return this.productService.getAllAdminProducts();
    }

    @PostMapping("/admin/product")
    public List<Product> addProduct(@Validated @RequestBody SaveProductDto saveProductDto) {
        return this.productService.addProduct(saveProductDto);
    }

    @PutMapping("/admin/product")
    public Product updateProduct(@Validated @RequestBody ProductDetailsDto productDetailsDto) {
        return this.productService.updateProduct(productDetailsDto);
    }

    @DeleteMapping("/admin/product/{id}")
    public List<Product> delete(@Validated @PathVariable Long id) {
        return this.productService.deleteProduct(id);
    }
}
