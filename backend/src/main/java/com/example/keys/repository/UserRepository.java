package com.example.keys.repository;

import com.example.keys.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    
    // Spring Boot genera automáticamente la consulta SQL por debajo gracias al nombre del método
    Optional<User> findByUsername(String username);
}
