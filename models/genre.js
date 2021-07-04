const Joi = require('joi');
const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    }})

const Genre = mongoose.model("Genre", genreSchema)



function validateObject(result){
    const schema =Joi.object({
        name: Joi.string().min(3).required()
    } )
    return schema.validate(result)
    
}

exports.Genre = Genre;
exports.validateObject = validateObject;
exports.genreSchema = genreSchema