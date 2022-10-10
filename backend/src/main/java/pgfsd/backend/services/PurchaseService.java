package pgfsd.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import pgfsd.backend.dto.PaymentDto;
import pgfsd.backend.entities.Product;
import pgfsd.backend.entities.Purchase;
import pgfsd.backend.entities.User;
import pgfsd.backend.repositories.PurchaseRepository;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;

    @Autowired
    public PurchaseService(PurchaseRepository purchaseRepository) {
        this.purchaseRepository = purchaseRepository;
    }

    public void addToCart(Long productId, User user){
        Product product = new Product();
        product.setId(productId);
        Purchase cart = getCart(user);
        cart.getProducts().add(product);
        purchaseRepository.save(cart);
    }

    public Purchase getCart(User user){
        Optional<Purchase> previousCart = purchaseRepository
                .findByBuyerAndPurchasedOnOrderByCreatedOnDesc(user,null);
        Purchase cart = previousCart.orElse(new Purchase());
        if(cart.getProducts() == null){
            cart.setProducts(new ArrayList<>());
        }
        cart.setBuyer(user);
        cart.setCreatedOn(Instant.now());
        return cart;
    }

    public Purchase updateCart(Purchase purchase, User user) throws IllegalAccessException {
        if(!purchase.getBuyer().getId().equals(user.getId())) {
            throw new IllegalAccessException("user not allowed");
        }
        if(purchase.getPurchasedOn() != null || purchase.getCreditCardNumber() != null){
            throw new IllegalStateException("update finished purchase not allowed");
        }
        return purchaseRepository.save(purchase);
    }

    public Purchase checkoutCart(User user, PaymentDto paymentDto){
        Purchase cart = getCart(user);
        cart.setAddress(paymentDto.getAddress());
        cart.setCreditCardNumber(paymentDto.getCreditCardNumber());
        Purchase purchase = purchaseRepository.save(cart);
        // anonymize credit card;
        purchase.setCreditCardNumber(purchase.getCreditCardNumber() % 10);
        return purchase;
    }
}
