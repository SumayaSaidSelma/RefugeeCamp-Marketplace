
const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Get all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.render('index', { items: items });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get form for creating a new item
router.get('/new', (req, res) => {
    res.render('new');
});

// Get a single item by ID
router.get('/:id', getItem, (req, res) => {
    res.render('item', { item: res.item });
});

// Create a new item
router.post('/', async (req, res) => {
    const item = new Item({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        location: req.body.location,
        image: req.body.image
    });

    try {
        const newItem = await item.save();
        res.redirect(`/items/${newItem._id}`);
    } catch (err) {
        res.status(400).json({ message: err.message });
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