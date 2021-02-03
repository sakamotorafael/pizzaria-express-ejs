const users = require('../database/users.json')

const controller = {
  login: (req, res, next) => {
    return res.render('login')
  },
  auth: (req, res) => {
    let {email, senha} = req.body
    let user = users.find(user => user.email === email)
    if(user != undefined){
      if(user.senha === senha){
        req.session.user = user.name
        res.redirect('/users/menu')
      }
    } else {
      res.send("Usuário não encontrável")
    }
  },
  menu: (req, res, next) => {
    return res.render('menu')
  }
}

module.exports = controller