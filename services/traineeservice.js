const database = require("../database/models/index");
const Sequelize = database.db.sequelize;
const {trainee} = database.db;



  const create = async (data, transaction) => {
    const trainee1 = await trainee.create(data, {transaction});
    return trainee1;
  }

  const find_trainee_byid = async (id) => {
    const trainee1 = await trainee.findOne({
        where:{
        id
        }
      })

     return trainee1 ;
  }

  const find_trainee_all = async () => {
  const trainees = await trainee.findAll();

   return trainees ;
  } 

  const findnameunassignedtrainee = async (selectedtraineeid)  => {
    try {
      const trainees = await trainee.findAll({
        where: {
          [database.db.Sequelize.Op.not]: {
            id: selectedtraineeid
          }
        }
      });
      return trainees;
    } catch (error) {
    console.log("🚀 ~ file: trainerservice.js ~ line 47 ~ findnameanassignedtrainer ~ error", error)
    return error;
    }
  }


  const delete_trainee_byid = async (id) => {
  const deletetrainee = await trainee.destroy({
      where:{
        id
        }
    })

   return deletetrainee ;
  }

  const update = async (id, data) => {
  const trainee1 =    await trainee.update(data, {
    where :{
      id
    },
  });
  return trainee1;
  }


  module.exports = { 
    create,
    find_trainee_byid,
    delete_trainee_byid,
    update,
    find_trainee_all,
    findnameunassignedtrainee
};