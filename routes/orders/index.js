const express = require("express")
const app = express();

const sequelize = require("../../sequelize");
const authMiddleware = require("../../middleware/auth");
const adminMiddleware = require("../../middleware/auth_adm");

//ORDERS
app.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  const data = await sequelize.query(
    `SELECT * FROM orders`,
    { type: sequelize.QueryTypes.SELECT }
  );
  res.send(data);
});
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.post('/', authMiddleware, async (req, res) => {

  const foods = req.body;
  res.locals.foods = foods;
  console.log(foods)
  if(Array.isArray(foods)) {
    console.log("user asks several dishes");
    for (var i in foods) {
      console.log(foods[i])
      const keys = Object.values(foods[i])
      const keys_user = keys[1];
      const keys_product = keys[0];
      const keys_status = keys[2];
      const keys_pay = keys[3];
      const keys_quantity = keys[4];
      try{
      const price =  await sequelize.query(
        `SELECT price FROM products WHERE products.id='${keys_product}'`,
         { type: sequelize.QueryTypes.SELECT })
        
         const key_price=price[0]
         const priceKey = Object.values(key_price)
        const price_product=priceKey[0]
        console.log(price_product) 
        console.log(keys_user)    
        const product = [
          product_id = keys_product,
          user_id = keys_user,
          status_id = keys_status,
          payments_method = keys_pay,
          quantity = keys_quantity,
          price_p=price_product
        ]
        console.log(product)  
       const order = await sequelize.query(
          `INSERT INTO orders (product_id, user_id, status_id, payments_method, quantity , total)
     VALUES(?,?,?,?,?,?)`,
          { replacements:product })
        const orderId = await sequelize.query(`SELECT MAX(ID) FROM orders LIMIT 1`,
          { type: sequelize.QueryTypes.SELECT })
        
        const arrayOrderID = orderId[0]
        const newOrder = Object.values(arrayOrderID)
        console.log(newOrder)
     await sequelize.query(`
   INSERT INTO details (order_id, product_id, quantity,subtotal)
   VALUES(?,?,?,?)`,
          { replacements: [newOrder, product[0], product[4],product[5] ] }
        );
  
        const multiplicar = (x, y) => x * y;
  
        const valor = await multiplicar(product[4], product[5]);
        console.log(valor);
  
        const newtotal = await sequelize.query(`
  UPDATE orders
  SET total = ? `,
          { replacements: [valor] })
  
        } catch (err) {
          console.log(err)
        }
  }
  } else {
    console.log(" user just asks a dish");
    const key = Object.values(foods)
    const keys_user = key[1];
    const keys_product = key[0];
    const keys_status = key[2];
    const keys_pay = key[3];
    const keys_quantity = key[4];
    console.log(keys_user)
    try{
    const price =  await sequelize.query(
      `SELECT price FROM products WHERE products.id='${keys_product}'`,
       { type: sequelize.QueryTypes.SELECT })
      
       const key_price=price[0]
       const priceKey = Object.values(key_price)
      const price_product=priceKey[0]
      console.log(price_product) 
      console.log(keys_user)    
      const product = [
        product_id = keys_product,
        user_id = keys_user,
        status_id = keys_status,
        payments_method = keys_pay,
        quantity = keys_quantity,
        price_p=price_product
      ]
      console.log(product)  
      const order = await sequelize.query(
         `INSERT INTO orders (product_id, user_id, status_id, payments_method, quantity , total)
    VALUES(?,?,?,?,?,?)`,
         { replacements:product })
       const orderId = await sequelize.query(`SELECT MAX(ID) FROM orders LIMIT 1`,
         { type: sequelize.QueryTypes.SELECT })
       
       const arrayOrderID = orderId[0]
       const newOrder = Object.values(arrayOrderID)
       console.log(newOrder)
    await sequelize.query(`
  INSERT INTO details (order_id, product_id, quantity,subtotal)
  VALUES(?,?,?,?)`,
         { replacements: [newOrder, product[0], product[4],product[5] ] }
       );
  
       const multiplicar = (x, y) => x * y;
  
       const valor = await multiplicar(product[4], product[5]);
       console.log(valor);
  
       const newtotal = await sequelize.query(`
  UPDATE orders
  SET total = ? `,
         { replacements: [valor] })
  
       } catch (err) {
         console.log(err)
       }
  }
  res.sendStatus(200);
  
  });
  

app.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { product_id, user_id, status_id, payments_method } = req.body;
  try {
    await sequelize.query(
      `UPDATE orders SET 
       product_id=?,
         user_id = ?,
          status_id= ?,
          payments_method=?
        WHERE id = ${req.params.id}

       `,
      { replacements: [product_id, user_id, status_id, payments_method] });

    res.sendStatus(200);
  }
  catch (err) {
    res.send(err);
  }
});
app.get('/yourOrder/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const data = await sequelize.query(
    `SELECT users.id, orders.total, orders.payments_method, orders.product_id, orders.quantity from users INNER JOIN orders ON users.id = orders.user_id  WHERE users.id = ${req.params.id}`,
    { type: sequelize.QueryTypes.SELECT }
  )
  res.send(data);
});
app.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await sequelize.query(
      'DELETE  from orders WHERE id = :id',
      { replacements: { id: req.params.id } }

    );
    res.sendStatus(200);
  } catch (err) {
    res.send(err);
  }
});
module.exports = app;
