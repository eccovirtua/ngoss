package com.example.keys.service;

import com.example.keys.model.User;
import com.example.keys.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public User login(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // En un proyecto real, aquí desencriptarías la contraseña.
            // Para mantenerlo simple, comparamos el texto plano.
            if (user.getPassword().equals(password)) {
                return user;
            }
        }
        throw new RuntimeException("Usuario o contraseña incorrectos");
    }
}
