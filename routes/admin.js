var express = require('express');
var router = express.Router();
const { db} = require("../database/models/index");
const Sequelize = db.sequelize;
const database = require("../database/models/index");
// console.log("🚀 ~ file: admin.js ~ line 4 ~ database", database);
const {account, Trainer, role} = database.db;
const trainercontroller = require("../controllers/trainercontroller");
const accountcontroller = require("../controllers/accountcontroller");
const admincontroller = require("../controllers/admincontroller");
const trainingstaffcontroller = require("../controllers/trainingstaffcontroller");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('templates/master', { title: 'index page', content: '../admin_view/index.ejs'});
// });

router.get('/', admincontroller.index );
// trainer section

router.get('/createtrainer', trainercontroller.rendercreateview );

  router.post('/addtrainer', trainercontroller.create);

  router.get('/viewtrainer/:userid', trainercontroller.view);
  
  router.get('/deletetrainer/:id/:userid', trainercontroller.destroy );

  // training section
  router.get('/createstaff', trainingstaffcontroller.rendercreateview);

  router.post('/addstaff', trainingstaffcontroller.create);

  router.get('/viewstaff/:userid', trainingstaffcontroller.view);
  
  router.get('/deletestaff/:id/:userid', trainingstaffcontroller.destroy );

  // account section
  router.get('/changepassword/:id',accountcontroller.renderchangepass );

  router.post('/updatepass', accountcontroller.changepass );

module.exports = router;