CREATE USER 'foo'@'%' IDENTIFIED WITH mysql_native_password BY 'bar';
GRANT ALL PRIVILEGES on *.* to 'foo'@'%';
FLUSH PRIVILEGES;

CREATE DATABASE bakery;

INSERT INTO (name, base_price, description, stock) VALUES
("")
