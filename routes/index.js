var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('templates/master', { title: 'index page', content: '../admin_view/index.ejs'});
// });

router.get('/', function(req, res, next) {
  res.render('templates1/master', { title: 'index page', content: '../admin_view1/index.ejs'});
});
module.exports = router;
