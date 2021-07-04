const Joi = require('joi');
const mongoose = require('mongoose')
const {movieSchema}=require('./movie')
const {customerSchema} = require('./customer')

const rentalSchema = new mongoose.Schema({
    
    movie: movieSchema,
    cusotmer: {type: new mongoose.Schema({
        isGold: {type: Boolean, default: false},
        name: {required: true, type: String, minLength: 5, maxLength: 25, default: "Maxym"},
        phone: {type: String, required: true, min: 5, max: 15, default: "12345678" }
    })
    },
    
    date:{
        type: Date,
        default: Date.now,
        required: true
    },
    outDate: {
        type: Date,
        default: () => new Date(+new Date() + 10*24*60*60*1000),
        required: true
    }
})

const Rental = mongoose.model("Rental", rentalSchema)



function validateObject(result){
    const schema =Joi.object({
        movieId: Joi.objectId().required(),
        customerId: Joi.objectId().required()
    } )
    return schema.validate(result)
    
}

exports.validateObject = validateObject;
exports.Rental = Rental