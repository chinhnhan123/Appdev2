const database = require("../database/models/index");
const Sequelize = database.db.sequelize;
const {course,course_catelory } = database.db;


  const create = async (data) => {
    const Sourse = await course.create(data);
    return Sourse;
  }

  const findallbyname = async ()  => {
    const sourse = await course.findAll({include: course_catelory}); ;
      return sourse;
  }

  const delete_sourse_byid = async (id) => {
  const deletesourse = await course.destroy({
      where:{
        id
        }
    })

   return deletesourse ;
  }

  const find_sourse_byid = async (id) => {
  const Sourse = await course.findOne({
      where:{
      id
      },
      include: course_catelory
    })

   return Sourse ;
  }

  const update = async (id, data) => {
  const updatecourse =    await course.update(data, {
    where :{
      id
    },
  });
  return updatecourse;
  }

  const findnameunassignedcourse = async (selectedcourseid)  => {
    try {
      const sourses = await course.findAll({
        where: {
          [database.db.Sequelize.Op.not]: {
            id: selectedcourseid
          }
        }
      });
      return sourses;
    } catch (error) {
    console.log("🚀 ~ file: courseservice.js ~ line 51 ~ findnameanassignedcourse ~ error", error)
    return error;
    }
  }


// const findallbynamesoursecategory = async ()  => {
//   const Course = await course.findAll({
//     include: [
//         {
//             model: course_catelory, 
//             as: 'coursecategoryid',
//             attributes: ['name']
//         }
//     ]
// }); ;
//     return Course;
// }

  module.exports = { 
    create,
    findallbyname,
    delete_sourse_byid,
    find_sourse_byid,
    update,
    findnameunassignedcourse
    // findallbynamesoursecategory
    
};