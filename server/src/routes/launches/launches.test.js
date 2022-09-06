const request = require('supertest');
const { response } = require('../../app');
const app = require('../../app')
const {mongoConnect, mongoDisconnect} = require('../../services/mongo')

describe('launches API', () =>{

    beforeAll(async () =>{
       await mongoConnect()
    })
    afterAll(async () =>{
        await mongoDisconnect()
    })
    describe('Test GET /launches',() =>{
        test('It should respond with 200 success', async () =>{
            const response = await request(app).get('/v1/launches')
            .expect('Content-Type', /json/)
            .expect(200);
            // expect(response.statusCode).toBe(200)
        })
    })
    
    describe('Test POST/launch',()=>{
    
        const completeLaunchData = {
            mission : "Uss Enterprise",
            rocket :"PSLVC34",
            target : "Kepler-62 f",
            launchDate : "january 8, 3434" 
        }
    
        const launchDataWithoutDate = {
            mission : "Uss Enterprise",
            rocket :"PSLVC34",
            target : "Kepler-62 f",  
        }
    
        const launchDataWithInvalidDate ={
            mission : "Uss Enterprise",
            rocket :"PSLVC34",
            target : "Kepler-62 f", 
            launchDate : "zootdkjdg"
        }
    
        test('It should respond with 300 success',async () =>{
          const response = await request(app)
          .post('/v1/launches')
          .send(completeLaunchData)
          .expect('Content-Type', /json/)
          .expect(201)
    
           const requestDate = new Date(completeLaunchData.launchDate).valueOf()
           const responseDate = new Date(response.body.launchDate).valueOf()
    
           expect(responseDate).toBe(requestDate)
    
          expect(response.body).toMatchObject(launchDataWithoutDate)
        })
        test('It should catch missinbg required properties',async () =>{
            const response = await request(app)
          .post('/v1/launches')
          .send(launchDataWithoutDate)
          .expect('Content-Type', /json/)
          .expect(400)
    
          expect(response.body).toStrictEqual({
            error : 'missing required launch property',
          })
        })
        test('It should catch invalid dates',async () =>{
            const response = await request(app)
            .post('/v1/launches')
            .send(launchDataWithInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400)
      
            expect(response.body).toStrictEqual({
                error : 'Invalid Launch Date',
            })
        })
        
    })
})
