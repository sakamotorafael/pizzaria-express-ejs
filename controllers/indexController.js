const fs = require('fs')
const path = require('path')
const pizzaPath = path.join('database','Pizzas.json')

const Sequelize = require('sequelize')
const config = require('../config/database')


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

function editPizza(id, nome, ingredientes, preco, imagem) {
  let pizzasJSON = fs.readFileSync(pizzaPath, {encoding:"utf-8"})
  let pizzas = JSON.parse(pizzasJSON)
  
  ingredientes = ingredientes.split(',')

  ingredientes.forEach((element, index) => {
    ingredientes[index] = element.trim()
  });

  let index = pizzas.forEach((cadaPizza, index) => {
    if(cadaPizza.id == id){
      return index
    }
  })
    
  console.log(index)
  pizzas[index].nome = nome
  pizzas[index].ingredientes = ingredientes
  pizzas[index].preco = preco
  pizzas[index].imagem = imagem
  
  pizzasJSON = JSON.stringify(pizzas)

  fs.writeFileSync(pizzaPath, pizzasJSON)
}

const indexController = {
  index: async (req, res) => {
    const db = new Sequelize(config)
    let result = await db.query('select * from pizzas', {type:Sequelize.QueryTypes.SELECT})
    console.log(result)
    return res.render("index", {result})
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
  },

  edit: (req, res)=> {
    let {id} = req.params
    let pizza = cardapio.find(pizza => pizza.id == id)
    return res.render('editar', {pizza})
  },

  update: (req, res)=> {
    let {id} = req.params
    let {nome, ingredientes, preco, imagem} = req.body 

    editPizza(id, nome, ingredientes, preco, imagem)
    return res.send('editado com sucesso!')
  }

}

module.exports = indexController
