const database = require("../database/models/index");
const Sequelize = database.db.sequelize;
const {account} = database.db;
const accountservice = require("../services/accountservice")

const renderchangepass = async function(req, res, next) {
    const {id} = req.params;
    const Account = await accountservice.findonebyid(id);

    res.render('templates1/master', { 
      title: 'Change password', 
      content: '../account_view/changepassword.ejs', 
      Account
    });


res.redirect('/admin');

  }

  const changepass =  async function(req, res, next) {
    const {id, newpassword,confirmpassword} = req.body;
    if(newpassword !== confirmpassword){
     return  res.redirect(`/admin/changepassword/${id}`);
    }

    const updateaccount = await accountservice.changepassbyid(id, newpassword);


    return res.redirect('/admin');
  }


  module.exports = { 
    renderchangepass,
    changepass
};