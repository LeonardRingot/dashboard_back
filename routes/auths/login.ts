const bcrypt = require('bcrypt')
import { Application } from "express";
const jwt = require('jsonwebtoken')
import { typesofadmin } from "../../typesofadmin/typesofadmin";
const { User } = require('../../database/index')
import { exception } from "../../typesofadmin/exception";

module.exports = (app: Application) => {
    app.post("/api/auths/login", (req, res) => {
        User.findAll()
      .then(async (users: any) => {
          
          const user = users.find((user : typesofadmin) => user.email == req.body.email)
  
          if (user == null) {
              return res.status(400).send('Administrateur introuvable introuvable')
          }
          let message : string = ''
          if (await bcrypt.compare(req.body.password, user.password)) {
              message = "Connecté"
              console.log(process.env.ACCESS_TOKEN_SECRET);
              const accessToken = jwt.sign({ name: user.email }, process.env.ACCESS_TOKEN_SECRET)
              const refreshToken = jwt.sign({ name: user.email }, process.env.REFRESH_TOKEN_SECRET)
              const data = {accessToken: accessToken, refreshToken: refreshToken}
              return res.status(200).json({ message, data: user.id, token: data});
          } else {
              message = "MDP incorrect"
              console.log('mauvais mdp');
              return message;
          }
          res.json(message)
      })
      .catch((error : exception) => {
              console.log(error);
              const message = `Could not get users list.`
              res.status(500).json({message, data : error})
          })
      })
  };