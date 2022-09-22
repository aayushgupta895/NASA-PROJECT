// require('dotenv').config()
const mongoose = require('mongoose')


console.log(process.env.name+" hello")
const MONGO_URL = `mongodb+srv://${process.env.name}:${process.env.password}@nasacluster.jbodr.mongodb.net/nasa?retryWrites=true&w=majority`

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
