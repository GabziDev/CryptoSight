CREATE DATABASE IF NOT EXISTS CryptoSight CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE CryptoSight;

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,         
    username VARCHAR(10) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    crypto_id VARCHAR(100) NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);