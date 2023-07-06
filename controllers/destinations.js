const Flight = require('../models/flight');

module.exports = {
    create
}

async function create (req, res) {
    console.log(req.body)
    try {
        const flight = await Flight.findById(req.params.id)
        flight.destinations.push(req.body);
        await flight.save();
        console.log(flight)
        res.redirect(`/flights/${req.params.id}`)
    } catch(err){
        res.send(err)
    }
}