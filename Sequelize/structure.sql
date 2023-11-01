CREATE SCHEMA picatso;
USE picatso;

CREATE TABLE roles(
	id INT(2) AUTO_INCREMENT,
    description VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE users(
	id BIGINT AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL,
    name VARCHAR(30) NOT NULL,
    surname VARCHAR(30) NOT NULL,
    email VARCHAR(45) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    birthday DATE NOT NULL,
    avatar VARCHAR(100) NOT NULL,
    rol_id INT(2) NOT NULL,
    active TINYINT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(rol_id) REFERENCES roles(id)
);

CREATE TABLE lifestages(
	id BIGINT AUTO_INCREMENT,
    stagename VARCHAR(30) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE brands(
	id BIGINT AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    country VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE categories(
	id BIGINT AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE products(
	id BIGINT AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description TEXT,
	price DOUBLE(8,2) NOT NULL,
    discount INT DEFAULT 0,
    image VARCHAR(100) NOT NULL,
    brand_id BIGINT,
    lifestage_id BIGINT,
    stock INT(5) DEFAULT 0,
    PRIMARY KEY(id),
    FOREIGN KEY(brand_id) REFERENCES brands(id),
    FOREIGN KEY(lifestage_id) REFERENCES lifestages(id)
);

CREATE TABLE product_category(
	product_id BIGINT,
    category_id BIGINT,
    PRIMARY KEY(product_id, category_id),
    FOREIGN KEY(product_id) REFERENCES products(id),
    FOREIGN KEY(category_id) REFERENCES categories(id)
);

CREATE TABLE invoices(
	id BIGINT AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    date_purchase DATE NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE item_invoices(
	id BIGINT AUTO_INCREMENT,
    invoice_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    unit_price DOUBLE(6,2) NOT NULL,
    quantity INT(2) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(invoice_id) REFERENCES invoices(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
);