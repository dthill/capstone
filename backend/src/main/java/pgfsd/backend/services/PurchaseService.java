package pgfsd.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pgfsd.backend.dto.PaymentDto;
import pgfsd.backend.dto.PurchaseDto;
import pgfsd.backend.entities.Product;
import pgfsd.backend.entities.Purchase;
import pgfsd.backend.entities.User;
import pgfsd.backend.repositories.PurchaseRepository;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public PurchaseDto getCartDto(User user){
        return mapPurchaseToDto((getCart(user)));
    }

    public PurchaseDto deleteFromCart(Long productId, User user) throws IllegalAccessException {
        Purchase purchase = getCart(user);
        List<Product> products = purchase.getProducts();
        for(int i =0; i < products.size(); i++){
            if(Objects.equals(products.get(i).getId(), productId)){
                products.remove(i);
                break;
            }
        }
        return mapPurchaseToDto(purchaseRepository.save(purchase));
    }

    public void checkoutCart(User user, PaymentDto paymentDto){
        Purchase cart = getCart(user);
        cart.setAddress(paymentDto.getAddress());
        cart.setCreditCardNumber(paymentDto.getCreditCardNumber());
        cart.setPurchasedOn(Instant.now());
        Purchase purchase = purchaseRepository.save(cart);
    }

    public PurchaseDto getPurchase(User user, Long purchaseId){
        Optional<Purchase> purchase = purchaseRepository.findByBuyerAndId(user,purchaseId);
        if(purchase.isEmpty()){
            return null;
        }
        return mapPurchaseToDto(purchase.get());
    }

    public List<PurchaseDto> getPurchasesForUser(User user){
        return purchaseRepository
                .findAllByBuyerOrderByPurchasedOnDesc(user)
                .stream()
                .map(this::mapPurchaseToDto)
                .collect(Collectors.toList());
    }

    private PurchaseDto mapPurchaseToDto(Purchase purchase){
        Long anonymizedCreditCard = purchase.getCreditCardNumber() == null ? null : purchase.getCreditCardNumber() % 100;
        return new PurchaseDto(
                purchase.getId(),
                purchase.getProducts(),
                purchase.getCreatedOn(),
                purchase.getPurchasedOn(),
                anonymizedCreditCard,
                purchase.getAddress()
        );
    }
}
