const database = require("../database/models/index");
const Sequelize = database.db.sequelize;
const {account, role} = database.db;

const delete_account_byid = async (id) => {
    const deleteaccount = await account.destroy({
        where:{
          id
          }
      })

     return deleteaccount ;
}

const findonebyid = async (id) => {
    const find_id = await account.findOne({
        where:{
        id
        }
      })
      return find_id;
}

const findallbyname = async (name) => {
    const trainerAccounts = await account.findAll({
        include: {
          model: role,
          where: {
            name
          },
        },
      });
      return trainerAccounts;
}

const changepassbyid = async (id, newpassword) =>{
    const updateid = await account.update({   password : newpassword},{
        where:{
        id
        }
      })

      return updateid;
}

const create = async (data, transaction) => {
  const Account = await account.create(data, {transaction});
  return Account;
}


module.exports = {
    delete_account_byid,
    findonebyid,
    changepassbyid,
    findallbyname,
    create
};