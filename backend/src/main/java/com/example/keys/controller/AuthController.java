package com.example.keys.controller;


import com.example.keys.security.JwtUtil;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;
import com.example.keys.model.User;
import com.example.keys.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {


    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        
        // 1. Validar si el correo ya existe en la base de datos
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Este correo ya está registrado en la tienda.");
        }

        // 2. Tomamos la contraseña en texto plano y la ENCRIPTAMOS
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);

        // 3. Asignamos el rol
        if (user.getEmail().equals("drekgx@gmail.com")) {
            user.setRole("ADMIN");
        } else {
            user.setRole("USER");
        }

        // 4. Guardamos al usuario de forma segura
        userRepository.save(user);
        
        return ResponseEntity.ok("Usuario registrado con éxito");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        
        // 1. Buscamos si existe un usuario con ese correo
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if (userOptional.isEmpty()) {
            // Retornamos 401 Unauthorized si el correo no existe
            return ResponseEntity.status(401).body("Error: Correo no encontrado.");
        }

        User user = userOptional.get();


        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body("Error: Contraseña incorrecta.");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("userId", user.getId());
        response.put("role", user.getRole());
        response.put("name", user.getName());
        response.put("message", "Login exitoso");

        return ResponseEntity.ok(response);
    }
}
