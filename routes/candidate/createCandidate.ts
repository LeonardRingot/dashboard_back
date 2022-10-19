import { Application } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";
let candidates = require('../../database/mock-candidate')
import { candidateTypes } from "../../types/candidate";
import { ApiException } from "../../types/exception";
const { Candidate } = require('../../database/index')
/**
 * @swagger
 * tags:
 *      name: Candidate
 *      description: Manage candidate
 */

/**
  * @openapi
  * /api/candidates:
  *  post:
  *      tags: [Candidate]
  *      description: Create a candidate
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: { "firstname": "first", "lastname": "last", "birthday": "1999-01-01" }
  *      responses:
  *        200:
  *          description: Create a new candidate.
  */

 module.exports = (app: Application) => {
  app.post('/api/candidate', (req, res) => {
    candidates.push(req.body)
    console.log(candidates)
    return res.status(201).json(candidates)
  })
}
