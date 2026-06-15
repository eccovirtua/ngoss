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
    
    // Guardar un nuevo juego en el catálogo
    @PostMapping
    public Game createGame(@RequestBody Game game) {
    return gameService.saveGame(game);
    }

    // Eliminar un juego del catálogo
    @DeleteMapping("/{id}")
    public void deleteGame(@PathVariable Long id) {
    gameService.deleteGame(id);
    }
}