package com.example.keys.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // 1. La Llave Maestra
    private final String SECRET = "MeliKeysSuperSecretKeyParaTokensJWT2026!@#";
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());
    
    // 2. Tiempo de vida del token 10 horas
    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; 

    // 3. Método para FABRICAR el token
    public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email) 
                .claim("role", role) // Guardamos su rol (USER o ADMIN)
                .setIssuedAt(new Date()) // Fecha de creación
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // Fecha de vencimiento
                .signWith(key) // Lo sellamos con nuestra llave maestra
                .compact();
    }

    // 4. Método para EXTRAER el correo del token
    public String getEmailFromToken(String token) {
        return getClaims(token).getSubject();
    }

    // 5. Método para VALIDAR si el token es real y no ha expirado
    public boolean validateToken(String token) {
        try {
            getClaims(token);
            return true;
        } catch (Exception e) {
            return false; // Si está alterado o expirado, falla
        }
    }

    // Método interno para leer el contenido del token
    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String getRoleFromToken(String token) {
        return getClaims(token).get("role", String.class);
    }
}
