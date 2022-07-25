const mongoose = require('mongoose')

const launchesSchema = new mongoose.Schema({
    // const launch = {
        flightNumber: {
           type: Number,
           require : true,
        },
        launchDate:  {
            type : Date,
            required : true,
        },
        mission: {
            type: String,
            required : true,
        },

        rocket:{
           type : String,
           required : true
        },

        target: {
            type : String,
            required : true,    
            },

        customers:  [ String ],
        upcoming:{
            type : Boolean,
            reuqired : true,
        },
        success: {
            type : true,
            required : true,
            default : true,
        },

    
});

//connects launchesSchema with the "launches" collect
mongoose.model('Launch', launchesSchema)