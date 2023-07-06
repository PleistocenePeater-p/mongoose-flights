const Flight = require('../models/flight')
const TicketModel = require('../models/ticket')

module.exports = {
    index,
    new: newFlight,
    create,
    show
};

// async function show(req, res) {
//     const flight = await Flight.findById(req.params.id);
//     res.render('flights/show', {title: 'Flight Detail', flight});
// }


//Lab Part 3
async function show(req, res) {
  try {
    const flightFromTheDatabase = await Flight
    .findById(req.params.id)
    .populate('passengers')
    .exec();

    console.log("flight", flightFromTheDatabase);

    const passengersFromTheDatabase = await TicketModel.find({flight:req.params.id});
    console.log("ticket", passengersFromTheDatabase);

    res.render("flights/show", {
      title: "Flight Detail",
      flight: flightFromTheDatabase,
      passengers: passengersFromTheDatabase
    });
  } catch (err) {
    res.send(err);
  }
}
// /part 3


async function create(req, res) {
//    req.body.flightNo = 
//    req.body.departs = 
// Remove empty properties so that defaults will be applied
for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    const flight =  await Flight.create(req.body);// the await is waiting for the MovieModel to go to MongoDB ATLAS (our db) a
    //and put the contents form in the db, and come to the express server
    // if you want to see what you put in the database on your server
    console.log(flight)
    // Always redirect after CRUDing data
    // We'll refactor to redirect to the movies index after we implement it
    res.redirect('/flights');  // Update this line
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('flights/new', { errorMsg: err.message });
  }
}

function newFlight(req, res) {
    res.render('flights/new', {title: 'Add Flight', errorMsg: ''})
}

async function index(req, res) {
    const flights = await Flight.find({})
    console.log(flights);
    res.render('flights/index', { title: 'All Flights', flights:flights });
}