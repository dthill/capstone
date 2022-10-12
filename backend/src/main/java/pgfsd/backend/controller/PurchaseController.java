package pgfsd.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pgfsd.backend.dto.PaymentDto;
import pgfsd.backend.entities.Purchase;
import pgfsd.backend.entities.User;
import pgfsd.backend.services.PurchaseService;

@RestController
public class PurchaseController {

    private PurchaseService purchaseService;

    @Autowired
    public PurchaseController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    @PostMapping("/cart")
    public ResponseEntity<Object> addToCart(@Validated @RequestBody Long productId, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        purchaseService.addToCart(productId, user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/cart")
    public Purchase addToCart(Authentication authentication)  {
        User user = (User) authentication.getPrincipal();
        return purchaseService.getCart(user);
    }

    @DeleteMapping("/cart/{productId}")
    public Purchase deleteFromCart(@Validated @PathVariable Long productId, Authentication authentication) throws IllegalAccessException {
        User user = (User) authentication.getPrincipal();
        return purchaseService.deleteFromCart(productId, user);
    }

    @PostMapping("/checkout")
    public Purchase checkoutCart(@Validated @RequestBody PaymentDto paymentDto, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return purchaseService.checkoutCart(user, paymentDto);
    }
}
