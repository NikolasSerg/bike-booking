const Bike = require('../models/Bike');

module.exports.getAll = async function(req, res) {
    try {
        const bikes = await Bike.find({});
        res.status(200).json(bikes)
    } catch (e) {
        res.status(500).json({
            message: "error on server"
        })
    }
}
module.exports.add = async function(req, res) {
    let bike = new Bike({
        id: req.body.id,
        name: req.body.name,
        type: req.body.type,
        color: req.body.color,
        wheel: req.body.wheel,
        status: req.body.status,
        price: req.body.price,
        description: req.body.description
    })
    try {
        await bike.save();
        res.status(200).json(bike)
    } catch (e) {
        res.status(500).json({
            message: 'error during save'
        })
    }
}
module.exports.del = async function(req, res) {
    try {
        await Bike.remove({id: req.body.id});
        res.status(200).json({message: `bike id ${req.body.id} was deleted`})
    } catch (e) {
        res.status(500).json({message: "error during delete"})
    }

}
module.exports.change = async function(req, res) {
    try {
        await Bike.updateOne({id: req.body.id}, {$set: {status: req.body.status}});
        res.status(200).json({message: `bike id ${req.body.id} was changed`})
    } catch (e) {
        res.status(500).json({message: "error during delete"})
    }

}