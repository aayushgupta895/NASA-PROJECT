const http = require('http');
const app = require('./app');
const mongoose = require('mongoose')
const { loadPlanetsData } = require('./models/planets.models');
const PORT = process.env.PORT || 8000;


const username = encodeURIComponent("nasa-api");
const password = encodeURIComponent("bQPB9K_P:w9ZVvg");

const MONGO_URL = `mongodb+srv://${username}:${password}@nasacluster.jbodr.mongodb.net/nasa?retryWrites=true&w=majority`

const server = http.createServer(app);

mongoose.connection.once('open', () =>{
    console.log('MongoDB connection ready!')
})

mongoose.connection.on('error', (err) =>{
    console.error(err);
})

async function startServer() {
   await mongoose.connect(MONGO_URL, {
      useNewUrlParser : true,
      useUnifiedTopology: true,
   })
    await loadPlanetsData()

    server.listen(PORT, () => {
        console.log(`listening to port ${PORT}`);
    });
}
startServer();