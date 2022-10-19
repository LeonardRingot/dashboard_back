import { create } from "domain";
import { Application } from "express";
import { candidateTypes } from "../../types/candidate";
let candidates = require('../../database/mock-candidate')
const { Candidate } = require('../../database/index')
import { UniqueConstraintError, ValidationError } from "sequelize";
import { ApiException } from "../../types/exception";
/**
  * @openapi
  * /api/candidates/{id}:
  *  put:
  *      tags: [Candidate]
  *      description: Update a candidate
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: integer
  *         default: 1
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: {    "firstname": "first", "lastname": "last", "birthday": "1999-01-25"}
  *      responses:
  *        200:
  *          description: Update the candidate of given id.
  */

 module.exports = (app: Application) => {
  app.put('/api/candidate/:id', (req, res) => {
    console.log('aaa')
    const id = req.params.id;
    const { UserId, lastname, firstname, birthday } = req.body
    Candidate.update({
      UserId:UserId,
      lastname:lastname,
      firstname:firstname,
      birthday:birthday
    }, {
      where: { id: id },
    })
    .then(() => {
      return Candidate.findByPk(req.params.id).then((candidates: candidateTypes) => {
         if (candidates === null){
           console.log('????')  
           const message = "Requested user does not exist."
           return res.status(404).json({message})
         }
           const message = `User ${candidates.firstname} successfully updated`;
           return res.status(201).json({ message, data: candidates });
         })
     })
     .catch((error: ApiException) => {
       if(error instanceof ValidationError){
         return res.status(400).json({message: error.message, data : error})
       }
       
       const message = `Impossiblee de mettre a jour le profile.`;
       res.status(500).json({ message, data: error });
     });
 });
};

// candidates[Number(req.params.id) -1] = req.body
    // console.log(candidates)
    // return res.status(201).json(candidates[Number(req.params.id) - 1])