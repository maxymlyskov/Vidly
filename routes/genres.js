const express = require('express')
const route = express.Router()
const {Genre, validateObject} = require('../models/genre')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const asyncMiddleware = require('../middleware/async')
const mongoose = require('mongoose')


route.get('/', asyncMiddleware(async (req,res)=>{
        const genres = await Genre.find();
        res.send(genres)
}))


route.get('/:id',async (req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('Invalid ID')

    const genre = await Genre.findById(req.params.id)
    if(!genre)  return res.status(404).send('This page is not found!')
    res.send(genre)
})
 
route.post('/', auth, async (req, res)=>{
    const {error} = validateObject(req.body)
    if(error) return res.status(400).send(error.details[0].message)    

    let genre = new Genre({name: req.body.name})
    genre = await genre.save()
    res.send(genre)
})
 
route.put('/:id', async (req, res)=>{
    const {error} = validateObject(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name},{new:true})

    if(!genre) return res.status(404).send('This page is not found!')
        
    res.send(genre)
})

route.delete('/:id',[auth, admin], async (req,res)=>{
    const genre = await Genre.findByIdAndRemove(req.params.id)

    if(!genre) return res.status(404).send('This page is not found!')

    res.send(genre)
})
module.exports = route