CREATE SCHEMA `jamsieshop` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
use `jamsieshop`;
drop table user;
CREATE TABLE user (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  `email` VARCHAR(50) Not NULL,
  `password` VARCHAR(255) NOT NULL,
  `admin` TINYINT NOT NULL DEFAULT 0,
  `vendor` tinyint not null default 0,
  `registered_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `update_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uq_email` (`email` ASC)
);

drop table product;
CREATE TABLE `product` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `userId` BIGINT NOT NULL,
  `title` VARCHAR(75) NOT NULL,
  `metaTitle` VARCHAR(100) NULL,
  `slug` VARCHAR(100) NOT NULL,
  `summary` TINYTEXT NULL,
  `type` SMALLINT NOT NULL DEFAULT 0,
  `sku` VARCHAR(100) NOT NULL,
  `price` FLOAT NOT NULL DEFAULT 0,
  `discount` FLOAT NOT NULL DEFAULT 0,
  `quantity` SMALLINT NOT NULL DEFAULT 0,
  `shop` TINYINT NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `publishedAt` DATETIME NULL DEFAULT NULL,
  `startsAt` DATETIME NULL DEFAULT NULL,
  `endsAt` DATETIME NULL DEFAULT NULL,
  `content` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uq_slug` (`slug` ASC),
  INDEX `idx_product_user` (`userId` ASC),
  CONSTRAINT `fk_product_user`
    FOREIGN KEY (`userId`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `category` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `parentId` BIGINT NULL DEFAULT NULL,
  `title` VARCHAR(75) NOT NULL,
  `metaTitle` VARCHAR(100) NULL DEFAULT NULL,
  `slug` VARCHAR(100) NOT NULL,
  `content` TEXT NULL DEFAULT NULL,
  `active` bool default 0,
	INDEX `idx_category_parent` (`parentId` ASC),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_category_parent`
	  FOREIGN KEY (`parentId`)
	  REFERENCES `category` (`id`)
	  ON DELETE NO ACTION
	  ON UPDATE NO ACTION
);
select * from `category`;
alter table `category`
add column `active` bool default 1;

CREATE TABLE `product_category` (
  `productId` BIGINT NOT NULL,
  `categoryId` BIGINT NOT NULL,
  PRIMARY KEY (`productId`, `categoryId`),
  INDEX `idx_pc_category` (`categoryId` ASC),
  INDEX `idx_pc_product` (`productId` ASC),
  CONSTRAINT `fk_pc_product`
    FOREIGN KEY (`productId`)
    REFERENCES `product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pc_category`
    FOREIGN KEY (`categoryId`)
    REFERENCES `category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
drop table `supplier`;
CREATE TABLE `supplier` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `contact_name` VARCHAR(50),
  `email` VARCHAR(50),
  `phone` VARCHAR(20),
  `address` VARCHAR(100),
  `city` VARCHAR(50),
  `state` VARCHAR(50),
  `zip_code` VARCHAR(10),
  `country` VARCHAR(50),
  `active` bool not null default 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uq_email` (`email` ASC)
);

select * from supplier;

drop table `inbound_orders`;
CREATE TABLE `inbound_orders` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`supplierId` BIGINT NOT NULL,
	`total` FLOAT NOT NULL DEFAULT 0,
	`status` TINYINT NOT NULL DEFAULT 0,
	`createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`),
	INDEX `idx_inbound_order_supplier` (`supplierId` ASC),
	CONSTRAINT `fk_inbound_order_supplier`
		FOREIGN KEY (`supplierId`)
		REFERENCES `supplier` (`id`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
);

drop table `inbound_order_items`;
CREATE TABLE `inbound_order_items` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `orderId` BIGINT NOT NULL,
  `productId` BIGINT NOT NULL,
  `quantity` SMALLINT NOT NULL DEFAULT 0,
  `unitPrice` FLOAT NOT NULL DEFAULT 0,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_inbound_order_item_order` (`orderId` ASC),
  INDEX `idx_inbound_order_item_product` (`productId` ASC),
  CONSTRAINT `fk_inbound_order_item_order`
    FOREIGN KEY (`orderId`)
    REFERENCES `inbound_orders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_inbounde_order_item_product`
    FOREIGN KEY (`productId`)
    REFERENCES `product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

use `jamsieshop`;
select * from user;
select * from product;
select * from category;
select * from product_category;
select * from suppliers;


