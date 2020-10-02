const express = require("express")
const app = express();
const sequelize = require("../../sequelize");
const authMiddleware = require("../../middleware/auth");
const adminMiddleware = require("../../middleware/auth_adm");

//PRODUCTS
app.get('/', authMiddleware, async (req, res) => {
  const data = await sequelize.query(
    `SELECT * FROM products WHERE active =1`,
    { type: sequelize.QueryTypes.SELECT }
  );
  res.send(data);
});
app.get('/:id',authMiddleware, async (req,res)=>{
  const data = await sequelize.query(
  `SELECT * FROM products WHERE id = ${req.params.id}`,
  {type:sequelize.QueryTypes.SELECT}
  )
res.send(data);
});

app.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  const { name, price, price_descount, description, picture, active } = req.body;
  try {
    await sequelize.query(
      `INSERT into products (name, price,price_descount,description,picture,active)
    VALUES
  (?,? , ?, ?, ?, ?)
    `,
      { replacements: [name, price, price_descount, description, picture, active] });

    res.sendStatus(200);
  } catch (error) {
    res.send(error);
  }
});
app.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { name, price, picture, description, price_descount, active } = req.body;
  try {
    await sequelize.query(
      `UPDATE products  SET
       name=?,
         price=?,
          picture=?,
          description=?,
          price_descount=?,
          active=?
        WHERE id = ${req.params.id}

       `,
      { replacements: [name, price, picture, description, price_descount, active] });

    res.sendStatus(200);
  }
  catch (err) {
    res.send(err);
  }
});
app.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await sequelize.query(
      'DELETE  from products WHERE id = :id',
      { replacements: { id: req.params.id } }

    );
    res.sendStatus(200);
  } catch (err) {
    res.send(err);
  }
});
module.exports=app;
