package com.example.keys.controller;

import com.example.keys.model.Game;
import com.example.keys.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
@CrossOrigin(origins = "*")
public class GameController {

    @Autowired
    private GameService gameService;

    // Obtener todos los juegos para la vitrina principal de React
    @GetMapping
    public List<Game> getAllGames() {
        return gameService.getAllGames();
    }

    // Obtener un solo juego por si quieres hacer una vista de "Detalles del producto"
    @GetMapping("/{id}")
    public Game getGameById(@PathVariable Long id) {
        return gameService.getGameById(id);
    }
}