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
    // res.status(200).json({
    //     message: "test done"
    // })
}
module.exports.add = async function(req, res) {
    console.log(req.body, ' - BODY');
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
        console.error(e, ' error during save')
    }
}