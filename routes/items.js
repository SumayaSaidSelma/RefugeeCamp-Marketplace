// routes/items.js

const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Get all items and render the index view
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.render('index', { items });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Render the form for posting a new item
router.get('/new', (req, res) => {
    res.render('new');
});

// Post a new item
router.post('/', async (req, res) => {
    try {
        const { name, description, image, price, location } = req.body;
        const item = new Item({ name, description, image, price, location });
        await item.save();
        res.status(201).redirect('/items');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get a specific item and render the item view
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.render('items', { item });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update an item
router.put('/:id', async (req, res) => {
    try {
        const { name, description, image, price, isAvailable } = req.body;
        const item = await Item.findByIdAndUpdate(req.params.id, { name, description, image, price, isAvailable }, { new: true });
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an item
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

