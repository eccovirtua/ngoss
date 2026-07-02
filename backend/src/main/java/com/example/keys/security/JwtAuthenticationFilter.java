package com.example.keys.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        
        String authHeader = request.getHeader("Authorization");

        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            
            // Le quitamos la palabra "Bearer " para quedarnos solo con el código largo
            String token = authHeader.substring(7);

            
            if (jwtUtil.validateToken(token)) {
                
                // Extraemos quién es y qué rol tiene
                String email = jwtUtil.getEmailFromToken(token);
                String role = jwtUtil.getRoleFromToken(token);

                // Spring Security exige que los roles lleven "ROLE_" por delante
                SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role);

                UsernamePasswordAuthenticationToken authToken = 
                        new UsernamePasswordAuthenticationToken(email, null, Collections.singletonList(authority));

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // 5. Continúa con el flujo normal (si no traía token, seguirá como usuario anónimo)
        filterChain.doFilter(request, response);
    }
}