const bcrypt = require('bcrypt')
import { Application } from "express";
const jwt = require('jsonwebtoken')
import { userTypes } from "../../types/user";
let userS = require ("../../database/mock-users")
const { User } = require('../../database/index')

import { ApiException } from "../../types/exception";

module.exports = (app: Application) => {
    app.post("/api/auths/login", (req, res) => {
        User.findAll()
      .then(async (users: any) => {
          
          const user = users.find((user : userTypes) => user.email == req.body.email)
          let message : string = ''
          if (user == null) {
              return res.status(400).send('Administrateur introuvable introuvable')
          }
          
          if (userS[1].email == req.body.email ) {
           
              message = "Connecté"
            //   console.log(process.env.ACCESS_TOKEN_SECRET);
            //   const accessToken = jwt.sign({ name: user.email }, process.env.ACCESS_TOKEN_SECRET)
            //   const refreshToken = jwt.sign({ name: user.email }, process.env.REFRESH_TOKEN_SECRET)
            //   const data = {accessToken: accessToken, refreshToken: refreshToken}
            return res.status(200).json({ successfullLogin : true })
             
          } else {
              message = "MDP incorrect"
              console.log('mauvais mdp');
              return message;
          }
          
      })
      .catch((error : ApiException) => {
              console.log(error);
              const message = `Could not get users list.`
              res.status(500).json({message, data : error})
          })
      })
  };