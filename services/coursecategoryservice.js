const database = require("../database/models/index");
const Sequelize = database.db.sequelize;
const {course_catelory} = database.db;


const create = async (data) => {
    const category = await course_catelory.create(data);
    return category;
  }

  const findallbyname = async ()  => {
    const soursecategory = await course_catelory.findAll(); ;
      return soursecategory;
}

const delete_soursecategory_byid = async (id) => {
  const deletesoursecategory = await course_catelory.destroy({
      where:{
        id
        }
    })

   return deletesoursecategory ;
}

const find_soursecategory_byid = async (id) => {
  const coursecategory = await course_catelory.findOne({
      where:{
      id
      }
    })

   return coursecategory ;
}

const update = async (id, data) => {
  const updatecoursecategory =    await course_catelory.update(data, {
    where :{
      id
    },
  });
  return updatecoursecategory;
}

  module.exports = { 
    create,
    findallbyname,
    delete_soursecategory_byid,
    find_soursecategory_byid,
    update
    
};