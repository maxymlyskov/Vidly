const Joi = require('joi');
const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    isGold: {type: Boolean, default: false},
    name: {required: true, type: String, minLength: 5, maxLength: 25, default: "Maxym"},
    phone: {type: String, required: true, min: 5, max: 15, default: "12345678" }
})

const Customer = mongoose.model('Customer', customerSchema)


function validateObject(result){
    const schema =Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    } )
    return schema.validate(result)
    
}


exports.customerSchema = customerSchema;
exports.Customer = Customer;
exports.validateObject = validateObject;