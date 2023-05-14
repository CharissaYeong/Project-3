CREATE USER 'foo'@'%' IDENTIFIED WITH mysql_native_password BY 'bar';
GRANT ALL PRIVILEGES on *.* to 'foo'@'%';
FLUSH PRIVILEGES;

CREATE DATABASE bakery;

INSERT INTO products (name, description, base_price, stock, last_edit) VALUES
("Test_2", "Test product 2", 3000, 0, "admin_2"),
("Test_3", "Test product 3", 4000, 1, "admin_3")

INSERT INTO categories (name) VALUES
("Bento Cakes"),
("Design Cakes"),
("Standard Cakes")
