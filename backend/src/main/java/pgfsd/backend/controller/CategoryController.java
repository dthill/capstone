package pgfsd.backend.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pgfsd.backend.dto.SaveCategoryDto;
import pgfsd.backend.entities.Category;
import pgfsd.backend.services.CategoryService;

import java.util.List;

@RestController
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/categories")
    public List<Category> allCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/categories/{id}")
    public Category categoryById(@Validated @PathVariable Long id) {
        return categoryService.getCategory(id);
    }

    @PostMapping("/admin/category")
    public List<Category> addCategory(@Validated @RequestBody SaveCategoryDto saveCategoryDto) {
        return categoryService.addCategory(saveCategoryDto);
    }

    @PutMapping("/admin/category")
    public Category updateProduct(@Validated @RequestBody Category category) {
        return categoryService.updateCategory(category);
    }

    @DeleteMapping("/admin/category/{id}")
    public List<Category> delete(@Validated @PathVariable Long id) {
        return categoryService.deleteCategory(id);
    }
}
