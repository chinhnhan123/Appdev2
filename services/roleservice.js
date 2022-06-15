const database = require("../database/models/index");
const Sequelize = database.db.sequelize;
const { role} = database.db;

const find_role_byname = async (name) => {
    const result = await role.findOne({
        where:{
        name
        }
      })

     return result ;
}

module.exports = { 
    find_role_byname
};