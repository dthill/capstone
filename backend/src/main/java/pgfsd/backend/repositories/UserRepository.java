package pgfsd.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pgfsd.backend.entities.User;


import java.util.List;
import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findAll();

    List<User> findAllByUsernameContainingIgnoreCase(String username);

    User findUserById(Long id);

    User findUserByIdAndPassword(Long id, String password);

    User findUserByUsername(String username);


    User save(User user);
}