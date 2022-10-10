package pgfsd.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pgfsd.backend.dto.SaveCategoryDto;
import pgfsd.backend.entities.Category;
import pgfsd.backend.repositories.CategoryRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategory(Long id){
        Optional<Category> category = categoryRepository.findById(id);
        return category.orElse(null);
    }


    @Transactional
    public List<Category> addCategory(SaveCategoryDto saveCategoryDto) {
        Category category = new Category();
        category.setName(saveCategoryDto.getName());
        category.setDescription(saveCategoryDto.getDescription());
        categoryRepository.save(category);
        return categoryRepository.findAll();
    }

    @Transactional
    public Category updateCategory(Category category){
        return categoryRepository.save(category);
    }


    @Transactional
    public List<Category> deleteCategory(Long categoryId){
        Category category = new Category();
        category.setId(categoryId);
        categoryRepository.delete(category);
        return categoryRepository.findAll();
    }
}
