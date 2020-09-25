const Sequelize = require('sequelize');

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

module.exports=
    sequelize

