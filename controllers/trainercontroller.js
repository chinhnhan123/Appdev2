const database = require("../database/models/index");
const Sequelize = database.db.sequelize;
const {account, Trainer, role} = database.db;
const roleservice = require("../services/roleservice")
const trainerservice = require("../services/trainerservice")
const accountservice = require("../services/accountservice")
const courseservice = require("../services/courseservice")
const trainercourseservice = require("../services/trainercourseservice")


const rendercreateview = async function(req, res, next) {
    const trainerrole = await roleservice.find_role_byname('trainer');
      res.render('templates1/master', {
        title: 'admin page',
        content: '../trainer_view/create.ejs',
        roleid : trainerrole.id
        });
    }

  const create = async (req, res) => {
    try {
      let data;
      var transaction = await Sequelize.transaction();
  
      const {
        username, password, fullname, specialty, age, address, email, roleid
      } = req.body;
    
      // Create trainer's info
      data = {
        fullname,
        specialty,
        age,
        address,
        email
      }
      const trainer = await trainerservice.create(data, transaction);
  
      // Create trainer's account
      data = {
        username,
        password,
        userid: trainer.id,
        roleid,
      }
      const trainerAccount = await accountservice.create(data, transaction);
          
      // If Everything work fine
      await transaction.commit();
      res.redirect('/admin');
     
    } catch (error) {
      console.log("🚀 ~ file: admin.js ~ line 51 ~ router.post ~ error", error);
      await transaction.rollback();
      res.redirect('/admin/createTrainer');
    }
  }

  const view =  async function(req, res, next) {
    const {userid} = req.params;
    const trainer = await trainerservice.find_trainer_byid(userid);
   
    res.render('templates1/master', {
       title: 'admin page',
        
       content: '../trainer_view/viewtrainer.ejs', 
        
       trainer
      });


  }

  const destroy =  async function(req, res, next) {
    const {id, userid} = req.params;
    const deletetrainer = await trainerservice.delete_trainer_byid(userid);
   
    const deletetraineraccount = await accountservice.delete_account_byid(id);

res.redirect('/admin');

  }

  // assign trainer course

  const assigntrainer =  async function(req, res, next) {
  
 try {
   
  const trainers = await trainerservice.find_trainer_all();
  const courses = await courseservice.findallbyname();
  return  res.render('templates1/master', {
    title: 'Assign trainer page',
     
    content: '../assigntrainer_view/create.ejs', 
     
    trainers,
    courses
   });
 } catch (error) {
 console.log("🚀 ~ file: trainercontroller.js ~ line 97 ~ assigntrainer ~ error", error);
 next(error);
 }
  }

  const addtrainercourse =  async function(req, res, next) {

    try {
      const {trainerid , courseid} = req.body;
      const trainercourses = await trainercourseservice.assigntrainerintocourse(trainerid , courseid);
      
      if(!trainercourses) res.redirect('/staff/assigntrainer')

      res.redirect('/staff')
    } catch (error) {
    console.log("🚀 ~ file: trainercontroller.js ~ line 114 ~ addtrainercourse ~ error", error)
    res.redirect('/staff/assigntrainer')
    }
  
  }

  const deletetrainercourse = async(req, res, next) => {
    try {
      const { trainerid, courseid } = req.params;
  
      const deleted = await trainercourseservice.removeassignedtrainer(trainerid, courseid);
      console.log("🚀 ~ file: trainerController.js ~ line 117 ~ deleteTrainerCourse ~ deleted", deleted)
  
      return res.redirect('/staff');
    } catch (error) {
      console.log("🚀 ~ file: trainerController.js ~ line 120 ~ deleteTrainerCourse ~ error", error)
      return res.redirect('/staff');
    }
  }

  const renderupdatetrainercourse = async function(req, res, next) {
    const { trainerid, courseid } = req.params;
    const selectedtrainer  = await trainerservice.find_trainer_byid(trainerid);
    const selectedcourse  = await courseservice.find_sourse_byid(courseid) ;
    const unassigntrainers  = await trainerservice.findnameunassignedtrainer(selectedtrainer.id);
    const unassgincourses  = await courseservice.findnameunassignedcourse(selectedcourse.id) ;

    // res.send({unassigntrainers,unassgincourses})

      res.render('templates1/master', {
        title: 'admin page',
        content: '../assigntrainer_view/update.ejs',
        selectedtrainer,
        selectedcourse,
        unassigntrainers,
        unassgincourses
        });
    }
  
  const  edittrainercourse = async function(req, res, next) {
    const { trainerid, courseid } = req.body;
    const { selectedtrainerid, selectedcourseid } = req.query;
    // return res.send(req.query);
    // return res.send(req.body)
    const trainerCourse = 
      await trainercourseservice.updateassignedtrainer(trainerid, courseid, selectedtrainerid, selectedcourseid);
  
    res.redirect('/staff');
  }


    module.exports = { 
        rendercreateview,
        create,
        view,
        destroy,
        assigntrainer,
        addtrainercourse,
        deletetrainercourse,
        renderupdatetrainercourse,
        edittrainercourse
    };