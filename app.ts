require('dotenv').config()
const cors = require('cors');
const express = require ('express');
import { Response, Request, NextFunction } from 'express'
const app = express()
var corsOptions = {
    origin: "http://localhost:3000"
  };
  //On se lie au localhost 3000 ( le client )
app.use(cors(corsOptions));
app.use(express.json())
const sequelize = require('./database/index')
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Serveur lancer sur Port ${port}`)
})
sequelize.initDb()




require('./routes/users/findAllUsers')(app)
require('./routes/users/findUserByPk')(app)
require('./routes/users/createUser')(app)
require('./routes/users/updateUser')(app)
require('./routes/users/deleteUser')(app)

require('./routes/auths/login')(app)


require('./routes/role/createRole')(app)
require('./routes/role/deleteRole')(app)
require('./routes/role/findAllRole')(app)
require('./routes/role/findRoleById')(app)
require('./routes/role/updateRole')(app)

require('./routes/period/createPeriod')(app)
require('./routes/period/deletePeriod')(app)
require('./routes/period/findAllPeriod')(app)
require('./routes/period/findPeriodById')(app)
require('./routes/period/updatePeriod')(app)

require('./routes/localisation/createLocalisation')(app)
require('./routes/localisation/deleteLocalisation')(app)
require('./routes/localisation/findAllLocalisation')(app)
require('./routes/localisation/findLocalisationById')(app)
require('./routes/localisation/updateLocalisation')(app)

require('./routes/employer/createEmployer')(app)
require('./routes/employer/deleteEmployer')(app)
require('./routes/employer/findAllEmployer')(app)
require('./routes/employer/findEmployerById')(app)
require('./routes/employer/updateEmployer')(app)

require('./routes/degree/createDegree')(app)
require('./routes/degree/deleteDegree')(app)
require('./routes/degree/findAllDegree')(app)
require('./routes/degree/findDegreeById')(app)
require('./routes/degree/updateDegree')(app)

require('./routes/candidate/createCandidate')(app)
require('./routes/candidate/deleteCandidate')(app)
require('./routes/candidate/findAllCandidate')(app)
require('./routes/candidate/findCandidateById')(app)
require('./routes/candidate/updateCandidate')(app)



const jwt = require('jsonwebtoken')

app.use(({ res: ApiException }: any) => {
  const message = 'Ressource not found.'
  return ApiException.status(404).json({ message })
})