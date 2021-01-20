const cardapio = require('../database/Pizzas.json')

const indexController = {
  index: (req, res) => {
    return res.render("index", {cardapio})
  },
  pizza: (req, res) => {
    return res.render("pizzas")
  },
  create: (req, res)=> {
    return res.render('cadastro', {cardapio})

  },
  store: (req, res)=> {
    let {nome, ingredientes, preco} = req.body
    cardapio.push(
      {
        'id': null,
        'nome': nome,
        'ingredientes': ingredientes,
        'preco': preco,
        'img': null,
        'destaque': false
      }
    )
    res.redirect('/')
  }
}

module.exports = indexController
