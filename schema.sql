DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;
USE bamazon_db;

CREATE TABLE products (
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50),
department_name VARCHAR(50),
price INT,
stock_quantity INT,
PRIMARY KEY(item_id)
);