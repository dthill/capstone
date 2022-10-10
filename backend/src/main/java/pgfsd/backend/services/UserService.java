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
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDto> getAllUsers(String username) {
        List<User> users;
        if (username == null || username.equals("")) {
            users =  userRepository.findAll();
        } else {
            users = userRepository.findAllByUsernameContainingIgnoreCase(username);
        }
        return users
                .stream()
                .map(user -> new UserDto(user.getUsername(), user.getIsAdmin()))
                .collect(Collectors.toList());
    }

    @Transactional
    public UserDto registerUser(UserRegistrationDto userRegistrationDto) {
        User existingUser = userRepository.findUserByUsername(userRegistrationDto.getEmail());
        if (existingUser != null) {
            return null;
        }
        User user = new User();
        user.setUsername(userRegistrationDto.getEmail());
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
