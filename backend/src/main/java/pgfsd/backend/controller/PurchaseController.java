package pgfsd.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pgfsd.backend.dto.PaymentDto;
import pgfsd.backend.dto.PurchaseDto;
import pgfsd.backend.entities.User;
import pgfsd.backend.services.PurchaseService;

import java.util.List;

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
    public PurchaseDto getCart(Authentication authentication)  {
        User user = (User) authentication.getPrincipal();
        return purchaseService.getCartDto(user);
    }

    @GetMapping("/purchase/{purchaseId}")
    public PurchaseDto getPurchase( @Validated @PathVariable Long purchaseId,Authentication authentication)  {
        User user = (User) authentication.getPrincipal();
        return purchaseService.getPurchase(user, purchaseId);
    }

    @GetMapping("/purchases")
    public List<PurchaseDto> getPurchases(Authentication authentication)  {
        User user = (User) authentication.getPrincipal();
        return purchaseService.getPurchasesForUser(user);
    }

    @DeleteMapping("/cart/{productId}")
    public PurchaseDto deleteFromCart(@Validated @PathVariable Long productId, Authentication authentication) throws IllegalAccessException {
        User user = (User) authentication.getPrincipal();
        return purchaseService.deleteFromCart(productId, user);
    }

    @PostMapping("/checkout")
    public ResponseEntity<Object> checkoutCart(@Validated @RequestBody PaymentDto paymentDto, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        purchaseService.checkoutCart(user, paymentDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
