const express = require('express')
const route = express.Router()
const {Customer, validateObject} = require('../models/customer')

route.get('/', async (req,res)=>{
    const customers = await Customer.find();
    res.send(customers)
})

route.get('/:id',async (req,res)=>{
    const customer = await Customer.findById(req.params.id)
    if(!customer)  return res.status(404).send('This page is not found!')
    res.send(customer)
})

route.post('/', async (req, res)=>{
    const {error} = validateObject(req.body)
    if(error) return res.status(400).send(error.details[0].message)    

    let customer = new Customer({name: req.body.name, phone: req.body.phone, isGold: req.body.isGold})
    customer = await customer.save()
    res.send(customer)
})

route.put('/:id', async (req, res)=>{
    const {error} = validateObject(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findByIdAndUpdate(req.params.id,
    { name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone
    },{new:true})

    if(!customer) return res.status(404).send('This page is not found!')
        
    res.send(customer)
})


route.delete('/:id', async (req,res)=>{
    const customer = await Cusotmer.findByIdAndRemove(req.params.id)

    if(!customer) return res.status(404).send('This page is not found!')

    res.send(customer)
})

route.delete('/:id', async (req,res)=>{
    const customer = await Customer.findByIdAndRemove(req.params.id)

    if(!customer) return res.status(404).send('This page is not found!')

    res.send(customer)
})


module.exports = route