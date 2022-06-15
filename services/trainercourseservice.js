const database = require("../database/models/index");
const Sequelize = database.db.sequelize;
const {trainercourse, Trainer, course} = database.db;


const assigntrainerintocourse = async (trainerid, courseid) => {
try {
    const results = await trainercourse.create({trainerid, courseid});
    return results;
} catch (error) {
console.log("🚀 ~ file: trainercourseservice.js ~ line 7 ~ assigntrainerintocourse ~ error", error)
    
}
}

const getassignedtrainers = async() => {
    try {
      const assignedTrainers = await trainercourse.findAll({
        include: [ course, Trainer ]
      });
      return assignedTrainers;
    } catch (error) {
      console.log("🚀 ~ file: trainerCourseService.js ~ line 19 ~ getAssignedTrainers ~ error", error)
      return error;
    }
  }

  const removeassignedtrainer = async ( trainerid, courseid ) => {
    try {
      const result = await trainercourse.destroy({
        where: {
            trainerid,
            courseid
        }
      });
      return result;
    } catch (error) {
      console.log("🚀 ~ file: trainerCourseService.js ~ line 36 ~ removeAssignedTrainer ~ error", error)
      return error;
    }
  }

  const updateassignedtrainer = async ( trainerid, courseid, selectedtrainerid, selectedcourseid ) => {
    try {
      const result = await trainercourse.update(
        {
          trainerid,
          courseid
        },
        {
          where: {
            trainerid: selectedtrainerid,
            courseid: selectedcourseid
          }
        }
      );
      console.log("🚀 ~ file: trainerCourseService.js ~ line 49 ~ updateAssignedTrainer ~ result", result)
      return result;
    } catch (error) {
      console.log("🚀 ~ file: trainerCourseService.js ~ line 51 ~ updateAssignedTrainer ~ error", error)
      return error;
    }
  }

module.exports = { 
    assigntrainerintocourse,
    getassignedtrainers,
    removeassignedtrainer,
    updateassignedtrainer
};