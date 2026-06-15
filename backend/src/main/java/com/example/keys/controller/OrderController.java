package com.example.keys.controller;

import com.example.keys.model.Order;
import com.example.keys.model.OrderItem;
import com.example.keys.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Recibe la petición de compra desde el carrito de React
    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest request) {
        try {
            Order order = orderService.createOrder(request.getUserId(), request.getGameIds());
            return ResponseEntity.ok(order);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Obtiene el historial de órdenes de un usuario específico
    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable Long userId) {
        return orderService.getOrdersByUser(userId);
    }

    // Obtiene las Keys y detalles de una orden específica
    @GetMapping("/{orderId}/items")
    public List<OrderItem> getOrderDetails(@PathVariable Long orderId) {
        return orderService.getOrderDetails(orderId);
    }
}

// Clase auxiliar (DTO) para recibir el carrito en formato JSON
class OrderRequest {
    private Long userId;
    private List<Long> gameIds;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public List<Long> getGameIds() { return gameIds; }
    public void setGameIds(List<Long> gameIds) { this.gameIds = gameIds; }
}