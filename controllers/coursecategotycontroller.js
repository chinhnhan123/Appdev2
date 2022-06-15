const database = require("../database/models/index");
const Sequelize = database.db.sequelize;
const coursecategoryservice = require("../services/coursecategoryservice")

      const rendercreateview = async function(req, res, next) {
      res.render('templates1/master', {
        title: 'Create sourse category page',
        content: '../course_category/create.ejs'
        });
      }

      const create = async (req, res) => {
        try {
          let data;
          const {
            name, description
          } = req.body;
        
          // Create trainer's info
          data = {
            name, 
            description
            
          }
          const soursecategoty = await coursecategoryservice.create(data);
          res.redirect('/staff');
         
        } catch (error) {
          console.log("🚀 ~ file: admin.js ~ line 51 ~ router.post ~ error", error);
          res.redirect('/staff/createsoursecategory');
        }
      }

      const destroy =  async function(req, res, next) {
        const {id} = req.params;
        const deletecoursecategory = await coursecategoryservice.delete_soursecategory_byid(id);    
        res.redirect('/staff');
    
      }

      const updateview = async function(req, res, next) {
        const {id} = req.params;
        const coursecategory = await coursecategoryservice.find_soursecategory_byid(id);

        res.render('templates1/master', {
           title: 'sourse category page',
           content: '../course_category/update',
           coursecategory
          });
        } 

      const update = async (req, res) => {
          const { id, name, description} = req.body;
          data = {
            name,
            description
          }
    
        const updatecoursecategory = await coursecategoryservice.update(id, data);
    
        res.redirect('/staff');
      }  



module.exports = { 
    rendercreateview,
    create,
    destroy,
    updateview,
    update
};