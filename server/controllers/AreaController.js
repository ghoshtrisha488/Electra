const Area = require('../models/Area');
const fs = require('fs');
const path = require('path');

//create area
exports.createArea = async (req, res) => {
    const { name, state } = req.body;
    const image = req.file ? req.file.filename : null;
    const area = new Area({ name,state, image });
    await area.save();
    res.json(area);
};
//view
exports.getAreas = async (req, res) => {
    const areas = await Area.find();
    res.json(areas);
}
//updated
exports.updatedArea = async (req, res) => {
    const { name, state } = req.body;
    const area = await Area.findById(req.params.id);
    if (!area) return res.status(404).json({ message: 'Area not found' });

    //delete old image
    if (req.file && area.image) {
        const filepath = path.join(__dirname, '../uploads', area.image);
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath)
    }
    area.name = name || area.name;
    area.state = name || area.city;
    if (req.file) area.image = req.file.filename;
    const updated = await area.save();
    res.json(updated);
}
//delete
exports.deleteArea = async (req, res) => {
    const area = await Area.findById(req.params.id);
    if (!area) return res.status(404).json({ message: 'Area not found' });

    //delete old image
    if (area.image) {
        const filepath = path.join(__dirname, '../uploads', area.image);
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath)
    }
    await area.remove();
    res.json({ message: 'Area deleted' });
}