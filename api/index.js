const express = require('express');
const fs = require('fs');
const router = express.Router();
const databasePath = '/Users/nathanielgebeyaw/Desktop/New Folder With Items/senecawrk/SS-nagebeyaw/api/database.json';

function readDatabase() {
    const data = fs.readFileSync(databasePath, 'utf8');
    return JSON.parse(data);
}

function writeDatabase(data) {
    fs.writeFileSync(databasePath, JSON.stringify(data, null, 2), 'utf8');
}

router.get('/api/houses', (req, res) => {
    const houses = readDatabase();
    res.json(houses);
});

router.post('/api/houses', (req, res) => {
    const newHouse = req.body;
    const houses = readDatabase();
    newHouse.id = houses.length ? houses[houses.length - 1].id + 1 : 1;
    houses.push(newHouse);
    writeDatabase(houses);
    res.json({ message: `House added with ID ${newHouse.id}`, house: newHouse });
});

router.put('/api/houses/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const updatedData = req.body;
    const houses = readDatabase();
    const index = houses.findIndex(house => house.id === itemId);

    if (index !== -1) {
        houses[index] = { ...houses[index], ...updatedData };
        writeDatabase(houses);
        res.json({ message: `House with ID ${itemId} updated`, house: houses[index] });
    } else {
        res.status(404).json({ message: `House with ID ${itemId} not found` });
    }
});

router.delete('/api/houses/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const houses = readDatabase();
    const index = houses.findIndex(house => house.id === itemId);

    if (index !== -1) {
        const deletedHouse = houses.splice(index, 1);
        writeDatabase(houses);
        res.json({ message: `House with ID ${itemId} deleted`, house: deletedHouse[0] });
    } else {
        res.status(404).json({ message: `House with ID ${itemId} not found` });
    }
});

module.exports = router;
