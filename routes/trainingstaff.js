var express = require('express');
var router = express.Router();
const { db} = require("../database/models/index");
const Sequelize = db.sequelize;
const traineecontroller = require("../controllers/traineecontroller");
const accountservice = require("../services/accountservice")
const trainningstffcontroler  = require("../controllers/trainingstaffcontroller")
const coursecategorycontroler  = require("../controllers/coursecategotycontroller")
const coursecontroler  = require("../controllers/coursescontroler")
const trainercontroller = require("../controllers/trainercontroller");

router.get('/',trainningstffcontroler.index);
// trainee section
router.get('/createtrainee', traineecontroller.rendercreateview );

router.post('/addtrainee', traineecontroller.create);

router.get('/viewtrainee/:userid', traineecontroller.view);

router.get('/deletetrainee/:id/:userid', traineecontroller.destroy );

router.get('/updatetrainee/:traineeid', traineecontroller.updateview );

router.post('/updatetrainee', traineecontroller.update);


router.get('/createcoursecategory', coursecategorycontroler.rendercreateview );

router.post('/addcoursecategory', coursecategorycontroler.create);

router.get('/deletecoursecategory/:id', coursecategorycontroler.destroy );

router.get('/updatecoursecategory/:id', coursecategorycontroler.updateview );

router.post('/updatecoursecategory', coursecategorycontroler.update);

// sourse categoty section

router.get('/createcourse', coursecontroler.rendercreateview );

router.post('/addcourse', coursecontroler.create);

router.get('/deletecourse/:id', coursecontroler.destroy );

router.get('/updatecourse/:id', coursecontroler.updateview );

router.post('/updatecourse', coursecontroler.update);

// assign trainer course

router.get('/assigntrainer', trainercontroller.assigntrainer );

router.post('/addtrainercourse', trainercontroller.addtrainercourse );

router.get('/deletetrainercourse/:trainerid/:courseid', trainercontroller.deletetrainercourse );

router.get('/updatetrainercourse/:trainerid/:courseid', trainercontroller.renderupdatetrainercourse );

router.post('/edittrainercourse', trainercontroller.edittrainercourse );

// assign trainee course

router.get('/assigntrainee', traineecontroller.assigntrainee );

router.post('/addtraineecourse', traineecontroller.addtraineecourse );

router.get('/deletetraineecourse/:traineeid/:courseid', traineecontroller.deletetraineecourse );

router.get('/updatetraineecourse/:traineeid/:courseid', traineecontroller.renderupdatetraineecourse );

router.post('/edittraineecourse', traineecontroller.edittraineecourse );

module.exports = router;
