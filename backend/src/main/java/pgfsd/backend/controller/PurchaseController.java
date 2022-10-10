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

import javax.validation.Valid;
import java.security.Principal;

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

    @PutMapping("/cart")
    public Purchase addToCart(@Validated @RequestBody Purchase purchase, Authentication authentication) throws IllegalAccessException {
        User user = (User) authentication.getPrincipal();
        return purchaseService.updateCart(purchase, user);
    }

    @PostMapping("/checkout")
    public Purchase checkoutCart(@Validated @RequestBody PaymentDto paymentDto, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return purchaseService.checkoutCart(user, paymentDto);
    }
}
