package pgfsd.backend.services;

import pgfsd.backend.dto.SaveCategoryDto;
import pgfsd.backend.entities.Category;
import pgfsd.backend.repositories.CategoryRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.testng.Assert.*;

public class CategoryServiceTest {

    private CategoryRepository categoryRepository;
    private CategoryService categoryService;


    @org.testng.annotations.BeforeMethod
    public void setUp() {
        categoryRepository = mock(CategoryRepository.class);
        categoryService = new CategoryService(categoryRepository);
    }

    @org.testng.annotations.AfterMethod
    public void tearDown() {
    }

    @org.testng.annotations.Test
    public void testGetAllCategories() {
        List<Category> expected = new ArrayList<>();
        when(categoryRepository.findAll()).thenReturn(expected);

        List<Category> categories = categoryService.getAllCategories();

        assertEquals(categories,expected);
        verify(categoryRepository).findAll();
    }

    @org.testng.annotations.Test
    public void testGetCategory() {
        Category expected = new Category();
        Long id = 1L;
        when(categoryRepository.findById(id)).thenReturn(Optional.of(expected));

        Category category = categoryService.getCategory(id);

        assertEquals(category, expected);
        verify(categoryRepository).findById(id);
    }

    @org.testng.annotations.Test
    public void testAddCategory() {
        SaveCategoryDto saveCategoryDto = new SaveCategoryDto();
        categoryService.addCategory(saveCategoryDto);

        verify(categoryRepository).save(any(Category.class));
        verify(categoryRepository).findAll();
    }

    @org.testng.annotations.Test
    public void testUpdateCategory() {
        Category category = new Category();

        categoryService.updateCategory(category);

        verify(categoryRepository).save(category);
    }

    @org.testng.annotations.Test
    public void testDeleteCategory() {
        Long categoryId = 1L;

        categoryService.deleteCategory(categoryId);

        verify(categoryRepository).delete(any(Category.class));
        verify(categoryRepository).findAll();
    }
}