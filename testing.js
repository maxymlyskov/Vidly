module.exports.absolute = (number) =>{
    if(number > 0) return number;
    if(number < 0) return -number;
    return 0;
}

module.exports.greet = (name)=>{
    return 'Welcome ' + name;
}

module.exports.getCurrencies = ()=>{
    return ['USD','AUD','EUR']
}

module.exports.getProduct = (productId) =>{
    return {id:productId, price: 10}
}

module.exports.registerUser = (username)=>{
    if(!username) throw new Error('Username is required!')
    return {id: Date.now(), username: username}
}

module.exports.fizzBuzz = (input) =>{
    if(typeof input !== 'number')
      throw new Error('Input should be a number.')
    
    if((input % 3 === 0)&& (input % 5) === 0)
      return 'FizzBuzz'

    if( input % 3 === 0)
      return 'Fizz' 
      
    if( input % 5 === 0)
      return 'Buzz'
      
    return input  
}