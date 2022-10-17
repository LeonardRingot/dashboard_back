const {DataTypes,  Sequelize, Op } = require('sequelize')
const useradminmodel = require('../database/useradminmodel')
const typesofadmin = require ('../typesofadmin/typesofadmin')


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
const db = {Sequelize: '', useradmin: ''};
db.Sequelize = sequelize;
db.useradmin = require("./useradminmodel")(sequelize, Sequelize);

const User = useradminmodel(sequelize, DataTypes)

const initDb = () => {

        return sequelize.sync({force: true}).then(()=> {
            
            User.map((user: typeof typesofadmin) => {
                User.create({
                    email: user.email,
                   password:user.password
                    
                }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
            })
            console.log('BDD créer')
    })
}

module.exports = {
    initDb,
    User,
    db
}