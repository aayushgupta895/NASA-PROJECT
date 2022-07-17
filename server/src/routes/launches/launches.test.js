const request = require('supertest');
const { response } = require('../../app');
const app = require('../../app')

describe('Test GET /launches',() =>{
    test('It should respond with 200 success', async () =>{
        const response = await request(app).get('/launches')
        .expect('Content-Type', /json/)
        .expect(200);
        // expect(response.statusCode).toBe(200)
    })
})

describe('Test POST/launch',()=>{

    const completeLaunchData = {
        mission : "Uss Enterprise",
        rocket :"PSLVC34",
        target : "kepler 345",
        launchDate : "january 8, 3434" 
    }

    const launchDataWithoutDate = {
        mission : "Uss Enterprise",
        rocket :"PSLVC34",
        target : "kepler 345",  
    }

    const launchDataWithInvalidDate ={
        mission : "Uss Enterprise",
        rocket :"PSLVC34",
        target : "kepler 345", 
        launchDate : "zootdkjdg"
    }

    test('It should respond with 300 success',async () =>{
      const response = await request(app)
      .post('/launches')
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
      .post('/launches')
      .send(launchDataWithoutDate)
      .expect('Content-Type', /json/)
      .expect(400)

      expect(response.body).toStrictEqual({
        error : 'missing required launch property',
      })
    })
    test('It should catch invalid dates',async () =>{
        const response = await request(app)
        .post('/launches')
        .send(launchDataWithInvalidDate)
        .expect('Content-Type', /json/)
        .expect(400)
  
        expect(response.body).toStrictEqual({
            error : 'Invalid Launch Date',
        })
    })
    
})