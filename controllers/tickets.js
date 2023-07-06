const FlightModel = require('../models/flight')
const Ticket = require('../models/ticket')

module.exports = {
    create
}

async function create(req, res){
    console.log(req.body)
    try{
        req.body.flight = req.params.id;
        const ticket = await Ticket.create(req.body)
        //respond to the client
        console.log(ticket)
        res.redirect(`/flights/${req.params.id}`)
    } catch(err) {
        res.send(err)
    }
}