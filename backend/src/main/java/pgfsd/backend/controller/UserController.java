package pgfsd.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pgfsd.backend.dto.UserDto;
import pgfsd.backend.dto.UserRegistrationDto;
import pgfsd.backend.entities.User;
import pgfsd.backend.services.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/login")
    public UserDto login(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return new UserDto(user.getUsername(), user.getIsAdmin());
    }

    @GetMapping("/logout")
    public ResponseEntity logout(SecurityContextLogoutHandler securityContextLogoutHandler, HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        securityContextLogoutHandler.logout(request, response, authentication);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/register")
    public UserDto registerUser(@Validated @RequestBody UserRegistrationDto userRegistrationDto) {
        return userService.registerUser(userRegistrationDto);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity handleBadCredentials(Exception e) {
        return ResponseEntity.ok().build();
    }

}
