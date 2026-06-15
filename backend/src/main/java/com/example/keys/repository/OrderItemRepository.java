package com.example.keys.repository;

import com.example.keys.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    
    // Recupera todos los detalles/keys de un pedido en específico
    List<OrderItem> findByOrderId(Long orderId);
}
