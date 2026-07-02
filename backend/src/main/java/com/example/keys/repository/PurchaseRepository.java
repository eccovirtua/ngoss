package com.example.keys.repository;

import com.example.keys.model.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    // Magia de Spring: Busca todas las compras de un usuario específico
    List<Purchase> findByUserIdOrderByPurchaseDateDesc(Long userId);
}