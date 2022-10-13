package pgfsd.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pgfsd.backend.entities.Category;
import pgfsd.backend.entities.Purchase;
import pgfsd.backend.entities.User;

import java.time.Instant;
import java.util.List;
import java.util.Optional;


@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Long> {

    Optional<Purchase> findByBuyerAndPurchasedOnOrderByCreatedOnDesc (User buyer,Instant purchasedOn);

    Optional<Purchase> findByBuyerAndId(User buyer, Long id);

    List<Purchase> findAllByBuyerOrderByPurchasedOnDesc(User buyer);
}
