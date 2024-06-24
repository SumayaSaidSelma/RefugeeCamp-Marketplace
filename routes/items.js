
const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Get all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single item by ID
router.get('/:id', getItem, (req, res) => {
    res.json(res.item);
});

// Create a new item
router.post('/', async (req, res) => {
    const item = new Item({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        location: req.body.location,
        imageUrl: req.body.imageUrl
    });

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an item by ID
router.put('/:id', getItem, async (req, res) => {
    if (req.body.name != null) {
        res.item.name = req.body.name;
    }
    if (req.body.description != null) {
        res.item.description = req.body.description;
    }
    if (req.body.price != null) {
        res.item.price = req.body.price;
    }
    if (req.body.location != null) {
        res.item.location = req.body.location;
    }
    if (req.body.imageUrl != null) {
        res.item.imageUrl = req.body.imageUrl;
    }

    try {
        const updatedItem = await res.item.save();
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an item by ID
router.delete('/:id', getItem, async (req, res) => {
    try {
        await res.item.remove();
        res.json({ message: 'Deleted Item' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get item by ID
async function getItem(req, res, next) {
    let item;
    try {
        item = await Item.findById(req.params.id);
        if (item == null) {
            return res.status(404).json({ message: 'Cannot find item' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.item = item;
    next();
}

module.exports = router;


