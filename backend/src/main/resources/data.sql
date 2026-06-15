-- Crear usuario de prueba
INSERT INTO users (username, password) VALUES ('gamer123', 'password123');

-- Crear catálogo de juegos
INSERT INTO game (title, platform, price, stock, image_url) VALUES ('Elden Ring', 'Steam', 59.99, 10, 'https://ejemplo.com/elden.jpg');
INSERT INTO game (title, platform, price, stock, image_url) VALUES ('Cyberpunk 2077', 'GOG', 29.99, 5, 'https://ejemplo.com/cyber.jpg');
INSERT INTO game (title, platform, price, stock, image_url) VALUES ('Minecraft', 'Xbox', 19.99, 50, 'https://ejemplo.com/mine.jpg');