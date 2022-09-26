require('dotenv').config()
const mongoose = require('mongoose')


// console.log(process.env.MONGO_CLUSTER_URL+" hello")
const MONGO_URL = process.env.MONGO_CLUSTER_URL

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
