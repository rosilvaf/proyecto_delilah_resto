# Proyecto_delilah_resto
API created using Node.js y MySQL

## General Info
Create a restaurant's CRUD
## Tecnology
Project is created with:
* Node.js
* MySQL
## Setup
To clone and run this project, install it locally using npm:
Clone this repository
```
git clone https://github.com/rosilvaf/proyecto_delilah_resto.git
```
```

$ npm install
$ node index.js
```

Establish a connection with sequelize in is this:
(this is in the sequelize.js)
```
const database= "delilah";
const user ="root";
const host ="localhost";
const password="";
const port ="";

const sequelize = new Sequelize (`mysql://${user}:${password}@${host}:${port}/${database}`);

sequelize.authenticate().then(() => {
    console.log('Connection established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);})


```
When establishing a connection, you can set the following options:

* host: The hostname of the database you are connecting to. (Default: localhost)
* port: The port number to connect to. (Default: 3306)
* user: The MySQL user to authenticate as.
* password: The password of that MySQL user.
* database: Name of the database to use for this connection (Optional).
## Create Database in PHPADMIN
```
CREATE DATABASE `deliah`
CREATE TABLE `delilah`.`orders` ( `id` INT NOT NULL AUTO_INCREMENT ,  `product_id` INT NOT NULL ,  `user_id` INT NOT NULL ,  `status_id` INT NOT NULL ,  `created_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,  `payments_method` VARCHAR(255) NOT NULL ,  `total` INT NOT NULL ,`quantity` INT NOT NULL ,   PRIMARY KEY  (`id`))
CREATE TABLE `delilah`.`details` ( `id` INT NOT NULL AUTO_INCREMENT ,  `order_id` INT NOT NULL ,  `product_id` INT NOT NULL ,  `quantity` INT NOT NULL ,   `subtotal` INT NOT NULL ,  PRIMARY KEY  (`id`))
CREATE TABLE `delilah`.`user_roles` ( `id` INT NOT NULL , `name` VARCHAR(255) NOT NULL ) 
CREATE TABLE `delilah`.`users` ( `id` INT NOT NULL AUTO_INCREMENT , `full_name` VARCHAR(255) NOT NULL , `password` VARCHAR(255) NOT NULL , `address` VARCHAR(255) NOT NULL , `phone` VARCHAR(255) NOT NULL , `email` VARCHAR(255) NOT NULL , `username` VARCHAR(255) NOT NULL , `role_id` INT NOT NULL , PRIMARY KEY (`id`), UNIQUE (`username`), UNIQUE (`email`), UNIQUE (`role_id`))
CREATE TABLE `delilah`.`products` ( `id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `price` FLOAT NOT NULL , `price_descount` FLOAT NOT NULL , `description` VARCHAR(255) NOT NULL , `picture` VARCHAR(255) NOT NULL , `active` TINYINT NOT NULL , PRIMARY KEY (`id`)) 

INSERT INTO `user_roles` (`id`, `name`) VALUES ('1', 'administrator'), ('2', 'user');
```
## Folders with endpoints
| FOLDERS | Description |
| --- | --- |
| `products` | Show the files with products' endpoints |
| `auth` | Show the files with users' endpoints |
| `orders` | Show the files with orders' endpoints |

