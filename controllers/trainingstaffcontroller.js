const database = require("../database/models/index");
const Sequelize = database.db.sequelize;
const roleservice = require("../services/roleservice")
const accountservice = require("../services/accountservice")
const trainingStaffservice = require("../services/trainingstaffservice")
const coursecategotyservice = require("../services/coursecategoryservice")
const courseservice = require("../services/courseservice")
const trainercourseservice = require("../services/trainercourseservice")
const traineecourseservice = require("../services/traineecourseservice")


    const index = async function(req, res, next) {
      const traineeAccounts = await  accountservice.findallbyname('trainee');
      const soursecategory = await  coursecategotyservice.findallbyname();
      const sourses = await  courseservice.findallbyname();
      const assignedtrainers = await trainercourseservice.getassignedtrainers();
      const assignedtrainees = await traineecourseservice.getassignedtrainees();

          res.render('templates1/master',
          { title: 'staff page', 
          content: '../trainingstaff_view/index.ejs',
          traineeAccounts,
          soursecategory,
          sourses,
          assignedtrainers,
          assignedtrainees

          });
    }  
    
    const rendercreateview = async function(req, res, next) {
    const staffrole = await roleservice.find_role_byname('trainingStaff');
      res.render('templates1/master', {
        title: 'Create staff page',
        content: '../trainingstaff_view/create.ejs',
        roleid : staffrole.id
        });
      }

    const create = async (req, res) => {
        try {
          let data;
          var transaction = await Sequelize.transaction();
      
          const {
            username, password, fullname, age, address, email, roleid
          } = req.body;
        
          // Create trainer's info
          data = {
            fullname,
            email,
            age,
            address
            
          }
          const staff = await trainingStaffservice.create(data, transaction);
      
          // Create trainer's account
          data = {
            username,
            password,
            userid: staff.id,
            roleid,
          }
          const staffAccount = await accountservice.create(data, transaction);
              
          // If Everything work fine
          await transaction.commit();
          res.redirect('/admin');
         
        } catch (error) {
          console.log("🚀 ~ file: admin.js ~ line 51 ~ router.post ~ error", error);
          await transaction.rollback();
          res.redirect('/admin/createstaff');
        }
      }
      
    const view =  async function(req, res, next) {
        const {userid} = req.params;
        const staff = await trainingStaffservice.find_staff_by_id(userid);
       
        res.render('templates1/master', {
           title: 'admin page',
            
           content: '../trainingstaff_view/viewstaff.ejs', 
            
           staff
          });
    
    
      }
    
    const destroy =  async function(req, res, next) {
        const {id, userid} = req.params;
        const deletestaff = await trainingStaffservice.delete_staff_byid(userid);
       
        const deletetraineraccount = await accountservice.delete_account_byid(id);
    
    res.redirect('/admin');
    
      }



    module.exports = { 
        rendercreateview,
        create,
        view,
        destroy,
        index
    };