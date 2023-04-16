const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const FlightSchema = new Schema(
    {
        flightname: {
            type: String,
        },
        altitude: {
            type: String,
        },
        speed: {
            type: String,
        },
        location:{
            type:String,
        },
        fuel:{
            type:String
        },
        arrivalestiamtedtime: {
            type: String,
        },
        distance: {
            type: String,
        },
        aircraftname:{
            type:String,
        },
        created: {
            type: Date,
            default: Date.now
        }
    }
)
module.exports = mongoose.model('FlightDetail', FlightSchema);