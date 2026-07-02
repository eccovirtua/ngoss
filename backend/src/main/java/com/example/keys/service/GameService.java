package com.example.keys.service;

import com.example.keys.model.*;
import com.example.keys.repository.PurchaseRepository;
import java.time.LocalDateTime;
import com.example.keys.model.Game;
import com.example.keys.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private PurchaseRepository purchaseRepository;

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }
    public Game saveGame(Game game) {
    return gameRepository.save(game);
    }

    public void deleteGame(Long id) {
    gameRepository.deleteById(id);
    }

    public Game getGameById(Long id) {
        return gameRepository.findById(id).orElse(null);
    }

    // Método para procesar la compra
    @org.springframework.transaction.annotation.Transactional
public List<Purchase> processCheckout(List<Map<String, Object>> cartItems, Long userId) {
    List<Purchase> purchasedKeys = new ArrayList<>();

    for (Map<String, Object> item : cartItems) {
        Long gameId = Long.valueOf(item.get("id").toString());
        int quantity = Integer.parseInt(item.get("quantity").toString());

        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Juego no encontrado"));

        if (game.getStock() < quantity) {
            throw new RuntimeException("Stock insuficiente para: " + game.getTitle());
        }

        game.setStock(game.getStock() - quantity);
        gameRepository.save(game);

        // Generar y GUARDAR en base de datos
        for (int i = 0; i < quantity; i++) {
            Purchase purchase = new Purchase();
            purchase.setUserId(userId);
            purchase.setGameTitle(game.getTitle());
            purchase.setImageUrl(game.getImageUrl());
            purchase.setKey(generateRandomKey());
            purchase.setPurchaseDate(LocalDateTime.now());
            
            purchaseRepository.save(purchase); // Guardado físico en H2
            purchasedKeys.add(purchase);
        }
    }
    return purchasedKeys;
}


    public List<Purchase> getUserPurchases(Long userId) {
    return purchaseRepository.findByUserIdOrderByPurchaseDateDesc(userId);
}

    // Generador de Keys formato XXXX-XXXX-XXXX
    private String generateRandomKey() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random rnd = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 4; j++) {
                sb.append(chars.charAt(rnd.nextInt(chars.length())));
            }
            if (i < 2) sb.append("-");
        }
        return sb.toString();
    }
}