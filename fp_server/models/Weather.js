const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const WeatherSchema = new Schema(
    {
        temperature: {
            type: String,
        },
        humidity: {
            type: String,
        },
        location:{
            type:String,
        },
        uvindex:{
            type:String
        },
        created: {
            type: Date,
            default: Date.now
        }
    }
)
module.exports = mongoose.model('WeatherDetail', WeatherSchema);