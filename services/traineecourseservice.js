const database = require("../database/models/index");
const Sequelize = database.db.sequelize;
const {trainee_course, trainee, course} = database.db;


const assigntraineeintocourse = async (traineeid, courseid) => {
try {
    const results = await trainee_course.create({traineeid, courseid});
    return results;
} catch (error) {
console.log("🚀 ~ file: traineecourseservice.js ~ line 11 ~ assigntraineeintocourse ~ error", error)
    
}
}

const getassignedtrainees = async() => {
    try {
      const assignedTrainees = await trainee_course.findAll({
        include: [ course, trainee ]
      });
      return assignedTrainees;
    } catch (error) {
      console.log("🚀 ~ file: trainerCourseService.js ~ line 19 ~ getAssignedTrainers ~ error", error)
      return error;
    }
  }

  const removeassignedtrainee = async ( traineeid, courseid ) => {
    try {
      const result = await trainee_course.destroy({
        where: {
            traineeid,
            courseid
        }
      });
      return result;
    } catch (error) {
      console.log("🚀 ~ file: traineecourseservice.js ~ line 38 ~ removeassignedtrainee ~ error", error)
      return error;
    }
  }

  const updateassignedtrainee = async ( traineeid, courseid, selectedtraineeid, selectedcourseid ) => {
    try {
      const result = await trainee_course.update(
        {
          traineeid,
          courseid
        },
        {
          where: {
            traineeid: selectedtraineeid,
            courseid: selectedcourseid
          }
        }
      );
      console.log("🚀 ~ file: traineecourseservice.js ~ line 57 ~ updateassignedtrainee ~ result", result)
      return result;
    } catch (error) {
      console.log("🚀 ~ file: trainerCourseService.js ~ line 51 ~ updateAssignedTrainer ~ error", error)
      return error;
    }
  }

module.exports = { 
    assigntraineeintocourse,
    getassignedtrainees,
    removeassignedtrainee,
    updateassignedtrainee
};