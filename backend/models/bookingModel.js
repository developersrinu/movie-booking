



const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Movie = require('./movieModel'); // Import movie model
const User = require('./userModel'); // Import user model

const bookingSchema = new Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    seatNumber: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // extra
    theater:{
        type:String,
        required:true
    },
    slot:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Booking', bookingSchema);

