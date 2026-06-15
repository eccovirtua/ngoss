package com.example.keys.repository;

import com.example.keys.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    
    // Busca todas las órdenes que pertenezcan a un ID de usuario específico
    List<Order> findByUserId(Long userId);
}