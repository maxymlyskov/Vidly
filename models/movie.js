const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const mongoose = require('mongoose');
const { genreSchema } = require('./genre');

const movieSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    },
    genre: {type: genreSchema},
    numberInStock: {type: Number, default: 0, required: true},
    dailyRentalRate: {type: Number, default: 0, required: true}})

const Movie = mongoose.model("Movie",movieSchema)


function validateObject(result){
    const schema =Joi.object({
        name: Joi.string().min(3).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    } )
    return schema.validate(result)
    
}

exports.movieSchema = movieSchema;
exports.Movie = Movie;
exports.validateObject = validateObject;