const { Sequelize } = require('sequelize')
import { DataTypes } from "sequelize"
import { userTypes } from "../types/user"
import { localisationTypes } from "../types/localisation"
import { candidateTypes } from "../types/candidate"
import { employerTypes } from "../types/employer"
import { degreeTypes } from "../types/degree"
import { roleTypes } from "../types/role"
import { periodTypes } from "../types/period"

let users = require('./mock-users')
let localisations = require('../database/mock-localisation')
let candidates = require('../database/mock-candidate')
let employers = require('../database/mock-employer')
let degrees = require('../database/mock-degree')
let roles = require('../database/mock-role')
let periods = require('../database/mock-period')

const UserModel = require('../models/users')
const LocalisationModel = require('../models/localisations')
const CandidateModel = require('../models/candidates')
const EmployerModel = require('../models/employers')
const DegreeModel = require('../models/degrees')
const RoleModel = require('../models/roles')
const PeriodModel = require('../models/periods')
const PeriodUserModel = require('../models/periodUsers')
const DegreeUserModel = require('../models/degreeUsers')
const RoleUserModel = require('../models/roleUsers')
//On se connecte a notre BDD
const sequelize = new Sequelize (
    'cse_bdd_test',
    'postgres',
    'root',
    {
        host:'localhost',
        dialect:'postgres',
        port: 5432,
        dialectOptions: {
            useUTC: false,
            dateStrings: true,
            typeCast: true
      }
    }
)
sequelize.authenticate()
    .then(() => console.log('Liaison etablie'))
    .catch((error : Error) => console.error(`Error: ${error}`)
    )
   
 const User = UserModel(sequelize, DataTypes)
 const Localisation = LocalisationModel(sequelize, DataTypes)
const Candidate = CandidateModel(sequelize, DataTypes)
const Employer = EmployerModel(sequelize, DataTypes)
const Degree = DegreeModel(sequelize, DataTypes)
const Role = RoleModel(sequelize, DataTypes)
const Period = PeriodModel(sequelize, DataTypes)
const PeriodUser = PeriodUserModel(sequelize, DataTypes)
const DegreeUser = DegreeUserModel(sequelize, DataTypes)
const RoleUser = RoleUserModel(sequelize, DataTypes)
// const db = {Sequelize: '', useradmin: ''};
// db.Sequelize = sequelize;
// db.useradmin = require("./useradminmodel")(sequelize, Sequelize);

const initDb = () => {
    Localisation.hasOne(User)
    User.belongsTo(Localisation)

    User.hasOne(Candidate, { constraints: false })
    Candidate.belongsTo(User, { constraints: false })

    User.hasOne(Employer, { constraints: false })
    Employer.belongsTo(User, { constraints: false })
    // doit peut être creer model etc pour ceux ci 
    Degree.belongsToMany(User, { through: DegreeUser })
    User.belongsToMany(Degree, { through: DegreeUser })

    Role.belongsToMany(User, { through: RoleUser })
    User.belongsToMany(Role, { through: RoleUser })

    Period.belongsToMany(User, { through: PeriodUser })
    User.belongsToMany(Period, { through: PeriodUser })
        return sequelize.sync({force: true}).then(()=> {

            localisations.map((localisation: localisationTypes) => {
                Localisation.create({
                    address: localisation.address,
                    zipCode: localisation.zipCode,
                    city: localisation.city
                })
            })
            periods.map((period: periodTypes) => {
                Period.create({
                    periodname: period.periodname
                })
            })
            candidates.map((candidate: candidateTypes) => {
                Candidate.create({
                    UserId: candidate.userId,
                    firstname: candidate.firstname,
                    lastname: candidate.lastname,
                    birthday: candidate.birthday
                })
            })
            employers.map((employer: employerTypes) => {
                Employer.create({
                    UserId: employer.userId,
                    siret: employer.siret,
                    structurename: employer.structurename
                })
            })
            roles.map((role: roleTypes) => {
                Role.create({
                    role: role.role
                })
            })
            degrees.map((degree: degreeTypes) => {
                Degree.create({
                    degreename: degree.degreename
                })
            })
            
            users.map(async(user:  userTypes, index: number) => {
                let newUser = await User.create({
                    email: user.email,
                    phone: user.phone,
                    isActif: user.isActif,
                    password: user.password,
                    TokenId: user.TokenId,
                    LocalisationId: user.LocalisationId,
                    
                })
                for(let i =0; i<10; i++){
                    const periodRow = await Period.findByPk(Math.floor(Math.random() * (8 - 1 + 1) + 1));
                    await newUser.addPeriod(periodRow, { through: PeriodUser })
                }
    
                const roleRow = await Role.findByPk(index + 1);
                await newUser.addRole(roleRow, { through: RoleUser })
    
                const degreeRow = await Degree.findByPk(index +1);
                await newUser.addDegree(degreeRow, { through: DegreeUser })
            })
            
            console.log('BDD créer')
    })
}

module.exports = {
    initDb,
    User,
    Candidate,
    Localisation
}