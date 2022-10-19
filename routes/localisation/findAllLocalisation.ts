import { Application } from "express";
let localisations = require('../../database/mock-localisation')
import { localisationTypes } from "../../types/localisation";
import { ApiException } from "../../types/exception";
const { Localisation } = require('../../database/index')
/**
 * @openapi
 * /api/locations:
 *   get:
 *      tags: [Location]
 *      responses:
 *        200:
 *          description: Get the list of all localisation.
 */

 module.exports = (app: Application) => {
    app.get('/api/localisations', (req, res) => {
        Localisation.findAll().then((Candidate : localisationTypes )=> {
            if (Localisation === null){
              const message = "L'utilisateur recherché n'existe pas"
              return res.status(404).json({message})
            }
            
      return  res.status(200).json(localisations)

    })
    .catch((error : ApiException ) => {
        const message = "Cannot find user."
        res.status(500).json({message, data: error})
      })
    })
}