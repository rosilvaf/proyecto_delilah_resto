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
git clone
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
## Foldets with endpoints
| FOLDERS | Description |
| --- | --- |
| `products` | Show the files with products' endpoints |
| `auth` | Show the files with users' endpoints |
| `orders` | Show the files with orders' endpoints |
## Routes
| Routes | Metod | Descripción |
| --- | --- | --- |
| `products/` | get | Show the  products |
| `products/` | post | Add the  products |
| `products/:id` | put | Change a previous product |
| `products/:id` | Delete | Delete a product |
| `auth/users` | get | Show the  users |
| `auth/login` | post | Add the users |
| `auth/users/:id` | put | Change a previous user |
| `auth/users/:id` | Delete | Delete a user |
| `orders/` | get | Show the orders |
| `orders/` | post | Add the  orders |
| `orders/:id` | put | Change a previous order |
| `orders/:id` | Delete | Delete the  products |
