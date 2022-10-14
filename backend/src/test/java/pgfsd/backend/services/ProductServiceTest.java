package pgfsd.backend.services;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import pgfsd.backend.dto.ProductDetailsDto;
import pgfsd.backend.dto.ProductSearchDto;
import pgfsd.backend.dto.SaveCategoryDto;
import pgfsd.backend.dto.SaveProductDto;
import pgfsd.backend.entities.Category;
import pgfsd.backend.entities.Product;
import pgfsd.backend.repositories.CategoryRepository;
import pgfsd.backend.repositories.ProductRepository;

import java.util.ArrayList;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.testng.Assert.*;

public class ProductServiceTest {

    private ProductService productService;
    private ProductRepository productRepository;
    private CategoryRepository categoryRepository;

    @BeforeMethod
    public void setUp() {
        productRepository = mock(ProductRepository.class);
        categoryRepository = mock(CategoryRepository.class);
        productService = new ProductService(productRepository,categoryRepository);
    }

    @AfterMethod
    public void tearDown() {
    }

    @Test
    public void testSearchAllProducts() {
        String search = "test";
        Long categoryId = 1L;
        ProductSearchDto productSearchDto = new ProductSearchDto();
        productSearchDto.setProductSearch(search);
        productSearchDto.setCategoryId(categoryId);

        productService.searchAllProducts(productSearchDto);

        verify(productRepository).searchAllEnabledProductsAndCategories(anyString(),eq(categoryId));
    }

    @Test
    public void testGetAllAdminProducts() {
        productService.getAllAdminProducts();

        verify(productRepository).findAll();
        verify(categoryRepository).findAll();
    }

    @Test
    public void testGetTopProducts() {
        Pageable firstPage = PageRequest.of(0, 5, Sort.by("name").ascending());

        productService.getTopProducts();

        verify(productRepository).findTopProducts(eq(firstPage));
        verify(categoryRepository).findAll();
    }

    @Test
    public void testGetProduct() {
        Long productId = 1L;
        Product product = new Product();
        product.setCategories(new ArrayList<>());
        when(productRepository.findById(productId)).thenReturn(Optional.of(product));
        when(categoryRepository.findAll()).thenReturn(new ArrayList<>());

        productService.getProduct(productId);

        verify(productRepository).findById(eq(productId));
        verify(categoryRepository).findAll();
    }

    @Test
    public void testAddProduct() {
        SaveProductDto saveProductDto = mock(SaveProductDto.class);

        productService.addProduct(saveProductDto);

        verify(productRepository).save(any(Product.class));
    }

    @Test
    public void testUpdateProduct() {
        ProductDetailsDto productDetailsDto = mock(ProductDetailsDto.class);

        productService.updateProduct(productDetailsDto);

        verify(productRepository).save(any(Product.class));
    }

    @Test
    public void testDeleteProduct() {
        Long productId = 1L;

        productService.deleteProduct(productId);

        verify(productRepository).delete(any(Product.class));
    }
}