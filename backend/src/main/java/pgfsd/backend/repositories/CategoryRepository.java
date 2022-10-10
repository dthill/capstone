package pgfsd.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pgfsd.backend.entities.Category;


@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
