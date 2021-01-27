const fs = require('fs')
const path = require('path')
const pizzaPath = path.join('database','Pizzas.json')
let cardapioJSON = fs.readFileSync(pizzaPath, {encoding:"utf-8"})
cardapio = JSON.parse(cardapioJSON)

function addPizza(nome, ingredientes, preco, imagem) {
  
  let pizzasJSON = fs.readFileSync(pizzaPath, {encoding:"utf-8"})
  let pizzas = JSON.parse(pizzasJSON)

  let id = pizzas.length + 1

  ingredientes = ingredientes.split(',')

  ingredientes.forEach((element, index) => {
    ingredientes[index] = element.trim()
  });

  pizzas.push(
    {
      id: id,
      nome: nome,
      ingredientes: ingredientes,
      preco: Number(preco),
      img: imagem,
      destaque: false
    }
  )
  
  pizzasJSON = JSON.stringify(pizzas)

  fs.writeFileSync(pizzaPath, pizzasJSON)
}

const indexController = {
  index: (req, res) => {
    return res.render("index", {cardapio})
  },

  pizza: (req, res) => {
    let {id} = req.params
    let pizza = cardapio.find(pizza => pizza.id == id)
    return res.render('pizza', {pizza})
  },

  create: (req, res)=> {
    return res.render('cadastro', {cardapio})
  },

  store: (req, res)=> {
    let {nome, ingredientes, preco, imagem} = req.body
    addPizza(nome, ingredientes, preco, imagem)
    
    res.redirect('/')
  }
}

module.exports = indexController
