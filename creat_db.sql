# Create database script for fraud detection system

# Create the database
CREATE DATABASE IF NOT EXISTS detect;
USE detect;

# Create the app user
CREATE USER IF NOT EXISTS 'app_user'@'localhost' IDENTIFIED BY 'qwerty'; 
GRANT ALL PRIVILEGES ON detect.* TO ' app_user'@'localhost';

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
