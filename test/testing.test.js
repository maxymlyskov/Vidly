const testing = require('../testing')

describe('absolute',()=>{
    it('should return positive number if value is postitve.',()=>{
        const result = testing.absolute(1);
        expect(result).toBe(1)
    })
    
    it('should return positive number if value is negative.',()=>{
        const result = testing.absolute(-1);
        expect(result).toBe(1)
    })
    
    it('sohuld return 0 if value is 0.',()=>{
        const result = testing.absolute(0);
        expect(result).toBe(0)
    })
})

describe('greet',()=>{
    it('should return welcoming',()=>{
        const result = testing.greet('Maxym!')
        expect(result).toMatch(/Maxym!/)
    })
})

describe('getCurrencies', ()=>{
    it('should return specified currencies', ()=>{
        const result = testing.getCurrencies();
        expect(result).toEqual(expect.arrayContaining(['USD','AUD','EUR']))
    })
})

describe('getProduct',()=>{
    it('should return a proper id',()=>{
        const result = testing.getProduct(1);
        expect(result).toMatchObject({id: 1})
    })
})

describe('registerUser',()=>{
    it('should return thrown error if username is invalid',()=>{
        const args = [NaN, undefined, '', false, 0]

        args.forEach(a=>{
            expect(()=>{testing.registerUser(a)}).toThrow()
        })
    })
    it('should return a username object if valid username is passed',()=>{
        const result = testing.registerUser('Maxym')
        expect(result).toMatchObject({username:'Maxym'})
    })
})

describe('fizzBuzz', ()=>{
    it('should throw an exception if input is not a number',()=>{ 
        expect(()=>testing.fizzBuzz('a')).toThrow()
    })
    it('should return fizzbuzz if input % 3 and 5',()=>{
        const result = testing.fizzBuzz(15)
        expect(result).toBe('FizzBuzz')
    })
    it('should return fizz if input % 3',()=>{
        const result = testing.fizzBuzz(9)
        expect(result).toBe('Fizz')
    })
    it('should return buzz if input % 5',()=>{
        const result = testing.fizzBuzz(10)
        expect(result).toBe('Buzz')
    })
})

    