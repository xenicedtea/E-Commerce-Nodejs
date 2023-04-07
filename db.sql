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
update `category`
set parentId = 2
where id = 3;
	
    
SELECT p.*
FROM product p
INNER JOIN product_category pc ON p.id = pc.productId
INNER JOIN category c ON pc.categoryId = c.id
WHERE c.id = 2 OR c.parentId = 2;


SELECT p.*
FROM product p
INNER JOIN product_category pc ON p.id = pc.productId
INNER JOIN category c ON pc.categoryId = c.id OR c.parentId = 2
WHERE c.id = 2 OR c.parentId = 2;

use `jamsieshop`;
select * from user;
select * from product;
select * from category;
select * from product_category;

select * from product join product_category;

select * from product_category join category;

insert into `product_category`(productId, categoryId)values 
(6,2),
(7,2),
(8,2);


select * from product;

select * from product
