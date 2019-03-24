-- Inserta un usuario
INSERT INTO usuario (nombre,email,contra) VALUES ("admin","soporte@mylinks.com",MD5("123456"));

-- muestra los registros de la tabla usuarios
SELECT * FROM myLinks.usuario;