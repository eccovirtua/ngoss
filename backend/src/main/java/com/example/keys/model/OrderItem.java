package com.example.keys.model;

import jakarta.persistence.*;

@Entity
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relación: Muchas líneas pertenecen a un solo pedido
    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    // Relación: Cada línea está vinculada a un juego
    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;

    private String generatedKey; // El código del juego (ej: STEAM-XXXX)
    private Double price; // Precio al que se compró (por si cambia en el catálogo)

    // Constructores
    public OrderItem() {}

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }
    public Game getGame() { return game; }
    public void setGame(Game game) { this.game = game; }
    public String getGeneratedKey() { return generatedKey; }
    public void setGeneratedKey(String generatedKey) { this.generatedKey = generatedKey; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
}