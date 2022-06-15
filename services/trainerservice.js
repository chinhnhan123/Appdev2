const database = require("../database/models/index");
const Sequelize = database.db.sequelize;
const {Trainer, account} = database.db;

const find_trainer_byid = async (id) => {
    const trainer = await Trainer.findOne({
        where:{
        id
        }
      })

     return trainer ;
}

const find_trainer_all = async () => {
  const trainers = await Trainer.findAll();

   return trainers ;
}

const delete_trainer_byid = async (id) => {
    const deletetrainer = await Trainer.destroy({
        where:{
          id
          }
      })

     return deletetrainer ;
}

const create = async (data, transaction) => {
    const trainer = await Trainer.create(data, {transaction});
    return trainer;
  }

  const findnameunassignedtrainer = async (selectedtrainerid)  => {
    try {
      const trainers = await Trainer.findAll({
        where: {
          [database.db.Sequelize.Op.not]: {
            id: selectedtrainerid
          }
        }
      });
      return trainers;
    } catch (error) {
    console.log("🚀 ~ file: trainerservice.js ~ line 47 ~ findnameanassignedtrainer ~ error", error)
    return error;
    }
  }

module.exports = { 
    find_trainer_byid,
    delete_trainer_byid,
    create,
    find_trainer_all,
    findnameunassignedtrainer
};