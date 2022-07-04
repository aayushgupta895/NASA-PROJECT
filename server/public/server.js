const PORT = process.env.PORT||4000
const http = require('http')
const { loadPlanetsData } = require('./models/planets.model')
const app = require('./app')

const server = http.createServer(app)

async function startServer(){
    await loadPlanetsData();
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    })
}  

startServer()