const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

//Part 2 Destination Schema
const destinationSchema = new Schema({
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
  },
  arrival: {
    type: Date
  }
});

const flightSchema = new Schema({
  airline: {type: String, 
    enum: ['American', 'Southwest', 'United']
  },
  airport: {
    type: String, 
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'], 
    default: 'DEN'
  },
  flightNo: {
    type: Number, 
    min:10, 
    max:9999
  },
  departs: {
    type: Date, 
    default: function() {
      return new Date().getFullYear();
  }},
  destinations: [destinationSchema],
  passengers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ticket'}]
});

// Compile the schema into a model and export it
module.exports = mongoose.model('Flight', flightSchema);