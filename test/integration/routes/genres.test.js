const request = require('supertest')
const {Genre} = require('../../../models/genre')
let server;

describe('/api/genres',()=>{
    beforeEach(()=>{server = require('../../../index')});
    afterEach(async ()=>{
        server.close
        await Genre.remove({})
    });

    describe('/GET',()=>{
        it('should return a get request',async ()=>{
            await Genre.collection.insertMany([
                {name: 'genre1'},
                {name: 'genre2'}
            ])

            const res = await request(server).get('/api/genres')
            expect(res.body.length).toBe(2)
        })
    })
    describe('/GET/:id',()=>{
        it('should return a genre id',async ()=>{

            const payload = {
                name: 'genre1'
            }
            const genre = new Genre(payload);
            await genre.save()
            const res = await request(server).get('/api/genres/'+ genre._id)
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name)
        })
    })
    describe('/GET/:id',()=>{
        it('should return a genre if valid is passed',async ()=>{

            const res = request(server).get('/api/genres/1')

            expect(res.status).toBe(404)
        })
    })
})