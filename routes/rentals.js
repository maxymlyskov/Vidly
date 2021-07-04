const express = require('express')
const route = express.Router()
const {Rental, validateObject} = require('../models/rental')
const{Movie} = require('../models/movie')
const{Customer} = require('../models/customer')
const mongoose = require('mongoose')
const Fawn = require('fawn')

Fawn.init(mongoose);

route.get('/', async (req,res)=>{
    const rentals = await Rental.find();
    res.send(rentals)
})


route.get('/:id',async (req,res)=>{
    const rental = await Rental.findById(req.params.id)
    if(!rental)  return res.status(404).send('This page is not found!')
    res.send(rental)
})   
 
route.post('/', async (req, res)=>{
    const {error} = validateObject(req.body)
    if(error) return res.status(400).send(error.details[0].message)   
    
    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return  res.status(400).send('Invalid movie.')

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return  res.status(400).send('Invalid customer.')
    console.log(customer)


    let rental = new Rental({
        movie: {    
            _id:movie._id,
            name: movie.name,
            dailyRentalRate: movie.dailyRentalRate
        },
        customer: {
            _id:customer._id,
            name: customer.name,
            phone: customer.phone
        }
    })
    try{
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies',{_id:movie._id},{
                $inc: {numberInStock: -1}
            })
            .run()
            res.send(rental)
    }
    catch(ex){
        console.log('Something wrong', ex)
    }

    
})
 
route.put('/:id', async (req, res)=>{
    const {error} = validateObject(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const rental = await Rental.findByIdAndUpdate(req.params.id, {name: req.body.name, phone: req.body.phone, isGold: req.body.isGold},{new:true})

    if(!rental) return res.status(404).send('This page is not found!')
        
    res.send(rental)
})

route.delete('/:id', async (req,res)=>{
    const rental = await Rental.findByIdAndRemove(req.params.id)

    if(!rental) return res.status(404).send('This page is not found!')

    res.send(rental)
})
module.exports = route