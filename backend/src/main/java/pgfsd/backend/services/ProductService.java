package pgfsd.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pgfsd.backend.dto.ProductAdminDto;
import pgfsd.backend.dto.ProductDetailsDto;
import pgfsd.backend.dto.ProductSearchDto;
import pgfsd.backend.dto.SaveProductDto;
import pgfsd.backend.entities.Category;
import pgfsd.backend.entities.Product;
import pgfsd.backend.repositories.CategoryRepository;
import pgfsd.backend.repositories.ProductRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public ProductAdminDto searchAllProducts(ProductSearchDto productSearchDto) {
        ProductAdminDto productAdminDto = new ProductAdminDto();
        productAdminDto.setPossibleCategories(categoryRepository.findAll());
        String searchTerm = productSearchDto.getProductSearch();
        if(searchTerm == null) {
            searchTerm = "";
        }
        searchTerm = "%" + searchTerm + "%";
        if(productSearchDto.getCategoryId() != null){
            productAdminDto.setProducts(productRepository.searchAllEnabledProductsAndCategories(searchTerm, productSearchDto.getCategoryId()));
        } else {
            productAdminDto.setProducts(productRepository.searchAllEnabledProducts(searchTerm));
        }
        return productAdminDto;
    }


    public ProductAdminDto getAllAdminProducts() {
        ProductAdminDto productAdminDto = new ProductAdminDto();
        productAdminDto.setProducts(productRepository.findAll());
        productAdminDto.setPossibleCategories(categoryRepository.findAll());
        return productAdminDto;
    }

    public ProductAdminDto getTopProducts() {
        ProductAdminDto productAdminDto = new ProductAdminDto();
        Pageable firstPage = PageRequest.of(0, 5, Sort.by("name").ascending());
        productAdminDto.setProducts(
                productRepository.findEnabledWithPageable(firstPage)
        );
        productAdminDto.setPossibleCategories(categoryRepository.findAll());
        return productAdminDto;
    }

    public ProductDetailsDto getProduct(Long id){
        Optional<Product> savedProduct = this.productRepository.findById(id);
        if(savedProduct.isEmpty()){
            return null;
        }
        Product product = savedProduct.get();
        List<Category> categories = categoryRepository.findAll();
        ProductDetailsDto productDetailsDto = new ProductDetailsDto();
        productDetailsDto.setId(product.getId());
        productDetailsDto.setName(product.getName());
        productDetailsDto.setDescription(product.getDescription());
        productDetailsDto.setPrice(product.getPrice());
        productDetailsDto.setImageUrl(product.getImageUrl());
        productDetailsDto.setCategoryIds(product.getCategories()
                .stream()
                .map(Category::getId)
                .collect(Collectors.toList()));
        productDetailsDto.setEnabled((product.getEnabled()));
        productDetailsDto.setPossibleCategories(Optional.of(categories));
        return productDetailsDto;
    }


    @Transactional
    public List<Product> addProduct(SaveProductDto saveProductDto) {
        Product product = new Product();
        product.setName(saveProductDto.getName());
        product.setDescription(saveProductDto.getDescription());
        product.setPrice(saveProductDto.getPrice());
        product.setEnabled(saveProductDto.getEnabled());
        product.setImageUrl(saveProductDto.getImageUrl());
        product.setCategories(saveProductDto.getCategoryIds().stream().map(categoryId -> {
            Category category = new Category();
            category.setId(categoryId);
            return category;
        }).collect(Collectors.toList()));
        productRepository.save(product);
        return productRepository.findAll();
    }

    @Transactional
    public Product updateProduct(ProductDetailsDto productDetailsDto){
        Product product = new Product();
        product.setId(productDetailsDto.getId());
        product.setName(productDetailsDto.getName());
        product.setDescription(productDetailsDto.getDescription());
        product.setPrice(productDetailsDto.getPrice());
        product.setEnabled(productDetailsDto.getEnabled());
        product.setImageUrl(productDetailsDto.getImageUrl());
        product.setCategories(productDetailsDto.getCategoryIds()
                .stream().map(categoryId -> {
                    Category category = new Category();
                    category.setId(categoryId);
                    return category;
                }).collect(Collectors.toList()));
        return this.productRepository.save(product);
    }


    @Transactional
    public List<Product> deleteProduct(Long productId){
        Product product = new Product();
        product.setId(productId);
        productRepository.delete(product);
        return productRepository.findAll();
    }
}
