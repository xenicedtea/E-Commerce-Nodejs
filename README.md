# db first sequelizerc (automatically generate models)
sequelize-auto -h <host> -d <database> -u <user> -x [password] -p [port]  --dialect [dialect] -c [/path/to/config] -o [/path/to/models]
EX: sequelize-auto -o "./src/db/models" -d jamsieshop -h localhost -u root -p 3306 -x password -e mysql
