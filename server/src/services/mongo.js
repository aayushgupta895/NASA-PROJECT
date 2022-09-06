const mongoose = require('mongoose')

const username = encodeURIComponent("nasa-api");
const password = encodeURIComponent("bQPB9K_P:w9ZVvg");

const MONGO_URL = `mongodb+srv://${username}:${password}@nasacluster.jbodr.mongodb.net/nasa?retryWrites=true&w=majority`

// const server = http.createServer(app);

mongoose.connection.once('open', () =>{
    console.log('MongoDB connection ready!')
})

mongoose.connection.on('error', (err) =>{
    console.error(err);
})

async function mongoConnect(){
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser : true,
        useUnifiedTopology: true,
     })
}

async function mongoDisconnect(){
    await mongoose.disconnect()
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}
