package com.example.keys.config;

import com.example.keys.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Desactivamos esto porque usaremos JWT
            
            // Le decimos a Spring que no guarde sesiones, todo dependerá del Token
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) 
            .headers(headers -> headers.frameOptions(frame -> frame.disable()))
            // 2. CONFIGURAMOS LAS PUERTAS (Las Reglas)
            .authorizeHttpRequests(auth -> auth
                
                // PUERTAS PÚBLICAS (Login, Registro y ver el catálogo)
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/games").permitAll()
                .requestMatchers("/h2-console/**").permitAll()
                                
                // PUERTAS VIP PARA EL ADMIN (Crear, editar o borrar juegos)
                .requestMatchers(HttpMethod.GET, "/api/games/**").permitAll() // Permitir GET para ver detalles de juegos

                .requestMatchers(HttpMethod.POST, "/api/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/games/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/games/**").hasRole("ADMIN")
                .requestMatchers("/admin/**").hasRole("ADMIN")
                // CUALQUIER OTRA PUERTA (Ej. Comprar, ver historial) requiere Token válido
                .anyRequest().authenticated()
            );
        
        // 3. Ponemos al cadenero en la puerta principal antes de que la petición entre
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
}