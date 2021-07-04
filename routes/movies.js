const express = require('express')
const route = express.Router()
const {Movie, validateObject} = require('../models/movie')
const {Genre} = require('../models/genre')


route.get('/', async (req,res)=>{
    const movies = await Movie.find().sort('name');
    res.send(movies)
})


route.get('/:id',async (req,res)=>{
    const movie = await Movie.findById(req.params.id)
    if(!movie)  return res.status(404).send('This page is not found!')
    res.send(movie)
})
 
route.post('/', async (req, res)=>{
    const {error} = validateObject(req.body)
    if(error) return res.status(400).send(error.details[0].message)  
    
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return  res.status(400).send('Invalid genre.')

    const movie = new Movie({
        name: req.body.name,
        numberInStock: req.body.numberInStock, 
        dailyRentalRate: req.body.dailyRentalRate, 
        genre: {
            _id:genre._id,
            name: genre.name
        }
    })
    await movie.save()
    res.send(movie)
})
 
route.put('/:id', async (req, res)=>{
    const {error} = validateObject(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return  res.status(400).send('Invalid genre.')

    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        name: req.body.name, 
        numberInStock: req.body.numberInStock, 
        dailyRentalRate: req.body.dailyRentalRate,
        genre: {
            _id:genre._id,
            name: genre.name
        }
    },{new:true})

    if(!movie) return res.status(404).send('This page is not found!')
        
    res.send(movie)
})

route.delete('/:id', async (req,res)=>{
    const movie = await Movie.findByIdAndRemove(req.params.id)

    if(!movie) return res.status(404).send('This page is not found!')

    res.send(movie)
})
module.exports = route