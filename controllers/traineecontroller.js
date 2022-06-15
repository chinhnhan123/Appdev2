const roleservice = require("../services/roleservice")
const accountservice = require("../services/accountservice")
const traineeservice = require("../services/traineeservice")
const courseservice = require("../services/courseservice")
const traineecourseservice = require("../services/traineecourseservice")
const database = require("../database/models/index");
const Sequelize = database.db.sequelize;

const rendercreateview = async function(req, res, next) {
    const traineerole = await roleservice.find_role_byname('trainee');
      res.render('templates1/master', {
        title: 'admin page',
        content: '../trainee_view/create.ejs',
        roleid : traineerole.id
        });
    }
   
const create = async (req, res) => {
        try {
          let data;
          var transaction = await Sequelize.transaction();
      
          const {
            username, password, name,  age, education, email, roleid, dateofbirth
          } = req.body;
        
          // Create trainer's info
          data = {
            name,
            education,
            age,
            dateofbirth,
            email
          }
          const trainee = await traineeservice.create(data, transaction);
      
          // Create trainer's account
          data = {
            username,
            password,
            userid: trainee.id,
            roleid,
          }
          const traineeAccount = await accountservice.create(data, transaction);
              
          // If Everything work fine
          await transaction.commit();
          res.redirect('/staff');
         
        } catch (error) {
          console.log("🚀 ~ file: admin.js ~ line 51 ~ router.post ~ error", error);
          await transaction.rollback();
          res.redirect('/staff/createTrainee');
        }
      }    

 const view =  async function(req, res, next) {
        const {userid} = req.params;
        const trainee = await traineeservice.find_trainee_byid(userid);
       
        res.render('templates1/master', {
           title: 'admin page',
            
           content: '../trainee_view/viewtrainee.ejs', 
            
           trainee
          });
    
    
      }
 const destroy =  async function(req, res, next) {
        const {id, userid} = req.params;
        const deletetrainee = await traineeservice.delete_trainee_byid(userid);
       
        const deletetraineeaccount = await accountservice.delete_account_byid(id);
    
    res.redirect('/staff');
    
      } 
      
 const updateview = async function(req, res, next) {
  const {traineeid} = req.params;
  const trainee = await traineeservice.find_trainee_byid(traineeid);
  const traineerole = await roleservice.find_role_byname('trainee');

  res.render('templates1/master', {
     title: 'admin page',
      
     content: '../trainee_view/update.ejs', 
     roleid : traineerole.id,
     trainee
    });
  } 
  
  const update = async (req, res) => {
      const { id, name,  age, education, email, dateofbirth} = req.body;
      data = {
        name,
        education,
        age,
        dateofbirth,
        email
      }

    const updatetrainee = await traineeservice.update(id, data);

    res.redirect('/staff');
  }    
  
  // assign trainee course
  const assigntrainee =  async function(req, res, next) {
  
    try {
      
     const trainees = await traineeservice.find_trainee_all();
     const courses = await courseservice.findallbyname();
    //  return  res.send({trainees, courses})
     return  res.render('templates1/master', {
       title: 'Assign trainee page',
        
       content: '../assigntrainee_view/create.ejs', 
        
       trainees,
       courses
      });
    } catch (error) {
    console.log("🚀 ~ file: trainercontroller.js ~ line 97 ~ assigntrainee ~ error", error);
    next(error);
    }
  }
  
  const addtraineecourse =  async function(req, res, next) {

    try {
      const {traineeid , courseid} = req.body;
      const traineecourses = await traineecourseservice.assigntraineeintocourse(traineeid , courseid);
      
      if(!traineecourses) res.redirect('/staff/assigntrainee')

      res.redirect('/staff')
    } catch (error) {
    console.log("🚀 ~ file: trainercontroller.js ~ line 114 ~ addtrainercourse ~ error", error)
    res.redirect('/staff/assigntrainee')
    }
  
  }  

  const deletetraineecourse = async(req, res, next) => {
    try {
      const { traineeid, courseid } = req.params;
  
      const deleted = await traineecourseservice.removeassignedtrainee(traineeid, courseid);
      console.log("🚀 ~ file: traineecontroller.js ~ line 153 ~ deletetraineecourse ~ deleted", deleted)
  
      return res.redirect('/staff');
    } catch (error) {
      console.log("🚀 ~ file: traineecontroller.js ~ line 157 ~ deletetraineecourse ~ error", error)
      return res.redirect('/staff');
    }
  }

  const renderupdatetraineecourse = async function(req, res, next) {
    const { traineeid, courseid } = req.params;
    const selectedtrainee  = await traineeservice.find_trainee_byid(traineeid);
    const selectedcourse  = await courseservice.find_sourse_byid(courseid) ;
    const unassigntrainees  = await traineeservice.findnameunassignedtrainee(selectedtrainee.id);
    const unassgincourses  = await courseservice.findnameunassignedcourse(selectedcourse.id) ;

    // res.send({unassigntrainers,unassgincourses})

      res.render('templates1/master', {
        title: 'admin page',
        content: '../assigntrainee_view/update.ejs',
        selectedtrainee,
        selectedcourse,
        unassigntrainees,
        unassgincourses
        });
    }
  
  const  edittraineecourse = async function(req, res, next) {
    const { traineeid, courseid } = req.body;
    const { selectedtraineeid, selectedcourseid } = req.query;
    // return res.send(req.query);
    // return res.send(req.body)
    const traineeCourse = 
      await traineecourseservice.updateassignedtrainee(traineeid, courseid, selectedtraineeid, selectedcourseid);
  
    res.redirect('/staff');
  }






    module.exports = { 
        rendercreateview,
        create,
        view,
        destroy,
        updateview,
        update,
        assigntrainee,
        addtraineecourse,
        deletetraineecourse,
        renderupdatetraineecourse,
        edittraineecourse
    };