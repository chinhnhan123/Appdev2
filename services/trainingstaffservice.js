const database = require("../database/models/index");
const Sequelize = database.db.sequelize;
const {trainingstaff1} = database.db;

const create = async (data, transaction) => {
    const staff  = await trainingstaff1.create(data, {transaction});
    return staff;
  }

  const find_staff_by_id = async (id) => {
    const staff = await trainingstaff1.findOne({
        where:{
        id
        }
      })

     return staff ;
}

const delete_staff_byid = async (id) => {
  const deletestaff = await trainingstaff1.destroy({
      where:{
        id
        }
    })

   return deletestaff ;
}

module.exports = { 
    create,
    find_staff_by_id,
    delete_staff_byid
};