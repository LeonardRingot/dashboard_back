module.exports = (sequelize: any, Sequelize: any) => {
    const UserAdmin = sequelize.define("useradmin", {
      id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true, 
        },
      
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      
    });  
    return UserAdmin;
  };