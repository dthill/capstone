package pgfsd.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/login")
    public UserDto login(Authentication authentication) {
        logger.info("controller: /login ");
        if (authentication == null) {
            return null;
        }
        User user = (User) authentication.getPrincipal();
        return new UserDto(user.getUsername(), user.getIsAdmin());
    }

    @GetMapping("/logout")
    public ResponseEntity logout(SecurityContextLogoutHandler securityContextLogoutHandler, HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        logger.info("controller: /logout");
        securityContextLogoutHandler.logout(request, response, authentication);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/register")
    public UserDto registerUser(@Validated @RequestBody UserRegistrationDto userRegistrationDto) {
        logger.info("controller: /register params: " + userRegistrationDto.toString());
        return userService.registerUser(userRegistrationDto);
    }

    @GetMapping("/users/{email}")
    public List<UserDto> users(@PathVariable String email) {
        logger.info("controller: /users ");
        return userService.getAllUsers(email);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ResponseStatus> handleBadCredentials(Exception e) {
        logger.info("badCredentialsException handler called exception:"+e.toString());
        return ResponseEntity.ok().build();
    }

}
