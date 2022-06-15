const accountservice = require("../services/accountservice")


const index = async function(req, res, next) {
    const trainerAccounts = await  accountservice.findallbyname('trainer');
    const staffAccounts = await  accountservice.findallbyname('trainingStaff');
  //  res.send(req.body);
    res.render('templates1/master',
     { title: 'admin page', 
     content: '../admin_view1/admin.ejs',
     trainerAccounts, 
     staffAccounts
         });
  }

  module.exports = {
    index
  }