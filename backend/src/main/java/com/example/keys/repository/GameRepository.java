package com.example.keys.repository;

import com.example.keys.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;


public interface GameRepository extends JpaRepository<Game, Long> {
    // Ya incluye buscar todos, buscar por ID, guardar y borrar por defecto.
}
