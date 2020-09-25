const express = require("express")
const app = express();
const sequelize = require("../../sequelize");
const authMiddleware = require("../../middleware/auth");
const adminMiddleware = require("../../middleware/auth_adm");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require('../../config');

app.post('/login', async(req,res)=>{
    const { username, password } = req.body;
    try{ 
      const data = await sequelize.query(
      `SELECT users.*,user_roles.name role
      FROM users 
      JOIN user_roles  ON users.role_id = user_roles.id
       WHERE username = ?`,
      { replacements:[username], type: sequelize.QueryTypes.SELECT } 
    
    );
     if(data.length){
      bcrypt.compare(password, data[0].password, function(err,result){
      if(result){
        const token = jwt.sign({
          username:data[0].username,
          role:data[0].role
        }, config.firm)
         
        res.send({
        username:data[0].username,
        token,
       });
      
      } else{
      res.send("usuario y contraseña incorrecta")
       }
      });
    }else{
        res.send("usuario y contraseña incorrecta")
         }
  }catch(err){
    res.send(err)
    }
    });
  
  
    app.get('/users',authMiddleware,adminMiddleware, async (req,res)=>{
      const data = await sequelize.query(
      `SELECT * FROM users`,
      {type:sequelize.QueryTypes.SELECT}
      )
   res.send(data);
  });
  
    app.get('/users/:id',authMiddleware, async (req,res)=>{
      const data = await sequelize.query(
      `SELECT * FROM users WHERE id = ${req.params.id}`,
      {type:sequelize.QueryTypes.SELECT}
      )
    res.send(data);
    });
    
    
    
  app.post('/users', async (req,res)=>{
    const { full_name, password, address, phone,email, username,role_id}= req.body;
    let hashPassword;
    
    await bcrypt.hash(password, 1, function(err, hash) { 
      hashPassword=hash;
      sequelize.query(
        `INSERT into users (full_name, password, address, phone,email, username, role_id)
        VALUES
         ( ?, ?, ?, ?, ?, ?, ?)
        `,
       
      { replacements:[full_name, hashPassword, address, phone,email, username, role_id] });
     
    });
       
   
  res.sendStatus(200);
    
  });
  app.put('/users/:id',authMiddleware, async (req,res)=>{
    const { full_name, password, address, phone,email, username,role_id}= req.body;
    try {
        await   sequelize.query(
       `UPDATE users SET
       full_name = ?,
         password = ?,
         address = ?,
         phone = ?,
         email = ?, 
         username = ? ,
         role_id = ? 
        WHERE id = ${req.params.id}
  
       `,
    { replacements:[full_name, password, address, phone,email, username,role_id] })
       
    res.sendStatus(200);
    }
    catch(err){
   res.send(err)
    }
   });
  
  app.delete('/users/:id',authMiddleware, async (req,res)=>{
    try{
        await sequelize.query(
        'DELETE  from users WHERE id = :id',
        {replacements:{ id:req.params.id}},
  
    )
    res.sendStatus(200); 
     } catch (err){
       res.send(err)  
     }
  })
module.exports=app;
