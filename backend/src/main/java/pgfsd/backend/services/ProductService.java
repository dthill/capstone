package pgfsd.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pgfsd.backend.dto.ProductDetailsDto;
import pgfsd.backend.dto.SaveProductDto;
import pgfsd.backend.entities.Product;
import pgfsd.backend.repositories.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }


    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProduct(Long id){
        Optional<Product> product = this.productRepository.findById(id);
        return product.orElse(null);
    }


    @Transactional
    public List<Product> addProduct(SaveProductDto saveProductDto) {
        Product product = new Product();
        product.setName(saveProductDto.getName());
        product.setDescription(saveProductDto.getDescription());
        product.setPrice(saveProductDto.getPrice());
        productRepository.save(product);
        return productRepository.findAll();
    }

    @Transactional
    public Product updateProduct(ProductDetailsDto productDetailsDto){
        Product product = new Product(
                productDetailsDto.getId(),
                productDetailsDto.getName(),
                productDetailsDto.getDescription(),
                productDetailsDto.getPrice());
        return this.productRepository.save(product);
    }


    @Transactional
    public List<Product> deleteProduct(ProductDetailsDto productDetailsDto){
        Product product = new Product(
                productDetailsDto.getId(),
                productDetailsDto.getName(),
                productDetailsDto.getDescription(),
                productDetailsDto.getPrice());
        productRepository.delete(product);
        return productRepository.findAll();
    }
}
