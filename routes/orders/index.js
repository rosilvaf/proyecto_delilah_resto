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
app.post('/', authMiddleware,async (req, res) => {


  const { username, product_id, status_id, payments_method } = req.body;

  await sequelize.query(

    `
    INSERT into orders (username, product_id, status_id, payments_method)
   VALUES
    ( ?, ?, ?, ?)
    
    `,
    { replacements: [username, product_id, status_id, payments_method] });

  res.sendStatus(200);
});
app.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { product_id, username, status_id, payments_method } = req.body;
  try {
    await sequelize.query(
      `UPDATE orders SET 
       product_id=?,
         username = ?,
          status_id= ?,
          payments_method=?
        WHERE id = ${req.params.id}

       `,
      { replacements: [product_id, username, status_id, payments_method] });

    res.sendStatus(200);
  }
  catch (err) {
    res.send(err);
  }
});
app.delete('/:id',authMiddleware, adminMiddleware, async (req, res) => {
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
module.exports=app;