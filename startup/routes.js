const genres = require('../routes/genres')
const home = require('../routes/home')
const asyncError = require('../middleware/error')
const express = require('express');
const customers = require('../routes/customers')
const movies = require('../routes/movies')
const rentals = require('../routes/rentals')
const users = require('../routes/users')
const auth = require('../routes/auth')

module.exports = function(app){
    app.use(express.json())

    app.use('/', home)
    app.use('/api/genres', genres)
    app.use('/api/customers', customers)
    app.use('/api/movies', movies)
    app.use('/api/rentals' ,rentals)
    app.use('/api/users', users)
    app.use('/api/auth', auth)
    app.use(asyncError)
}