package pgfsd.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pgfsd.backend.dto.UserDto;
import pgfsd.backend.dto.UserRegistrationDto;
import pgfsd.backend.entities.User;
import pgfsd.backend.repositories.UserRepository;

import java.util.List;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;


    public List<User> getAllUsers(String username) {
        if (username == null || username.equals("")) {
            return userRepository.findAll();
        }
        return userRepository.findAllByUsernameContainingIgnoreCase(username);
    }

    @Transactional
    public UserDto registerUser(UserRegistrationDto userRegistrationDto) {
        User existingUser = userRepository.findUserByUsername(userRegistrationDto.getUsername());
        if (existingUser != null) {
            return null;
        }
        User user = new User();
        user.setUsername(userRegistrationDto.getUsername());
        user.setPassword(userRegistrationDto.getPassword());
        user.setIsAdmin(false);
        User savedUser = userRepository.save(user);
        return new UserDto(savedUser.getUsername(), savedUser.getIsAdmin());
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        return user;
    }

}
