package com.example.keys.service;

import com.example.keys.model.Game;
import com.example.keys.model.Order;
import com.example.keys.model.OrderItem;
import com.example.keys.model.User;
import com.example.keys.repository.GameRepository;
import com.example.keys.repository.OrderItemRepository;
import com.example.keys.repository.OrderRepository;
import com.example.keys.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Order createOrder(Long userId, List<Long> gameIds) {
        // 1. Buscar al usuario
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // 2. Crear la cabecera de la orden
        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setTotal(0.0);
        
        // Guardamos la orden primero para obtener su ID en la base de datos
        Order savedOrder = orderRepository.save(order);

        double totalAmount = 0.0;

        // 3. Procesar cada juego del carrito
        for (Long gameId : gameIds) {
            Game game = gameRepository.findById(gameId)
                    .orElseThrow(() -> new RuntimeException("Juego no encontrado"));

            if (game.getStock() <= 0) {
                throw new RuntimeException("No hay stock para el juego: " + game.getTitle());
            }

            // Restar stock
            game.setStock(game.getStock() - 1);
            gameRepository.save(game); // Actualizamos el stock en la base de datos

            // Sumar al total
            totalAmount += game.getPrice();

            // Generar la Key (Formato ej: STEAM-A1B2C3D4)
            String platformPrefix = game.getPlatform().toUpperCase() + "-";
            String randomCode = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
            String generatedKey = platformPrefix + randomCode;

            // Crear el detalle de la orden con la Key
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setGame(game);
            orderItem.setPrice(game.getPrice());
            orderItem.setGeneratedKey(generatedKey);

            orderItemRepository.save(orderItem);
        }

        // 4. Actualizar el total de la orden y guardar
        savedOrder.setTotal(totalAmount);
        return orderRepository.save(savedOrder);
    }

    public List<Order> getOrdersByUser(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public List<OrderItem> getOrderDetails(Long orderId) {
        return orderItemRepository.findByOrderId(orderId);
    }
}