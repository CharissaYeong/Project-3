CREATE USER 'foo'@'%' IDENTIFIED WITH mysql_native_password BY 'bar';
GRANT ALL PRIVILEGES on *.* to 'foo'@'%';
FLUSH PRIVILEGES;

CREATE DATABASE bakery;

INSERT INTO product (name, description, base_price, stock, last_edit) VALUES
("Test_2", "Test product 2", 3000, 0, "admin_2"),
("Test_3", "Test product 3", 4000, 1, "admin_3")



    -- id: { type: 'int', primaryKey:true, autoIncrement:true, unsigned: true},
    -- name: { type: 'string', length:100, notNull:true },
    -- description: 'text',
    -- base_price: { type: 'string', unsigned: true, notNull:true },
    -- option_price: 'string',
    -- stock: { type: 'int', unsigned: true, notNull:true },
    -- created: { type: 'timestamp', defaultValue: new String('CURRENT_TIMESTAMP') },
    -- modified: { type: 'timestamp', defaultValue: new String('CURRENT_TIMESTAMP') },
    -- last_edit: 'string'