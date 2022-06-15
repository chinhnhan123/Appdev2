const database = require("../database/models/index");
const Sequelize = database.db.sequelize;
const coursecategoryservice = require("../services/coursecategoryservice")
const courseservice = require("../services/courseservice")

      const rendercreateview = async function(req, res, next) {
        const soursecategory = await  coursecategoryservice.findallbyname();
      res.render('templates1/master', {
        title: 'Create sourse page',
        content: '../courses/create.ejs',
        soursecategory
        });
      }

      const create = async (req, res) => {
        try {
           
          const {
            name, description, coursecategoryid
          } = req.body;
        
          // Create trainer's info
          let data = {
            name, 
            description,
            coursecategoryid
          }
          const soursecategoty = await courseservice.create(data);
          res.redirect('/staff');
         
        } catch (error) {
          console.log("🚀 ~ file: admin.js ~ line 51 ~ router.post ~ error", error);
          res.redirect('/staff/createsourse');
        }
      }

      const destroy =  async function(req, res, next) {
        const {id} = req.params;
        const deletecourse = await courseservice.delete_sourse_byid(id);    
        res.redirect('/staff');
    
      }

      const updateview = async function(req, res, next) {
        const {id} = req.params;
        const courses = await courseservice.find_sourse_byid(id);
        const coursecategory = await coursecategoryservice.find_soursecategory_byid(id);

        res.render('templates1/master', {
           title: 'Sourse page',
           content: '../courses/update.ejs', 
           courses,
           coursecategory
          });
        } 

      const update = async (req, res) => {
          const { id, name, description, coursecategoryid} = req.body;
        let  data = {
            name,
            description,
            coursecategoryid
          }
    
        const updatecourse = await courseservice.update(id, data);
    
        res.redirect('/staff');
      }  



module.exports = { 
    rendercreateview,
    create,
    destroy,
    updateview,
    update
};