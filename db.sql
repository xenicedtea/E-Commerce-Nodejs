CREATE SCHEMA `shop_test` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
use shop_test;
-- drop table user;
create table user(
	`id` bigint not null auto_increment,
    `name` varchar(25) default null,
    `createdAt` timestamp default current_timestamp,
	`updatedAt` timestamp,
    primary key(`id`)
);

insert into `user` (name)
value("Le Van Dat");

update `user` set name = "Le Van Dat" where id=1;

select * from user