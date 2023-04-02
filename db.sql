CREATE SCHEMA `jamsieshop` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
use `jamsieshop`;
drop table user;
CREATE TABLE user (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  `email` VARCHAR(50) Not NULL,
  `password` VARCHAR(32) NOT NULL,
  `admin` TINYINT NOT NULL DEFAULT 0,
  `accessToken` varchar(255) default null,
  `refressToken` varchar(255) default null,
  `registered_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `update_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uq_email` (`email` ASC)
)

select * from user;


INSERT INTO `user` (`id`,`name`,`email`,`password`,`registered_at`,`update_at`) VALUES (DEFAULT,"Lê Văn Đạt","lvd.levandat@gmail.com","sdfsfdsdfsdfavsdfgsdfgsdfsdfg",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)