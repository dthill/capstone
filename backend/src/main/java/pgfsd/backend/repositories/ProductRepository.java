package pgfsd.backend.repositories;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pgfsd.backend.entities.Product;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findAll();

    @Query("SELECT p FROM Product p WHERE p.enabled = true")
    public List<Product> findEnabledWithPageable(Pageable pageable);

    @Query("SELECT prod FROM Purchase pur " +
            "JOIN pur.products prod " +
            "WHERE prod.enabled = true AND pur.purchasedOn IS NOT NULL " +
            "GROUP BY prod.id " +
            "ORDER BY COUNT(pur.id) DESC")
    public List<Product> findTopProducts(Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.enabled = true AND p.name LIKE ?1")
    public List<Product> searchAllEnabledProducts(String searchTerm);

    @Query("SELECT DISTINCT p FROM Product p JOIN p.categories c " +
            "WHERE p.enabled = true AND p.name LIKE ?1 AND c.id = ?2")
    public List<Product> searchAllEnabledProductsAndCategories(String searchTerm, Long categoryId);
}
