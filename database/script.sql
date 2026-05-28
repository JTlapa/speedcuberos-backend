-- Tabla 1: RolUsuario
CREATE TABLE RolUsuario (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla 2: Competidor
CREATE TABLE Competidor (
    id_competidor INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(150) NOT NULL,
    edad INT NOT NULL,
    pais VARCHAR(100) NOT NULL,
    red_social VARCHAR(150)
);

-- Tabla 3: Usuario
CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    id_competidor INT NULL, 
    id_rol INT NOT NULL,
    nombre_completo VARCHAR(150) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, 
    FOREIGN KEY (id_competidor) REFERENCES Competidor(id_competidor) ON DELETE SET NULL,
    FOREIGN KEY (id_rol) REFERENCES RolUsuario(id_rol) ON DELETE RESTRICT
);

-- Tabla 4: CategoriaCubo
CREATE TABLE CategoriaCubo (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY, 
    nombre_cubo VARCHAR(50) NOT NULL,
    descripcion TEXT
);

-- Tabla 5: Record
CREATE TABLE Record (
    id_record INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT NOT NULL,
    id_competidor INT NOT NULL,
    tiempo_segundos DECIMAL(5,2) NOT NULL,
    fecha DATE NOT NULL,
    nombre_competencia VARCHAR(150) NOT NULL,
    lugar_competencia VARCHAR(150) NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES CategoriaCubo(id_categoria) ON DELETE CASCADE,
    FOREIGN KEY (id_competidor) REFERENCES Competidor(id_competidor) ON DELETE CASCADE
);

-- Valores iniciales por defecto
INSERT INTO RolUsuario (nombre_rol) VALUES ('admin'), ('user');

INSERT INTO CategoriaCubo (nombre_cubo, descripcion) VALUES 
('3x3x3', 'El clásico y original cubo de Rubik 3x3.'),
('4x4x4', 'La venganza de Rubik, un cubo que añade paridades en su resolución.'),
('Megaminx', 'Dodecaedro regular de 12 caras con 50 piezas móviles.');

INSERT INTO Usuario (id_competidor, id_rol, nombre_completo, correo, password)
VALUES (
    NULL, 
    1, 
    'Alan Mathison Turing', 
    'turing@gmail.com', 
    '$2a$12$X1ElzuQwis8N7bUUI1uG6uLT9LbTjSrxEkKmvD0H9qSPFAfZrLouC'
);

INSERT INTO Competidor (nombre_completo, edad, pais, red_social)
VALUES (
    'Jesus Tlapa Hernandez', 
    22, 
    'Mexico', 
    'www.facebook.com/jesustlapa'
);

INSERT INTO Usuario (id_competidor, id_rol, nombre_completo, correo, password)
VALUES (
    LAST_INSERT_ID(),
    2, 
    'Jesus Tlapa Hernandez', 
    'jesus.tlapa11@gmail.com', 
    '$2a$12$X1ElzuQwis8N7bUUI1uG6uLT9LbTjSrxEkKmvD0H9qSPFAfZrLouC'
);

INSERT INTO Competidor (id_competidor, nombre_completo, edad, pais, red_social)
VALUES (2, 'Max Park', 24, 'USA', 'instagram.com/maxfast23');

INSERT INTO Competidor (id_competidor, nombre_completo, edad, pais, red_social)
VALUES (3, 'Yiheng Wang', 12, 'China', 'youtube.com/yihengwang');

INSERT INTO Competidor (id_competidor, nombre_completo, edad, pais, red_social)
VALUES (4, 'Luke Garrett', 21, 'USA', 'twitter.com/lukeguber');

INSERT INTO Record (id_categoria, id_competidor, tiempo_segundos, fecha, nombre_competencia, lugar_competencia)
VALUES (1, 1, 10.00, '2026-05-26', 'Veracruz Rubik Masters 2026', 'Xalapa, México');


-- Récords competidor 1 
INSERT INTO Record (id_categoria, id_competidor, tiempo_segundos, fecha, nombre_competencia, lugar_competencia)
VALUES (1, 2, 3.13, '2023-06-11', 'Pride in Long Beach 2023', 'California, USA');
INSERT INTO Record (id_categoria, id_competidor, tiempo_segundos, fecha, nombre_competencia, lugar_competencia)
VALUES (2, 2, 15.71, '2024-03-16', 'Colorado Speedcubing 2024', 'Colorado, USA');
INSERT INTO Record (id_categoria, id_competidor, tiempo_segundos, fecha, nombre_competencia, lugar_competencia)
VALUES (3, 2, 29.34, '2025-07-19', 'World Cube Championship 2025', 'Seúl, Corea del Sur');


-- Récords competidor 2
INSERT INTO Record (id_categoria, id_competidor, tiempo_segundos, fecha, nombre_competencia, lugar_competencia)
VALUES (1, 3, 4.36, '2024-09-22', 'Asian Championship 2024', 'Bangkok, Tailandia');
INSERT INTO Record (id_categoria, id_competidor, tiempo_segundos, fecha, nombre_competencia, lugar_competencia)
VALUES (2, 3, 19.85, '2025-11-02', 'China Championship 2025', 'Beijing, China');
INSERT INTO Record (id_categoria, id_competidor, tiempo_segundos, fecha, nombre_competencia, lugar_competencia)
VALUES (3, 3, 33.12, '2026-02-14', 'Singapore Open 2026', 'Singapur');

-- Récords competidor 3
INSERT INTO Record (id_categoria, id_competidor, tiempo_segundos, fecha, nombre_competencia, lugar_competencia)
VALUES (1, 4, 4.51, '2024-05-18', 'Rubiks UK Championship 2024', 'Londres, UK');
INSERT INTO Record (id_categoria, id_competidor, tiempo_segundos, fecha, nombre_competencia, lugar_competencia)
VALUES (2, 4, 21.40, '2025-04-05', 'East Coast Spring 2025', 'Nueva York, USA');
INSERT INTO Record (id_categoria, id_competidor, tiempo_segundos, fecha, nombre_competencia, lugar_competencia)
VALUES (3, 4, 35.88, '2025-10-12', 'US Nationals 2025', 'Las Vegas, USA');