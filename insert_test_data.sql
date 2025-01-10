# Insert data into the tables

USE detect;

INSERT INTO users (username, hashed_password, email) 
VALUES  ('johndoe13', '$2b$10$EXAMPLEHASHEDPASSWORD', 'johndoe@test.com'),
        ('starana!','&33b4hb%SECONDEXAMPLE&35dh£', 'anasinclair3@test.com');