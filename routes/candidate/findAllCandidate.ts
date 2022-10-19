import { Application } from "express";
import { candidateTypes } from "../../types/candidate";
import { ApiException } from "../../types/exception";
let candidates = require('../../database/mock-candidate')
const { Candidate } = require('../../database/index')
/**
 * @openapi
 * /api/candidates:
 *   get:
 *      tags: [Candidate]
 *      responses:
 *        200:
 *          description: Get the list of all candidate.
 */

 module.exports = (app: Application) => {
    app.get('/api/candidate', (req, res) => {
        Candidate.findAll().then((Candidate : candidateTypes )=> {
            if (Candidate === null){
              const message = "L'utilisateur recherché n'existe pas"
              return res.status(404).json({message})
            }
            
      return  res.status(200).json(candidates)

    })
    .catch((error : ApiException ) => {
        const message = "Cannot find user."
        res.status(500).json({message, data: error})
      })
    })
}

// module.exports = (app: Application) => {
//   app.get('/api/candidate', (req, res) => {
//       res.json(candidates)

//   })
// }